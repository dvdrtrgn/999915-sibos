/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Banner;

(function (W) {
    var name = 'Banner',
        self = new Global(name, '(fade and loop)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        inits: function (cb) {
            this.all = $('.fade');
            this.total = this.all.length;
            this.now = 2;
            this.time = 666;
            this.all.css({
                position: 'absolute',
            });
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


    function descend() {
        Df.now--;

        if (Df.now <= 0) {
            Df.now = Df.total - 1;
            Df.all.fadeIn(0);
        }
        W.debug > 0 && C.debug(Df.now);
    }

    function _runfade() {
        descend();

        Df.all.eq(Df.now) //
        .fadeOut(Df.time, function () {
            W.setTimeout(function () {
                _runfade(); // recurses
            }, Df.time * 9);
        });
    }

    function _blotto() {
        var me = $('.reins.small'),
            mq = $('<div>').addClass('blot small');
        me.before(mq);

        var me1 = $('.reins.large'),
            mq1 = $('<div>').addClass('blot large');
        me1.before(mq1);

    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _blotto();
        _runfade();

        $('.click2run').fadeIn().on('click', function () {
            drt.activeNavButton();
        });
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
