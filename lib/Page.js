/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// DATA-TYPE / CONSTRUCTOR

function Page(url, cb) {
    if (!url) {
        throw new Error('Page must have a url');
    }
    this.url = url;
    this.init(cb);
}

Page.prototype = {
    data: 'raw get data',
    body: '_only(body)',
    head: '_only(head)',
    _get: function (cb) {
        var self = this,
            C = window.console;

        $.get(this.url, function () {
            C.debug('Page_get success');
        }).done(function (data) {
            self.data = data;
        }).fail(function (x) {
            C.error(x);
            throw new Error('Page');
        }).always(function () {
            self._update();
            cb && cb(self);
        });
    },
    _only: function (tag, data) {
        var str = data || this.html || this.data,
            exp = ['<', tag, '>.+<\/', tag, '>'],
            reg = RegExp(exp.join(''));

        str = str.split(/\s+/).join(' ');
        str = str.match(reg).toString();

        return str;
    },
    _fetch: function (cb) {
        this._get(cb);
    },
    _update: function () {
        this.html = this._only('html', this.data);
        this.body = this._only('body');
        this.head = this._only('head');
    },
    init: function (cb) {
        this._fetch(cb);
    },
};
