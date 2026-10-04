/**
 * Accordions and FAQ lists, one panel open at a time.
 *
 * Two markups, both from the React build:
 *
 *   .accordion   Accordion in SourcePage.tsx — a button with aria-expanded, a "+" / "−" toggle mark,
 *                and a panel with the hidden attribute. Service pages, About, /why-voa.
 *
 *   .faq-list    native <details>/<summary> — the home page FAQs and /faqs. React keeps only one open
 *                by intercepting the summary click; this does the same, so opening one closes the rest.
 *                /faqs rebuilds its list when the topic changes, so the handler is delegated.
 */
(function () {
	'use strict';

	function setupAccordion(accordion) {
		var items = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-item'));

		function set(item, open) {
			var button = item.querySelector('button');
			var mark = item.querySelector('.accordion-toggle');

			button.setAttribute('aria-expanded', open ? 'true' : 'false');
			item.querySelector('.accordion-panel').hidden = !open;

			if (mark) {
				mark.textContent = open ? '−' : '+';
			}
		}

		items.forEach(function (item) {
			var button = item.querySelector('button');

			if (!button || !item.querySelector('.accordion-panel')) {
				return;
			}

			button.addEventListener('click', function () {
				var open = button.getAttribute('aria-expanded') === 'true';

				items.forEach(function (other) {
					set(other, false);
				});

				if (!open) {
					set(item, true);
				}
			});
		});
	}

	function setupFaqList(list) {
		list.addEventListener('click', function (event) {
			var summary = event.target.closest('summary');

			if (!summary || !list.contains(summary)) {
				return;
			}

			event.preventDefault();

			var details = summary.parentElement;
			var opening = !details.open;

			Array.prototype.forEach.call(list.querySelectorAll('details'), function (other) {
				other.open = false;
			});

			details.open = opening;
		});
	}

	function init() {
		Array.prototype.forEach.call(document.querySelectorAll('.accordion'), setupAccordion);
		Array.prototype.forEach.call(document.querySelectorAll('.faq-list'), setupFaqList);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
