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
        homer: '<img class="home" title="home" src="../images/misc/home.png">',
        navpage: './nav.html',
        port: $('#Mobile'),
        ports: {},
        stored: {
            'foo': 'bar',
        },
        inits: function () {
            $.extend(this.caches, this.stored);
            this.homer = $(this.homer).click(Mobile.home);
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

    function _homeBtn(jq) {
        jq.prepend(Df.homer);
    }

    function _nav(doing) { // get nav html
        var url = Df.navpage;

        Df.ports[url] = Df.port;
        if (Df.port.children().length) {
            return doing.resolve();
        }

        return _get(url, '#Mobile', _append).jqxhr.promise(doing);
    }

    function _page(url, naving) { // get content html
        var jq = Df.ports[url];

        if (!jq) { // never loaded
            jq = Df.cache.clone().hide();
            Df.ports[url] = jq.appendTo(Df.port);

            _get(url, '#Feature', function (page) {
                _append(page);
                _useRegions(Df.ports[url]);
                _homeBtn(jq);
            });
        }
        naving.resolve(jq)
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
        _nav($.Deferred()).done(cb);
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



 */
