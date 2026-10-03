/**
 * Scroll reveals.
 *
 * The vanilla port of the effect in the React build's PageShell.tsx. Sections fade and rise as they
 * enter the viewport, and cards inside them stagger.
 *
 * Two parts of the React version are deliberately dropped. Both existed only because that build is a
 * single-page app:
 *
 *   - Scroll reset on navigation. WordPress does full page loads, so the browser already does this.
 *   - MutationObserver re-registration. React swapped the whole <main> on every route change; here
 *     the markup is server-rendered and static.
 *
 * What is kept exactly: the two data attributes the CSS keys off, the 0.92 viewport threshold, the
 * scroll/resize/load safety net, and the reduced-motion behaviour.
 */
(function () {
	'use strict';

	/*
	 * Sections above this fraction of the viewport are revealed immediately rather than waiting for
	 * the observer. Without it, anything already on screen at load would stay invisible until the
	 * visitor scrolled — including the whole first screen.
	 */
	var VISIBLE_RATIO = 0.92;

	function init() {
		var main = document.getElementById('main-content');

		if (!main) {
			return;
		}

		var sections = Array.prototype.slice.call(main.querySelectorAll('.section, .evidence-strip'))
			.filter(function (section) {
				// The hero is visible on arrival and has its own entrance animation.
				return !section.classList.contains('home-hero');
			});

		if (!sections.length) {
			return;
		}

		function reveal(section) {
			section.dataset.pageVisible = 'true';

			if (section.hasAttribute('data-home-reveal')) {
				section.dataset.visible = 'true';
			}
		}

		function markReady(section) {
			if (section.dataset.pageMotionReady === 'true') {
				return;
			}

			section.dataset.pageMotionReady = 'true';

			if (section.hasAttribute('data-home-reveal')) {
				section.dataset.motionReady = 'true';
			}
		}

		/*
		 * Reduced motion, or a browser without IntersectionObserver: show everything at once. The
		 * CSS reveals a section the moment data-page-visible is set, so this is a complete,
		 * motion-free rendering rather than a degraded one.
		 */
		if (window.voaMotion.reduced() || !('IntersectionObserver' in window)) {
			sections.forEach(function (section) {
				markReady(section);
				reveal(section);
			});
			return;
		}

		var pending = [];

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				reveal(entry.target);
				observer.unobserve(entry.target);

				var i = pending.indexOf(entry.target);
				if (i > -1) {
					pending.splice(i, 1);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

		sections.forEach(function (section) {
			markReady(section);

			var bounds = section.getBoundingClientRect();

			if (bounds.top < window.innerHeight * VISIBLE_RATIO && bounds.bottom > 0) {
				reveal(section);
				return;
			}

			pending.push(section);
			observer.observe(section);
		});

		/*
		 * The observer misses cases where layout shifts after it was set up — a late-loading image
		 * moving a section up, or the browser restoring a scroll position. This sweep catches them.
		 */
		function sweep() {
			pending.slice().forEach(function (section) {
				var bounds = section.getBoundingClientRect();

				if (bounds.top < window.innerHeight * VISIBLE_RATIO && bounds.bottom > 0) {
					reveal(section);
					observer.unobserve(section);
					pending.splice(pending.indexOf(section), 1);
				}
			});
		}

		window.addEventListener('scroll', sweep, { passive: true });
		window.addEventListener('resize', sweep);
		window.addEventListener('load', sweep);
		window.setTimeout(sweep, 250);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
