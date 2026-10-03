/**
 * The four-stage journey diagram on the home page.
 *
 * The vanilla port of the openStage state in HomePage.tsx. Selecting a marker swaps the detail panel
 * beneath the curve.
 *
 * The marker coordinates are NOT computed here. They are four fixed percentages that sit exactly on
 * the quadratic the SVG draws (`M0,150 Q500,10 1000,90`), and they were measured rather than
 * eyeballed — two earlier attempts put the markers 22 and then 91 units off the curve. PHP writes
 * them as inline left/top styles, so there is nothing to re-derive here. If the curve ever changes,
 * recompute the points against the new path; do not nudge them by eye.
 *
 *   stage 1  left 10%  top 62.10%
 *   stage 2  left 36%  top 38.86%
 *   stage 3  left 62%  top 30.48%
 *   stage 4  left 86%  top 35.96%
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

		if (!items.length || !detail) {
			return;
		}

		var panels = Array.prototype.slice.call(detail.querySelectorAll('[data-stage-panel]'));

		function select(index) {
			items.forEach(function (item, i) {
				var open = i === index;
				var button = item.querySelector('button');

				item.setAttribute('data-open', open ? 'true' : 'false');

				if (button) {
					button.setAttribute('aria-expanded', open ? 'true' : 'false');
				}
			});

			panels.forEach(function (panel, i) {
				panel.hidden = i !== index;
			});

			// The CSS numbers the panel from this attribute, so it has to track the selection.
			detail.setAttribute('data-stage', ('0' + (index + 1)).slice(-2));
		}

		items.forEach(function (item, index) {
			var button = item.querySelector('button');

			if (!button) {
				return;
			}

			button.addEventListener('click', function () {
				select(index);
			});
		});

		select(0);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
