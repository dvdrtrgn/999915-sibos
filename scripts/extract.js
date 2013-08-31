/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) {
    var name = 'Extract',
    self = new Global(name, '(ajax page getter and storage)'),
    C = W.C,
    Df;

    Df = { // DEFAULTS
        inits: function (cb) { },
        cache: $('#Mobile'),
        caches: {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _nav(cb) {
        var url = '../lib/navport.html';
        _get(url, '#Mobile', cb);
    }
    function _page(url, cb) {
        _get(url, '#Feature', cb);
    }

    function _get(url, sel, cb) {
        cb = cb || function () {
            C.debug.apply(C, arguments);
        };

        W.debug > 0 && C.debug(name + '_nav', [url, sel]);

        Df.jqxhr = $.get(url, function (data) {
            Df.data = $(data).filter(sel).children();
            C.debug('text success', Df.data);
        }).done(function (data) {
            Df.cache.append(Df.data);
            C.debug('parsed success', [data, Df.data.html()]);
        }).always(function () {
            C.debug('finished');
            cb(Df.cache);
            Df.cache = Df.cache.clone().addClass('port');
        }).fail(function (x) {
            C.debug('error', x);
        });
    }


    function _db(nom, str) {
        if (str) {
            Df.caches[nom] = str;
        } else {
            return Df.caches[nom];
        }
    }

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
