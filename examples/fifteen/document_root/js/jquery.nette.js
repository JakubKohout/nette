/**
 * AJAX Nette Framwork plugin for jQuery
 *
 * @copyright  Copyright (c) 2009 Jan Marek
 * @copyright  Copyright (c) 2009 David Grudl
 * @license    MIT
 * @link       http://nettephp.com/cs/extras/jquery-ajax
 * @version    0.2
 */

/*
if (typeof jQuery != 'function') {
	alert('jQuery was not loaded');
}
*/

(function($) {

	$.nette = {
		success: function(data)
		{
			// redirect
			if (data.redirect) {
				window.location.href = data.redirect;
				return;
			}

			// state
			if (data.state) {
				$.nette.state = data.state;
			}

			// snippets
			if (data.snippets) {
				for (var i in data.snippets) {
					$.nette.updateSnippet(i, data.snippets[i]);
				}
			}
		},

		updateSnippet: function(id, html)
		{
			$('#' + id).html(html);
		},

		// create animated spinner
		createSpinner: function(id)
		{
			return this.spinner = $('<div></div>').attr('id', id ? id : 'ajax-spinner').ajaxStart(function() {
				$(this).show();

			}).ajaxStop(function() {
				$(this).hide().css({
					position: 'fixed',
					left: '50%',
					top: '50%'
				});

			}).appendTo('body').hide();
		},

		// current page state
		state: null,

		// spinner element
		spinner: null
	};


})(jQuery);



jQuery(function($) {

	$.ajaxSetup({
		success: $.nette.success,
		dataType: 'json'
	});

	$.nette.createSpinner();

	// apply AJAX unobtrusive way
	$('a.ajax').live('click', function(event) {
		event.preventDefault();
		if ($.active) return;

		$.post(this.href, $.nette.success);

		$.nette.spinner.css({
			position: 'absolute',
			left: event.pageX,
			top: event.pageY
		});
	});

});