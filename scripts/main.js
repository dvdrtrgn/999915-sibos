/*jslint es5:true, white:false */
/*globals dev, drt, C, location, $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, CDN, W = (W || window);
var ShareStrings;

W.debug = 1;

if ($.now() > 137760e7) {
    W.debug--;
}

CDN = {
    self: '/lib/',
    disk: 'file:///lib/',
    bithon: '../../../lib/',
    webdev: 'http://10.89.101.100/lib/',
    mython: 'http://10.89.101.81:8000/lib/',
    python: 'http://localhost:8000/lib/',
    other0: 'http://cdnjs.cloudflare.com/ajax/libs/',
}.bithon;

Modernizr.load([
{
    test: W.isIE,
    yep: [
    CDN + 'ie/split.js',
    CDN + 'ie/html5shiv.js',
    CDN + 'ie/nwmatcher.min.js',
    CDN + 'ie/selectivizr-min.js',
    ],
    both: [
    CDN + 'underscore/js-1.4.4/underscore.js',
    CDN + 'js/console.js',
    //        CDN + 'video-js/4.1/video-js.css',
    //        CDN + 'video-js/4.1/video.dev.js',
    //        './lib/drt.cellophy.js',
    //        './lib/mdz.highres.js',
    ],
    complete: function () {
        Data = new Global('Data', '(catchall data fixture)');
    },
},
{
    both: [
    '../scripts/drt.js',
    ],
    complete: function () {
        Main(W).init();
    },
},
{
    test: !W.debug,
    yep: [
    CDN + 'js/ecg-ga.js',
    ],
},
]);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.C,
        Df;

    Df = { // DEFAULTS
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function (cb) {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function Init() {
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        // http://videojs.com/docs/options/
        // http://support.sharethis.com/customer/portal/articles/464663-customize-functionality
        // http://support.sharethis.com/customer/portal/articles/475079-share-properties-and-sharing-custom-information#Dynamic_Specification_through_JavaScript
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        var raw = location.pathname.split('/').pop().match(/\w+/g);
        var pageHash = {
            home: ["Home", 'Check out the #WellsFargo Global Financial Institutions Sibos microsite'],
            visit: ["Visit our booth", 'See pics of the #WellsFargo booth & learn about events being hosted'],
            about: ["About Us", 'Learn about the #WellsFargo Global Financial Institutions business'],
            explore: ["Explore Osaka", 'Explore what Osaka has to offer at #Sibos 2012'],
            pubs: ["Publications", 'Learn about the #WellsFargo Global Financial Institutions publications'],
            giving: ["Charitable giving", 'Learn more about the #WellsFargo charity programs at #Sibos'],
            photos: ["Gallery", 'View pics from last year’s #WellsFargo Annual Sibos Celebration event']
        };

        try {
            ShareStrings = {
                url: 'http://wellsfargomedia.com/sibos2012/pages/' + raw.join('.'),
                tab: 'Wells Fargo at Sibos 2012 – ' + pageHash[raw[0]][0],
                sum: pageHash[raw[0]][1],
                img: 'http://wellsfargomedia.com/sibos2012/images/header/wf-sibos.png'
            };

            $('#head0').text(ShareStrings.tab);
            $('#head1, #head3').attr('content', ShareStrings.tab);
            $('#head2, #head4').attr('content', ShareStrings.sum);
            $('#head5').attr('content', ShareStrings.url);
        //    $('#head6').attr('content', ShareStrings.img);
        } catch (e) {
            C.error(e);
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + Date() + ' debug:', W.debug);

        if (self.inited(true)) {
            return null;
        }

        Init();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        sectStr: function () {
            return Df.sects;
        },
        sectArr: function () {
            return Df.sects.split(' ');
        },
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
function fuggit () {

}

$(fuggit);
