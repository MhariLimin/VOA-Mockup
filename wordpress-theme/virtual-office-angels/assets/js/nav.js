/**
 * Header navigation.
 *
 * The vanilla port of the five hooks in Header.tsx, replacing Max Mega Menu.
 *
 * Revision W3-H1 settled how the dropdowns open, and it supersedes the earlier click-only rule.
 * Do not silently change it:
 *
 *   - On pointer devices, panels open on HOVER.
 *   - They stay click/Enter to open and Escape to close, for keyboard and touch.
 *   - Clicking outside the header closes everything.
 *
 * Hover is gated on `(hover: hover)`, because a touch device reports a hover event on first tap and
 * would otherwise open a panel the visitor then has to dismiss before their actual tap registers.
 *
 * Below 62rem the panels become inline accordions rather than floating popovers — that is handled
 * entirely in CSS. This file only moves attributes, so the same code drives both.
 */
(function () {
	'use strict';

	function init() {
		var header = document.querySelector('.site-header');

		if (!header) {
			return;
		}

		var groups = Array.prototype.slice.call(header.querySelectorAll('.nav-group'));
		var nav = header.querySelector('.primary-navigation');
		var toggle = header.querySelector('.menu-toggle');
		var canHover = window.matchMedia('(hover: hover)').matches;

		function setGroup(group, open) {
			var trigger = group.querySelector('.nav-trigger');
			var panel = group.querySelector('.nav-popover');

			if (trigger) {
				trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
			}

			if (panel) {
				panel.setAttribute('data-open', open ? 'true' : 'false');
			}
		}

		function closeAllPanels() {
			groups.forEach(function (group) {
				setGroup(group, false);
			});
		}

		function closeMobile() {
			if (nav) {
				nav.setAttribute('data-open', 'false');
			}

			if (toggle) {
				toggle.setAttribute('aria-expanded', 'false');
			}
		}

		function closeEverything() {
			closeAllPanels();
			closeMobile();
		}

		groups.forEach(function (group) {
			var trigger = group.querySelector('.nav-trigger');

			if (!trigger) {
				return;
			}

			trigger.addEventListener('click', function () {
				var open = trigger.getAttribute('aria-expanded') === 'true';

				// One panel at a time.
				closeAllPanels();
				setGroup(group, !open);
			});

			if (!canHover) {
				return;
			}

			group.addEventListener('mouseenter', function () {
				closeAllPanels();
				setGroup(group, true);
			});

			group.addEventListener('mouseleave', function () {
				setGroup(group, false);
			});
		});

		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = toggle.getAttribute('aria-expanded') === 'true';

				toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
				nav.setAttribute('data-open', open ? 'false' : 'true');

				if (open) {
					closeAllPanels();
				}
			});
		}

		/*
		 * pointerdown rather than click: a click listener fires after the browser has already
		 * followed a link inside the panel, which on a same-page anchor leaves the panel open.
		 */
		document.addEventListener('pointerdown', function (event) {
			if (!header.contains(event.target)) {
				closeEverything();
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key !== 'Escape') {
				return;
			}

			/*
			 * Return focus to the trigger that owned the open panel. Without this, Escape leaves
			 * focus on a now-hidden link and the next Tab starts from the top of the document.
			 */
			var openTrigger = header.querySelector('.nav-trigger[aria-expanded="true"]');

			closeEverything();

			if (openTrigger) {
				openTrigger.focus();
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
