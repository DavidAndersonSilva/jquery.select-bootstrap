;(function($) {
	$.fn.selectBootstrap = (function(options) {
		var root = jQuery(this);
		var list = root.children();

		var defaults = {
			'label': '',
			'class': ''
		};

		var settings = $.extend({}, defaults, options);

		var extractOpt = function() {
			var out = [];

			$.map(list, function(opt, i) {
				var a = jQuery('<a>')
					.attr('href', '#')
					.html(opt.text)
					.delegate('', 'click', function(e) {
						e.preventDefault();
						evtSelectItem(i);
					});

				out.push(jQuery('<li>').html( a ));
			});

			return out;
		};

		var evtSelectItem = function(index) {
			$.map(list, function(opt, i) {
				jQuery(opt).removeAttr('selected');
			});

			jQuery(list[index]).attr('selected', 'selected');
		};

		var listItems = extractOpt();

		return this.each(function() {
			var formGroup = jQuery('<div>').addClass('select-bootstrap');
			var label = jQuery('<label>').text(settings.label);
			var dropdown = jQuery('<div>').addClass('dropdown');
			var text = jQuery('<span>').addClass('text');
			var caret = jQuery('<span>').addClass('caret');
			var button = jQuery('<button>').attr({ 'type':'button', 'class':'btn btn-default dropdown-toggle', 'data-toggle':'dropdown' });
			var dropdownList = jQuery('<ul>').addClass('dropdown-menu');

			if (settings.class !== null && settings.class !== '' && settings.class !== undefined) {
				formGroup.addClass(settings.class);
			}
			
			if (settings.label !== '' && settings.label !== null && settings.label !== undefined) {
				formGroup.append(label);
			}

			if (settings.label !== null && settings.label !== undefined && listItems.length > 0) {
				text.text(listItems[0].text());
			}

			formGroup.append(dropdown.append( button.append( text, caret ), dropdownList.append( listItems ) ) );
			root.hide().before( formGroup );

			dropdownList.find('a').delegate('', 'click', function(e) {
				e.preventDefault();
				text.text( this.text );
			});
		});
	});
})(jQuery);