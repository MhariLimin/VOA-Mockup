/**
 * The four-stage journey diagram on the home page — the openStage state in HomePage.tsx.
 *
 * Selecting a marker opens it and swaps the single detail panel beneath the curve to that stage's
 * heading and text, which PHP leaves on each button as data-voa-heading / data-voa-text. One panel,
 * as in React, so the markup matches the approved build exactly.
 *
 * The marker coordinates are NOT computed here. They are four fixed percentages that sit on the
 * quadratic the SVG draws (`M0,150 Q500,10 1000,90`); PHP writes them as inline styles.
 */
(function () {
	'use strict';

	function init() {
		var journey = document.querySelector('.journey');

		if (!journey) {
			return;
		}

		var items = Array.prototype.slice.call(journey.querySelectorAll('.journey-plot li'));
		var detail = journey.querySelector('.stage-detail');
		var heading = detail && detail.querySelector('h3');
		var text = detail && detail.querySelector('p');

		if (!items.length || !heading || !text) {
			return;
		}

		function select(index) {
			items.forEach(function (item, i) {
				var open = i === index;
				item.setAttribute('data-open', open ? 'true' : 'false');
				item.querySelector('button').setAttribute('aria-expanded', open ? 'true' : 'false');
			});

			var button = items[index].querySelector('button');

			/*
			 * React re-keys the heading and paragraph on every change, which replays their CSS entrance
			 * animation. Replacing the nodes does the same here.
			 */
			var nextHeading = heading.cloneNode(false);
			var nextText = text.cloneNode(false);
			nextHeading.textContent = button.getAttribute('data-voa-heading');
			nextText.textContent = button.getAttribute('data-voa-text');
			detail.replaceChild(nextHeading, heading);
			detail.replaceChild(nextText, text);
			heading = nextHeading;
			text = nextText;

			detail.setAttribute('data-stage', ('0' + (index + 1)).slice(-2));
		}

		items.forEach(function (item, index) {
			item.querySelector('button').addEventListener('click', function () {
				select(index);
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
