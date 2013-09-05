/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var B = $.now(),
    W = (W || window),
    C = (W.C || W.console),
    DFR, OBJ, RTN = {};

function random(max, min) {
    min = min || 0;
    return Math.floor(min + Math.random() * (max - min));
}
function chime() {
    C.debug('Hey, guys it’s ' + ($.now() - B));
}
function log(x) {
    C.log(x);
}
function hello(name) {
    C.log('Hello ' + name);
}
function request(fn) {
    var urgency = random(100, 1000);
    W.setTimeout((fn || chime), urgency);
    return urgency;
}
function status(dfr, sec) {
    W.setTimeout(function working() {
        if (dfr.state() === 'pending') {
            dfr.notify($.now());
            W.setTimeout(working, sec * 1000);
        }
    }, 0);
}

function t1() {
    function asyncEvent() {
        DFR = new $.Deferred();

        // Resolve after a random interval
        RTN.t1 = request(function () {
            DFR.resolve('Timer 1 won');
        });
        // Reject after a random interval
        RTN.t2 = request(function () {
            DFR.reject('Timer 1 lost');
        });

        // Show a 'working...' message regularly
        status(DFR, 0.1);
        // Return the Promise so caller can't change the Deferred
        return DFR.promise();
    }
    // Attach [done, fail, progress] handlers for the asyncEvent
    $.when(asyncEvent()).then(log, log, log);
    return [DFR, RTN];
}

function t2() {
    DFR = $.Deferred();
    OBJ = { // becomes a promise piggybacked upon an async scenerio
        hello: hello,
    };

    DFR.promise(OBJ); //    extend OBJ  promise api
    DFR.resolve('Jon'); //  mutate DFR  locked data
    OBJ.done(function (x) {
        OBJ.hello(x); //    Hello Jon
    }).hello('Karl');  //   invoke promise
    return [DFR, OBJ, RTN];
}
