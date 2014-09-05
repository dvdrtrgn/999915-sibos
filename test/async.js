/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W || window),
    C = (W.C || W.console),
    log = C.log.bind(C),
    startTime = $.now();

var U = (function (self) {
    self = self || {};

    $.extend(self, {
        random: function (max, min) {
            min = min || 0;
            return Math.floor(min + Math.random() * (max - min));
        },
        chime: function () {
            C.debug('Hey, guys it’s ' + ($.now() - startTime));
        },
        hello: function (name) {
            C.log('Hello ' + name);
        },
        request: function (fn) {
            var urgency = self.random(100, 1000);
            W.setTimeout((fn || self.chime), urgency);
            return urgency;
        },
        status: function (dfr, sec) {
            W.setTimeout(function working() {
                if (dfr.state() === 'pending') {
                    dfr.notify($.now());
                    W.setTimeout(working, sec * 1000);
                }
            }, 0);
        },
    });
    return self;
}());

function t1() {
    var waiter, result = {};

    function lazyOrder() {
        waiter = new $.Deferred();

        // Resolve after a random interval
        result.t1 = U.request(function () {
            waiter.resolve('Timer 1 won');
        });
        // Reject after a random interval
        result.t2 = U.request(function () {
            waiter.reject('Timer 1 lost');
        });

        // Show a 'working...' message regularly
        U.status(waiter, 0.1);
        // Return the Promise so caller can't change the Deferred
        return waiter.promise();
    }
    // Attach [done, fail, progress] handlers for the lazyOrder
    $.when(lazyOrder()).then(log, log, log);
    return [waiter, result];
}

function t2() {
    var waiter = $.Deferred();
    var thingy = { // becomes a promise piggybacked upon an async scenerio
        hello: U.hello,
    };

    waiter.promise(thingy); //  extend thingy  promise api
    waiter.resolve('Jon'); //   mutate waiter  locked data
    thingy.done(function (x) {
        thingy.hello(x); //     Hello Jon
    }).hello('Karl');  //       invoke promise
    return [waiter, thingy];
}
