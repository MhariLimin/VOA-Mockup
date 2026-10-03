/**
 * Accordions.
 *
 * The vanilla port of the Accordion component in SourcePage.tsx, used by the service pages, About and
 * Why Virtual Office Angels.
 *
 * Native <details>/<summary> was the original plan — less code, keyboard support for free — but the
 * existing CSS targets `.accordion-item button[aria-expanded]` and `.accordion-panel[hidden]`, and a
 * <details> element cannot carry those. Reusing the React markup means 3,011 lines of proven CSS
 * transfer untouched, which is worth more than the few lines saved here.
 *
 * One panel open at a time, matching the source document's own behaviour.
 *
 * Markup, rendered by PHP:
 *
 *   <div class="accordion">
 *     <div class="accordion-item">
 *       <button aria-expanded="false" aria-controls="x-0"><span>Heading</span><span>+</span></button>
 *       <p class="accordion-panel" id="x-0" hidden>Body</p>
 *
 * The separate .faq-list on the home page and /faqs DOES use native <details>, and needs nothing from
 * this file.
 */
(function () {
	'use strict';

	function setup(accordion) {
		var items = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-item'));

		if (!items.length) {
			return;
		}

		function close(item) {
			var button = item.querySelector('button');
			var panel = item.querySelector('.accordion-panel');

			if (button) {
				button.setAttribute('aria-expanded', 'false');
			}

			if (panel) {
				panel.hidden = true;
			}
		}

		items.forEach(function (item) {
			var button = item.querySelector('button');
			var panel = item.querySelector('.accordion-panel');

			if (!button || !panel) {
				return;
			}

			button.addEventListener('click', function () {
				var open = button.getAttribute('aria-expanded') === 'true';

				items.forEach(close);

				if (!open) {
					button.setAttribute('aria-expanded', 'true');
					panel.hidden = false;
				}
			});
		});
	}

	function init() {
		Array.prototype.forEach.call(document.querySelectorAll('.accordion'), setup);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
