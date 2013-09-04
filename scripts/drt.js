/*jslint es5:true, white:false */
/*globals $, W */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var drt = {
    shadowboxPic: function (i, e) {
        var lnk = $(e),
            pic = $('#' + e.title),
            div = pic.parent();
        lnk.bind('click', function (evt) {
            evt.preventDefault();
            div.trigger('show.pic');
            return false;
        });
        if (div.data('pic')) {
            return;
        }
        div.appendTo('body').data('pic', true);
        div.bind('show.pic', function () {
            div.addClass('big');
        });
        div.bind('hide.pic', function () {
            div.removeClass('big');
        });
        div.bind('mouseup', function (evt) {
            var who = evt.target.className.match('popup');
            if (who && who.length) {
                div.trigger('hide.pic');
            }
        });
    },
    init: function () {
        try {
            if (!_mobile()) {
                $('a.popup.vid').each(drt.shadowboxVid);
                $('a.popup.pic').each(drt.shadowboxPic);
            }
        } catch (err) {
            return err;
        }
    }
};

$(drt.init);

/*
Device::
    isMobile:bool (< laptop)
    isMini:bool (palmsize)
    (xsr)treatAs:str (palmtop, laptop, desktop) inherit bestGuess
    bestGuess:str
        if not mini and not mobile ... desk?

 */
