/*jslint es5:true, white:false */
/*globals $, Extract, Global, Main, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile, Div, Art, Nav;

(function (W) {
    var name = 'Mobile',
        self = new Global(name, '(ajax fetch and db storage)'),
        C = W.C,
        Df;

    Art = {
        div: null,
    };
    Nav = {
        div: null,
    };

    Df = { // DEFAULTS
        busy: false,
        current: '',
        wide: 444,
        time: 999,
        inits: function (cb) {

        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _slide(jq, num1, num2, cb) {
        cb = (cb || Main.cb);

        jq.css({
            display: 'block',
            left: num1,
            width: Df.wide,
            position: 'absolute',
        }).animate({
            left: num2,
        }, Df.time, cb);
    }

    function _revealPage(jq, yes) {
        if (yes) {
            _slide(Nav.jqs, 0, - Df.wide);
            _slide(jq, Df.wide, 0, function () {
                this.show();
            });
        } else {
            _slide(Nav.jqs, - Df.wide, 0);
            _slide(jq, 0, Df.wide, function () {
                this.hide();
            });
        }
    }

    function _drill(jq) {
        _revealPage(jq, true);
    }

    function _home() {
        _revealPage(Df.current, false);
    }

    function _loadArt() {
        _drill(Art.jqs);
    }

    function _useFeature() {
        Art.jqs.html('').append($('#Feature article'));
    }

    function _binder() {
        Div = $('#Mobile');
        Nav.jqs = Div.find('.port article');
        Df.wide = Nav.jqs.width();
        Art.jqs = Nav.jqs.clone();
        Art.jqs.css('border', '1px solid lime');
        Art.jqs.insertAfter(Nav.jqs);

//        _useFeature();
    }

    function _capture() {
        $('body').on('click', '#Mobile nav a', function (evt) {
            evt.preventDefault();

            var str = evt.target.href;
            str = Main.what(str);
            C.log(str);
            Df.current = str;
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
