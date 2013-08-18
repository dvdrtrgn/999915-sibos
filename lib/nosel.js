(function($) {
    $.fn.nosel = function() {
        return this.each(function() {

            $(this)
            .css('-moz-user-select', 'none')        // FF
            .css('-khtml-user-select', 'none')      // Safari, Google Chrome
            .css('user-select', 'none');            // CSS 3

            if ($.browser.msie) {                   // IE
                $(this).each(function() {
                    this.ondrag = function() {
                        return false;
                    };
                });
                $(this).each(function() {
                    this.onselectstart = function() {
                        return (false);
                    };
                });
            } else if($.browser.opera) {
                $(this).attr('unselectable', 'on');
            }
        });
    };
	if ($.browser.msie) {
		$('body').addClass('IE');
	}
	if ($.browser.mozilla) {
		$('body').addClass('FF');
	}
	if ($.browser.webkit) {
		$('body').addClass('WK');
	}
})(jQuery);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
