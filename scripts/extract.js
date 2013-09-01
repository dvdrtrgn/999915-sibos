/*jslint es5:true, white:false */
/*globals $, Global, Main, Page, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) {
    var name = 'Extract',
        self = new Global(name, '(page parser and storage)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        bezel: $('#Mobile'),
        cache: $('<section class="port">'),
        cached: {},
        ported: {},
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
        cb = (cb || Main.cb);
        W.debug > 0 && C.debug(name + '_nav', [url, sel]);

        Df.select = sel;
        Df.cached[url] = new Page(url, cb);
    }

    function _useRegions(jq) {
        jq.html(jq.find('article, .mobile'));
    }

    function _append(page) {
        // this will only parse the children of top elements [html/body/head]
        Df.parse = $(page.body).scout(Df.select).children();
        Df.ported[page.url].append(Df.parse);
    }

    function _nav() { // get nav html
        var url = '../lib/navport.html';

        Df.ported[url] = Df.cache.clone().appendTo(Df.bezel);
        _get(url, '.port', _append);
    }

    function _page(url, cb) { // get content html
        cb = (cb || Main.cb);
        var jq = Df.ported[url];

        if (!jq) { // never loaded
            jq = Df.cache.clone().hide();
            Df.ported[url] = jq.appendTo(Df.bezel);
            _get(url, '#Feature', function (page) {
                _append(page);
                _useRegions(Df.ported[url]);
            });
        }
        cb(jq);
    }

    function _bindings() {
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        _bindings(); // extend jquery
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
