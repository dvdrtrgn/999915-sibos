/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// DATA-TYPE
(function (W) {
    var C = W.console,
        name = 'Page',
        CLASS;

    // CONSTRUCTOR
    CLASS = W[name] = function Page(url, cb) {
        if (!url) {
            throw new Error(name + '(url:string, cb:function)');
        }
        CLASS.LIST[url] = this;
        this.url = url;
        this._get(cb);
    };

    CLASS.LIST = {};

    CLASS.prototype = {
        data: 'get raw data',
        body: 'isolate body',
        head: 'isolate head',
        _pick: function (tag, data) {
            var str = (data || this.html || this.data),
                exp = ['<', tag, '>.+<\\/', tag, '>'],
                reg = RegExp(exp.join(''));

            str = str.split(/\s+/).join(' ');
            str = str.match(reg).toString();

            return str;
        },
        _prep: function () {
            this.html = this._pick('html', this.data);
            this.body = this._pick('body');
            this.head = this._pick('head');
        },
        _get: function (cb) {
            var self = this;

            $.get(this.url, function () {
                W.debug > 1 && C.debug(name + '._get', ['success', this.url]);
            }).done(function (data) {
                self.data = data;
            }).fail(function () {
                C.error(arguments);
                throw new Error(name);
            }).always(function () {
                self._prep();
                if (cb && cb.prototype) {
                    cb(self);
                }
            });
        },
        fetch: function (cb) {
            // check freshness and return data
            return this._get(cb);
        },
    };

}(window));
