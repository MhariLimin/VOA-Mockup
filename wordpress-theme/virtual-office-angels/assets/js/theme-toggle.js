/**
 * Light and dark theme switch.
 *
 * The vanilla replacement for the React build's useTheme hook. Same mechanism, so a visitor's choice
 * carries across from the prototype: a data-theme attribute on <html> and a localStorage key named
 * voa-theme.
 *
 * The attribute is applied before this file runs, by the inline script in inc/enqueue.php — if it
 * waited for this module the page would paint light and then switch, which is a visible flash on
 * every load for anyone using the dark theme. This module only handles the button.
 */
(function () {
	'use strict';

	var STORAGE_KEY = 'voa-theme';
	var root = document.documentElement;

	function current() {
		return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
	}

	function apply(theme, buttons) {
		root.setAttribute('data-theme', theme);

		buttons.forEach(function (button) {
			button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
		});

		/*
		 * Private browsing, blocked site data and quota limits all make this throw. The switch still
		 * works for the current page; only the memory of it is lost.
		 */
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (e) {
			/* Not fatal. */
		}
	}

	function init() {
		var buttons = Array.prototype.slice.call(document.querySelectorAll('.theme-toggle'));

		if (!buttons.length) {
			return;
		}

		apply(current(), buttons);

		buttons.forEach(function (button) {
			button.addEventListener('click', function () {
				apply(current() === 'dark' ? 'light' : 'dark', buttons);
			});
		});

		/*
		 * Follow the system preference only while the visitor has never chosen for themselves. Once
		 * they have, their choice wins.
		 */
		var system = window.matchMedia('(prefers-color-scheme: dark)');

		var onSystemChange = function (event) {
			var stored = null;

			try {
				stored = localStorage.getItem(STORAGE_KEY);
			} catch (e) {
				/* Treat an unreadable store as "no choice made". */
			}

			if (!stored) {
				apply(event.matches ? 'dark' : 'light', buttons);
			}
		};

		if (typeof system.addEventListener === 'function') {
			system.addEventListener('change', onSystemChange);
		} else if (typeof system.addListener === 'function') {
			system.addListener(onSystemChange);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
