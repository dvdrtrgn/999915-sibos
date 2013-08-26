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
            this.now = this.total;
            this.time = 999;
            this.all.css({
                position: 'absolute',
            });
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


    function decr() {
        Df.now--;

        if (Df.now <= 0) {
            Df.now = Df.total;
            Df.all.fadeIn(Df.time);
        }
        W.debug > 1 && C.error(Df.now);
    }

    function _runfade() {
        decr();
        Df.all.eq(Df.now).fadeOut(Df.time, function () {
            W.setTimeout(function () {
                _runfade(); // recurses
            }, 7777);
        });
    }

    function _blotto() {
        var me = $('.reins-small'),
            mq = $('<div>').addClass('blot-small');
        me.before(mq);

        var me1 = $('.reins-large'),
            mq1 = $('<div>').addClass('blot-large');
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
