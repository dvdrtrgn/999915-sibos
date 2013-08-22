/*global  dev, drt, C, location, $ */


function givingLinks() {

    var articles = $('div.part'),
    current = location.hash ? $(location.hash) : articles.first(),
    speed = 333;

    function showTime(str) {
        C.log(str);
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

var dev, drt = {
    activeNavButton: function () {
        var page = (' ' + location.pathname).split('/').pop();
        $('a[href="' + page + '"]').addClass('active');
    },
    animateBanner: function () {
        var Df = {};

        Df.all = $('.fade');
        Df.total = Df.all.length;
        Df.now = Df.total;
        Df.time = 999;
        Df.all.css({
            position: 'absolute',
        });

        function decr() {
            Df.now--;

            if (Df.now <= 1) {
                Df.now = Df.total;
                Df.all.fadeIn(Df.time)
            }
            console.error(Df.now);
        }

        function runfade() {
            decr();
            Df.all.eq(Df.now).fadeOut(Df.time, function () {
                setTimeout(function(){
                    runfade(); // recurses
                }, 7777);
            });
        }
        // kick it off
        runfade();
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
    init: function () {
        //  $('#header, #navbar, #footer').nosel();
        //  $('img').parent().nosel();
        drt.activeNavButton();
        //  drt.animateBanner();

        $('#Banner').show();
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
