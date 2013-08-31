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
        bezel: $('#Mobile'),
        cache: $('<section class="port">'),
        cached: {},
        stored: {
            'foo': 'bar',
        },
        inits: function () {
            $.extend(this.cached, this.stored);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _get(url, sel, cb) {
        W.debug > 0 && C.debug(name + '_nav', [url, sel]);
        cb = (cb || Main.cb);
        Df.select = sel;
        new Page(url, cb);
    }

    function _append(page) {
        Df.parse = $(page.body).scout(Df.select).children();
        // this will only parse the children of top elements [html/body/head]
        Df.cache.clone().append(Df.parse).appendTo(Df.bezel);
    }

    function _nav(cb) {
        var url = '../lib/navport.html';
        cb = (cb || Main.cb);
        Df.page = _get(url, '.port', _append);
        cb(Df.page);
    }

    function _page(url, cb) {
        cb = (cb || Main.cb);
        Df.page = _get(url, '#Feature', _append);
        cb(Df.page);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(obj) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        _nav();
        // extend jquery
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };
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
