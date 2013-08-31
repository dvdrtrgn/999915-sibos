/*jslint es5:true, white:false */
/*globals $, Banner, Global, Scroll, ShareStrings:true, drt */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function (cb) {},
        bnrLinks: {
            bnr1: '#',
            bnr2: 'http://tagboard.com/wfpony',
            bnr3: 'booth.html',
            bnr4: 'explore.html',
            bnr5: 'about.html',
            bnr6: 'booth.html',
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function Init() {
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        // http://videojs.com/docs/options/
        // http://support.sharethis.com/customer/portal/articles/464663-customize-functionality
        // http://support.sharethis.com/customer/portal/articles/475079-share-properties-and-sharing-custom-information#Dynamic_Specification_through_JavaScript
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        var raw = W.location.pathname.split('/').pop().match(/\w+/g);
        var pageHash = {
            about: ["About Wells Fargo", 'Learn about the #WellsFargo Global Financial Institutions business'],
            booth: ["Visit our booth", 'See pics of the #WellsFargo booth & learn about events being hosted'],
            events: ["Sibos events", 'Learn more about the #WellsFargo events at #Sibos'],
            explore: ["Explore Dubai", 'See what Dubai has to offer at #Sibos 2013'],
            giving: ["Charitable Giving", 'Learn more about the #WellsFargo charity programs at #Sibos'],
            home: ["Home", 'Check out the #WellsFargo Global Financial Institutions Sibos microsite'],
            speakers: ["speakers", 'Learn about the #WellsFargo Global Financial Institutions publications'],
            test: ["x", 'x'],
        };

        try {
            ShareStrings = {
                url: 'http://wellsfargomedia.com/sibos2013/pages/' + raw.join('.'),
                tab: 'Wells Fargo at Sibos 2013 – ' + pageHash[raw[0]][0],
                sum: pageHash[raw[0]][1],
                img: 'http://wellsfargomedia.com/sibos2013/images/header/wf-sibos.png',
            };

            $('#head0').text(ShareStrings.tab);
            $('#head1, #head3').attr('content', ShareStrings.tab);
            $('#head2, #head4').attr('content', ShareStrings.sum);
            $('#head5').attr('content', ShareStrings.url);
            //    $('#head6').attr('content', ShareStrings.img);
        } catch (e) {
            if (!W.isIE) {
                C.error(e);
            }
        }
    }

    function _whatPage(x) {
        x = x || W.location.pathname;
        return x.split('/').slice(-1).toString();
    }

    function _noExt(x) {
        x = x.split('.');
        return x.slice(0, 1).toString();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + Date() + ' debug:', W.debug);

        if (self.inited(true)) {
            return null;
        }

        Init();
        Scroll.init();
        Mobile.init();

        if (_whatPage() === 'home.html') {
            Banner.init(Df.bnrLinks);
        } else {
            Banner.init();
        }

        Extract.init();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        what: _whatPage,
        noext: _noExt,
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
