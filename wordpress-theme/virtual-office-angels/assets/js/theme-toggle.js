/**
 * Light and dark theme switch — useTheme.ts and ThemeToggle.tsx.
 *
 * Same mechanism as the React build, so a visitor's choice carries across: a data-theme attribute on
 * <html> and a localStorage key named voa-theme. The attribute is applied before first paint by the
 * inline script in inc/enqueue.php; this module keeps the button and the browser theme colour in step
 * and handles the click.
 *
 * The button offers the theme you are not in: in light mode it reads "Use dark theme" and shows ☾,
 * in dark mode "Use light theme" and ☀. PHP renders the light state; this corrects it on load when
 * the stored theme is dark.
 */
(function () {
	'use strict';

	var STORAGE_KEY = 'voa-theme';
	var COLOURS = { light: '#f7f6f2', dark: '#081522' };
	var root = document.documentElement;

	function current() {
		return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
	}

	function apply(theme, buttons) {
		var next = theme === 'dark' ? 'light' : 'dark';
		var colour = document.querySelector('meta[name="theme-color"]');

		root.setAttribute('data-theme', theme);

		if (colour) {
			colour.setAttribute('content', COLOURS[theme]);
		}

		buttons.forEach(function (button) {
			var mark = button.querySelector('span');
			button.setAttribute('aria-label', 'Use ' + next + ' theme');
			button.setAttribute('title', 'Use ' + next + ' theme');
			if (mark) {
				mark.textContent = theme === 'dark' ? '☀' : '☾';
			}
		});

		/* Private browsing and blocked site data make this throw; the switch still works for the page. */
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
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
