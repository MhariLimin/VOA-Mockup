/**
 * Reduced-motion reporting.
 *
 * The PHP/vanilla replacement for the React build's useReducedMotion hook. Every other module asks
 * this one whether it may animate, so the preference is read in a single place and stays consistent
 * across the carousel, the backdrop rotator, the scroll reveals and the journey diagram.
 *
 * Exposed on window because the modules load as plain scripts rather than ES modules — there is no
 * bundler in this theme, and adding one for seven small files would not earn its keep.
 */
(function () {
	'use strict';

	var query = window.matchMedia('(prefers-reduced-motion: reduce)');
	var listeners = [];

	function notify() {
		listeners.forEach(function (fn) {
			try {
				fn(query.matches);
			} catch (e) {
				/* A failing listener must not stop the others. */
			}
		});
	}

	/* Safari below 14 only has the deprecated addListener. */
	if (typeof query.addEventListener === 'function') {
		query.addEventListener('change', notify);
	} else if (typeof query.addListener === 'function') {
		query.addListener(notify);
	}

	window.voaMotion = {
		/** @returns {boolean} true when the visitor has asked for reduced motion. */
		reduced: function () {
			return query.matches;
		},

		/**
		 * Run a callback now and again whenever the preference changes.
		 *
		 * @param {function(boolean): void} fn Receives the current value.
		 */
		subscribe: function (fn) {
			listeners.push(fn);
			fn(query.matches);
		}
	};
}());
