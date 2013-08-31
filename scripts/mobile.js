/*jslint es5:true, white:false */
/*globals $, Extract, Global, Main, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile, Div, Art, Nav;

(function (W) {
    var name = 'Mobile',
        self = new Global(name, '(ajax fetch and db storage)'),
        C = W.C,
        Df, Nav;

    Df = { // DEFAULTS
        busy: false,
        current: '',
        left: 111,
        time: 333,
        wide: 999,
        atnav: true,
        inits: function (cb) {
            // get width (and offset)
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _slide(jq, num1, num2, cb) {
        cb = (cb || Main.cb);

        jq.css({
            display: 'block',
            left: num1 + Df.left,
            width: Df.wide,
            position: 'absolute',
        }).animate({
            left: num2 + Df.left,
        }, Df.time, cb);
    }

    function _revealPage(jq, yes) {
        if (!Df.atnav) {
            yes = !yes;
            Df.current.hide();
        } else {
            _useRegions(jq);
        }
        Df.current = jq;
        if (yes) {
            jq.show();
            _slide(Nav, 0, Df.wide * -1);
            _slide(jq, Df.wide, 0);
            Df.atnav = false;
        } else {
            _slide(Nav, Df.wide * -1, 0);
            _slide(jq, 0, Df.wide, function () {
                jq.hide();
            });
            Df.atnav = true;
        }
    }

    function _useRegions(jq) {
        jq.html(jq.find('article, .mobile'));
    }

    function _drill(jq) {
        _revealPage(jq, true);
    }

    function _home() {
        _revealPage(Df.current, false);
    }

    function _binder() {
        Div = $('#Mobile');

        Nav = Div.find('.port');
        Df.wide = Nav.outerWidth();
        Df.left = parseInt(Nav.css('left'));
    }

    function _capture() {
        $('body').on('click', '#Mobile nav a', function (evt) {
            evt.preventDefault();

            var str = evt.target.href;
            str = Main.what(str);
            C.log(str);
            Extract.page(str, _drill);
        });
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
        gut: _useRegions,
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
