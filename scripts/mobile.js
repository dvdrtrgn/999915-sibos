/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile;

(function (W) {
    var name = 'Mobile',
        self = new Global(name, '(ajax fetch and db storage)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        inits: function (cb) {
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _binder(obj) {
        $.each(obj, function (i, e) {
            $('.' + i).click(function () {
                W.location = e;
            });
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(obj) {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

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
