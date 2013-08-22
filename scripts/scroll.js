/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Scroll;

(function (W) {
    var name = 'Scroll',
        self = new Global(name, '(scroll and do it smooth)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        inits: function (cb) {},
        fixed: null,
        funum: 200,
        mysel: '.tofix',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _scroll(ele) {
        var $me = $(ele);

        // look before leap
        if ($me.length) {
            $(W.isIE ? 'html' : 'body').stop().animate({
                scrollTop: $me.offset().top,
            }, 333, function () {
                W.location.hash = $me.get(0).id;
            });
        } else {
            $(W.isIE ? 'html' : 'body').scroll();
        }
    }

    function _fixit() {
        if (Df.fixed) {
            return Df.fixed;
        }
        Df.fixed = $(Df.mysel);
        Df.fixed.css({
            position: 'static',
            width: Df.fixed.width(),
            top: Df.funum / 2,
        });
    }

    function _bind() {
        $(W).on('scroll', function (evt) {
            var me = _fixit(),
                off = this.pageYOffset;

            if (!me) {
                return;
            }
            if (off > Df.funum * 2) {
                me.css({
                    position: 'fixed',
                });
            } else {
                me.css({
                    position: 'static',
                });
            }
        });

        $('.scroll').on('click', function (evt) {
            var str = evt.target.href;

            // smooth and prevent def
            evt.preventDefault();
            str = str.split('#')[1];

            _scroll('#' + str);
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        _bind();
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
