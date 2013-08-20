/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
$(function () {
    try {
        stLight = window.stLight || {};
        stLight.options({
            publisher: "82e0d732-4a87-44d4-9685-61131d7a57b6",
            onhover: false
        });
        stWidget.addEntry({
            element: document.getElementById('st_twitter'),
            service: 'twitter',
            title: stStrings.tab + '/' + stStrings.sum,
            url: stStrings.url,
            summary: stStrings.tab,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_linkedin'),
            service: 'linkedin',
            title: stStrings.tab,
            url: stStrings.url,
            summary: stStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_email'),
            service: 'email',
            title: stStrings.tab,
            url: stStrings.url,
            summary: stStrings.sum,
            image: stStrings.img,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_facebook'),
            service: 'facebook',
            title: stStrings.tab,
            url: stStrings.url,
            summary: stStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_googleplus'),
            service: 'googleplus',
            title: stStrings.tab,
            url: stStrings.url,
            summary: stStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_pinterest'),
            service: 'pinterest',
            title: stStrings.tab,
            url: stStrings.url,
            summary: stStrings.sum,
            type: 'chicklet'
        });
    } catch(e){}
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
