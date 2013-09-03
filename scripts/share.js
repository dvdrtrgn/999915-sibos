/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function startSharing() {
    try {
        stLight = window.stLight || {};
        stLight.options({
            publisher: "82e0d732-4a87-44d4-9685-61131d7a57b6",
            onhover: false
        });
        stWidget.addEntry({
            element: document.getElementById('st_twitter'),
            service: 'twitter',
            title: ShareStrings.tab + '/' + ShareStrings.sum,
            url: ShareStrings.url,
            summary: ShareStrings.tab,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_linkedin'),
            service: 'linkedin',
            title: ShareStrings.tab,
            url: ShareStrings.url,
            summary: ShareStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_email'),
            service: 'email',
            title: ShareStrings.tab,
            url: ShareStrings.url,
            summary: ShareStrings.sum,
            image: ShareStrings.img,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_facebook'),
            service: 'facebook',
            title: ShareStrings.tab,
            url: ShareStrings.url,
            summary: ShareStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_googleplus'),
            service: 'googleplus',
            title: ShareStrings.tab,
            url: ShareStrings.url,
            summary: ShareStrings.sum,
            type: 'chicklet'
        });
        stWidget.addEntry({
            element: document.getElementById('st_pinterest'),
            service: 'pinterest',
            title: ShareStrings.tab,
            url: ShareStrings.url,
            summary: ShareStrings.sum,
            type: 'chicklet'
        });
    } catch(e){}
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
