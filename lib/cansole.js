/*global  $ */

if (window.jQuery) {
    $.event.props = $.event.props.join('|') //
    .replace('layerX|layerY|', '').split('|');
}

/*
    from Mike Wilcox clubajax.debugging.consoleFix
    DESCRIPTION:
        Allows the ability to turn the console on and off. Use debug=true
        in a script before this loads, or in the page url, like:
            http://mypage/index.html?debug=true
        Without debug in one of these two places, the console is turned
        off to prevent throwing errors in lame browsers.
        Fixes some of the annoyances with the IE8 console:
        - clears the logs on reload
        - adds spaces between logged arguments
        - adds stubs for Firebug commands
*/

(function () {
    var fixIE, hideCalls, tweak
    ,   W = window
    ,   ua = W.navigator.userAgent
    ,   dbg = (W.debug || /debug/.test(document.location.search) || false)
    ,   count = (W.loglimit || 299)
    ,   more = 'debug,time,timeEnd,assert,count,trace,dir,dirxml,group,groupEnd,groupCollapsed,exception'
    ,   common = 'info,error,log,warn'
    ;
    W.loglimit = count;
    if (!W.console) W.console = {};

    hideCalls = function (str) {
        var i, calls = str.split(',');
        for (i = 0; i < calls.length; i++) console[calls[i]] = $.noop;
    };
    tweak = function () {
        var i, calls = more.split(',');
        for (i = 0; i < calls.length; i++) {
            if (!console[calls[i]]) console[calls[i]] = $.noop();
        }
    };
    fixIE = function () {
        var i, m, n, calls = common.split(',');
        for (i = 0; i < calls.length; i++) {
            m = calls[i];
            n = '_' + calls[i];

            console[n] = console[m];
            console[m] = (function () {
                var type = n;
                return function () {
                    count--;
                    if (count === 0) {
                        console._log('***LOG LIMIT OF ' + W.loglimit + ' HAS BEEN REACHED***');
                    }
                    if (count < 1) return;
                    try {
                        console[type](Array.prototype.slice.call(arguments).join(' '));
                    } catch (e) {}
                };
            }());
        }
        // clear is more than a convenience - too many logs crashes it.
        try {
            // (if closed it throws an error)
            console.clear();
        } catch (e) {}
    };

    if (dbg && /Trident/.test(ua)) {
        fixIE();
        hideCalls(more);
    } else if ((/IE/.test(ua) && !/Trident/.test(ua)) || (!dbg && !/Mac/.test(ua)) || !W.console) {
        // IE6 or no Mac/console
        hideCalls(more + ',' + common);
    } else {
        tweak();
    }

}());
