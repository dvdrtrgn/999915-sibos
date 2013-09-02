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
        cache: $('<article>'),
        caches: {},
        navpage: '../lib/navport.html',
        port: $('#Mobile'),
        ports: {},
        stored: {
            'foo': 'bar',
        },
        inits: function () {
            $.extend(this.caches, this.stored);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _get(url, sel, cb) {
        cb = (cb || Main.cb);
        W.debug > 0 && C.debug(name + '_nav', [url, sel]);

        Df.select = sel;
        return Df.caches[url] = new Page(url, cb);
    }

    function _useRegions(jq) {
        var hold = $('<div>');
        jq.scout('.mini').children().appendTo(hold);
        jq.empty();
        jq.append(hold.children());
    }

    function _append(page) {
        // this will only parse the children of top elements [html/body/head]
        Df.parse = $(page.body).scout(Df.select).children();
        Df.ports[page.url].append(Df.parse);

        if (page.url === Df.navpage) {
            Df.port = Df.port.find('section.port').first();
        }
    }

    function _nav() { // get nav html
        var url = Df.navpage;

        Df.ports[url] = Df.port;
        return _get(url, '#Mobile', _append).jqxhr.promise();
    }

    function _page(url, prepCb) { // get content html
        prepCb = (prepCb || Main.cb);
        var jq = Df.ports[url];

        if (!jq) { // never loaded
            jq = Df.cache.clone().hide();
            Df.ports[url] = jq.appendTo(Df.port);
            _get(url, '#Feature', function (page) {
                _append(page);
                _useRegions(Df.ports[url]);
            });
        }
        prepCb(jq);
    }

    function _bindings() {
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(cb) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        _bindings(); // extend jquery
        _nav().done(cb);
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
