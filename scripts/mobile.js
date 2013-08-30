/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile, Div, Art, Nav;

(function (W) {
    var name = 'Mobile',
    self = new Global(name, '(ajax fetch and db storage)'),
    C = W.C,
    Df;

    Art = {
        div: null,
    // slide out
    //

    }
    Nav = {
        div: null,
    // slide out
    //

    }

    Df = { // DEFAULTS
        busy: false,
        wide: 444,
        inits: function (cb) {

        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _getArt() {
        var rtn = $('#Page article');

        C.debug(rtn);
        return rtn.clone();
    }

    function _slideIn(jq) {
        $(jq).css({
            display: 'block',
            left: Df.wide,
            width: Df.wide,
            //            top: '0',
            position: 'absolute',
        }).animate({
            left: '0',
        }, 999, function () {
            });
    }

    function _useArt() {
        Art.jqs.html('').append(_getArt());
    }

    function _slideOut(jq) {
        $(jq).css({
            display: 'block',
            left: '0',
        //            top: '0',
        }).animate({
            left: -Df.wide,
        }, 999, function () {
            });
    }

    function _loadArt() {
        _slideOut(Nav.jqs);
        _slideIn(Art.jqs);
    }

    function _loadNav() {
        _slideOut(Art.jqs);
        _slideIn(Nav.jqs);
    }

    function _binder(obj) {
        Div = $('#Mobile');
        Nav.jqs = Div.find('.port article');
        Df.wide = Nav.jqs.width();
        Art.jqs = Nav.jqs.clone()
        Art.jqs.css('border', '1px solid lime');
        Art.jqs.insertAfter(Nav.jqs)

        _useArt();

        Div.one('mousedown', function () {
            _loadNav();
        }).on('mouseup', function () {
            _loadArt();
        });
    }

    function _capture(){
        $('nav a').click(function (evt) {
            var str = evt.target.href;

            evt.preventDefault();
            C.log(Main.noext(Main.what(str)));
        })

    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(obj) {
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
