/*jslint es5:true, white:false */
/*globals $, Extract, Global, Main, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile;

(function (W) {
    var name = 'Mobile',
        self = new Global(name, '(mobile nav and page swapper)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        atnav: true,
        busy: false,
        current: '',
        high: 999,
        left: 111,
        mob: null,
        nav: null,
        time: 333,
        wide: 999,
        wrap: '<div class="bezel"></div>',
        inits: function () {
            Df.mob = $('#Mobile').show();
            Df.nav = Df.mob.find('article').first().addClass('nav');
            // get width (and offset)
            Df.wide = Df.nav.parent().innerWidth() || 300;
            Df.high = Df.nav.parent().outerHeight();
            Df.left = parseInt(Df.nav.parent().css('left')) || 0;
            C.debug(name + '_inits', Df);
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _slide(jq, num1, num2, cb) {
        jq.css({
            display: 'block',
            left: num1 + Df.left,
            width: Df.wide,
            height: Df.high,
            position: 'absolute',
        }).animate({
            left: num2 + Df.left,
        }, Df.time, cb);
    }

    function _revealPage(jq, yes) {
        if (!Df.atnav) {
            Df.current.hide();
        }
        Df.current = jq;

        if (yes) {
            jq.show();
            _slide(Df.nav, 0, Df.wide * -1);
            _slide(jq, Df.wide, 0);
            Df.atnav = false;
        } else {
            _slide(Df.nav, Df.wide * -1, 0);
            _slide(jq, 0, Df.wide, function () {
                jq.hide();
            });
            Df.atnav = true;
        }
    }

    function _drill(jq) {
        W.debug > 0 && C.debug(name + '_drill', jq);
        _revealPage(jq, true);
    }

    function _home() {
        W.debug > 0 && C.debug(name + '_home', Df.current);
        _revealPage(Df.current, false);
    }

    function _binder() {
        Df.nav.parent().css({
            width: Df.wide,
            height: Df.high,
        });
        if (!_mobile()) {
            Df.mob.wrap(Df.wrap);
        } else {
            $('#Page').remove();
            Df.mob.css({
                zIndex: 1
            });
        }
    }

    function _isInternal(str) {
        var ts1, ts2;
        ts1 = str.match(W.location.host);
        ts2 = str.match('.html');
        return !!(ts1 && ts2);
    }

    function _slider(evt) {
        var str = evt.currentTarget.href; // current because A wraps IMG

        if (_isInternal(str)) {
            evt.preventDefault();
        } else {
            return;
        }

        evt.preventDefault();
        str = Main.page(str);
        W.debug > 0 && C.debug(name + '_capture', str);
        Extract.page(str, $.Deferred().done(_drill));
    }

    function _capture() {
        $('body').on('click', '#Mobile section.port a', _slider);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _binder();
        _capture();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        home: _home,
        slider: _slider,
    });

    return self;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

find nav
    suppress default
    detect target page
    check db
        is older than
            ajax fetch
        else
            use it
    slide out nav
    slide in body
        article group?
        take composition cues from ajax page
        a div in there suggest what to knit


 */
