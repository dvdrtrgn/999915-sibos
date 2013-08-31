/*jslint es5:true, white:false */
/*globals $, Global, Page, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) {
    var name = 'Extract',
        self = new Global(name, '(ajax page getter and storage)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        cache: $('#Mobile'),
        cached: {},
        stored: {
            'foo':'bar',
        },
        inits: function () {
            $.extend(this.cached, this.stored);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _log() {
        C.debug.apply(C, arguments);
    }

    function _append(page) {
        Df.parse = $(page.body).filter(Df.select).children();
        Df.cache.append(Df.parse);
        Df.cache = Df.cache.clone().addClass('port');
    }

    function _get(url, sel, cb) {
        W.debug > 0 && C.debug(name + '_nav', [url, sel]);
        cb = (cb || _log);

        Df.select = sel;
        Df.page = new Page(url, _append);
    }

    function _nav(cb) {
        var url = '../lib/navport.html';
        _get(url, '#Mobile', cb);
    }

    function _page(url, cb) {
        _get(url, '#Feature', cb);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(obj) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        _nav();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        page: _page,
    });

    return self;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*
fetch (url)
    -read
        -update
    -ajax

plant (div, url)
    start
        load from url with callback
    finish
        callback fills div

take url
    determine
        if stored
            read
        if recent
            stop
        else get
            add to
fetch page
    create cache div
    hide div
    append to cache
    save to db as "url..."

isolate goodies




 */
