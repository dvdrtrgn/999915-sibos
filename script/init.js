var debug = 0; // cansole.js -- logging off/on
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// http://videojs.com/docs/options/
// http://support.sharethis.com/customer/portal/articles/464663-customize-functionality
// http://support.sharethis.com/customer/portal/articles/475079-share-properties-and-sharing-custom-information#Dynamic_Specification_through_JavaScript
var switchTo5x = 1;
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var raw = location.pathname.split('/').pop().match(/\w+/g),
pageHash = {
    home: ["Home", 'Check out the #WellsFargo Global Financial Institutions Sibos microsite'],
    visit: ["Visit our booth", 'See pics of the #WellsFargo booth & learn about events being hosted'],
    about: ["About Us", 'Learn about the #WellsFargo Global Financial Institutions business'],
    explore: ["Explore Osaka", 'Explore what Osaka has to offer at #Sibos 2012'],
    pubs: ["Publications", 'Learn about the #WellsFargo Global Financial Institutions publications'],
    giving: ["Charitable giving", 'Learn more about the #WellsFargo charity programs at #Sibos'],
    photos: ["Gallery", 'View pics from last year’s #WellsFargo Annual Sibos Celebration event']
},
stStrings = {
    url: 'http://wellsfargomedia.com/sibos2012/pages/' + raw.join('.'),
    tab: 'Wells Fargo at Sibos 2012 – ' + pageHash[raw[0]][0],
    sum: pageHash[raw[0]][1],
    img: 'http://wellsfargomedia.com/sibos2012/images/header/wf-sibos.png'
};

try {
    $('#head0').text(stStrings.tab);
    $('#head1, #head3').attr('content', stStrings.tab);
    $('#head2, #head4').attr('content', stStrings.sum);
    $('#head5').attr('content', stStrings.url);
//    $('#head6').attr('content', stStrings.img);
} catch (e) {
    e = e;
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function givingLinks() {

    var articles = $('div.part'),
    current = location.hash ? $(location.hash) : articles.first(),
    speed = 333;

    function showTime(str) {
        console.log(str);
        current.fadeOut(speed, function () {
            current.fadeIn(speed);
        });
        current = (!str) ? articles.first() : $(str);
    }
    articles.not(current).hide();
    $(window).bind('hashchange', function (jev) {
        location.reload();
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
