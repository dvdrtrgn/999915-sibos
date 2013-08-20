/*global  dev, drt, console, location, $ */

var dev, drt = {
    activeNavButton: function () {
        var page = (' ' + location.pathname).split('/').pop();
        $('a[href="' + page + '"]').addClass('active');
    },
    animateBanner: function () {
        var div = $('#banner')
        ,   all = div.find('.banner')
        ,   cnt = all.length
        ,   now = cnt-1
        ;
        if (cnt === 0) return;
        all.not(all.eq(cnt-1)).css({
            width: 0
        });
        div.bind('next.rot', function (){
            var nex = (now - 1) % cnt;
            all.eq(now).animate({
                width: 0
            }, 333);
            all.eq(nex).animate({
                width: 898
            }, 333);
            now = nex;
        });
        setInterval(function(){
            div.trigger('next.rot');
        }, 9999);
    },
    shadowboxPic: function (i, e) {
        var lnk = $(e)
        ,   pic = $('#' + e.title)
        ,   div = pic.parent()
        ;
        lnk.bind('click', function(evt){
            evt.preventDefault();
            div.trigger('show.pic');
            return false;
        });
        if (div.data('pic')) return;
        div.appendTo('body').data('pic', true);
        div.bind('show.pic', function(){
            div.addClass('big');
        });
        div.bind('hide.pic', function(){
            div.removeClass('big');
        });
        div.bind('mouseup', function(evt){
            var who = evt.target.className.match('popup');
            if (who && who.length) div.trigger('hide.pic');
        });
    },
    shadowboxVid: function (i, e) {
        var lnk = $(e)
        ,   vid = $('#' + e.title)
        ,   div = vid.parent()
        ,   vip
        ;
        lnk.bind('mouseup', function(){
            div.trigger('show.vid');
            return false;
        }).attr('href', null);
        if (div.data('vid')) return;
        div.appendTo('body').data('vid', true);
        div.bind('show.vid', function(){
            div.addClass('big');
            if (!vip) return; // vip.currentTime(7);
            vip.play();
        });
        div.bind('hide.vid', function(){
            vip.pause();
            div.removeClass('big');
        });
        div.bind('mouseup', function(evt){
            //  console.log(evt);
            var who = evt.target.className.match('popup');
            if (who && who.length) div.trigger('hide.vid');
        });

        _V_(vid.prop('id')).ready(function(){
            vip = this;
            console.log('ready', vid, vip);
        });
    },
    init: function () {
//        $('#header, #navbar, #footer').nosel();
//        $('img').parent().nosel();
        drt.activeNavButton();
        drt.animateBanner();
        $('#banner').show();
        try {
            if (!(/mobi/i).test(navigator.userAgent)){
                $('a.popup.vid').each(drt.shadowboxVid);
                $('a.popup.pic').each(drt.shadowboxPic);
            }
        } catch (err) {
            return;
        }
    }
};

$(drt.init);

