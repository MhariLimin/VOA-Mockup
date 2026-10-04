/**
 * Rotating section backgrounds.
 *
 * The vanilla port of useImageRotator.ts, driving two things:
 *
 *   .hero-backdrop     the home hero slideshow, with dot controls (.hero-dots)
 *   .section-backdrop  the closing "Let's talk" sections, decorative, no controls
 *
 * The cross-fade itself is CSS — a 2200ms opacity transition on [data-active]. This file only moves
 * the attribute, which is why the fade stays slow and symmetrical: the user asked for a slow fade out
 * and in so each photograph is seen for an extra beat.
 *
 * Markup, rendered by PHP:
 *
 *   <div class="hero-backdrop">            (data-interval optional; 6000 ms by default)
 *     <span data-active="true"  style="background-image:url(…)"></span>
 *     <span data-active="false" style="background-image:url(…)"></span>
 *   </div>
 */
(function () {
	'use strict';

	var DEFAULT_INTERVAL = 6000;

	function setup(backdrop) {
		var slides = Array.prototype.slice.call(backdrop.children).filter(function (node) {
			return node.tagName === 'SPAN';
		});

		if (slides.length < 2) {
			// One image cannot rotate, and zero would divide by zero below.
			return;
		}

		var interval = parseInt(backdrop.getAttribute('data-interval'), 10) || DEFAULT_INTERVAL;
		var active = 0;
		var timer = null;

		function show(index) {
			active = (index + slides.length) % slides.length;

			slides.forEach(function (slide, i) {
				slide.setAttribute('data-active', i === active ? 'true' : 'false');
			});

			if (dots.length) {
				dots.forEach(function (dot, i) {
					dot.setAttribute('data-active', i === active ? 'true' : 'false');
					dot.setAttribute('aria-pressed', i === active ? 'true' : 'false');
				});
			}
		}

		function stop() {
			if (timer !== null) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			stop();

			if (window.voaMotion.reduced()) {
				return;
			}

			timer = window.setInterval(function () {
				show(active + 1);
			}, interval);
		}

		/*
		 * The dots belong to the hero and sit outside the backdrop element, so they are found through
		 * the shared section rather than as children.
		 */
		var section = backdrop.closest('.section') || document;
		var dots = Array.prototype.slice.call(section.querySelectorAll('.hero-dot'));

		if (dots.length === slides.length) {
			dots.forEach(function (dot, index) {
				dot.addEventListener('click', function () {
					show(index);
					// Restart, so a hand-picked image gets its full turn rather than the remainder
					// of a tick that was already running.
					start();
				});
			});
		}

		show(0);
		start();

		/*
		 * Honour a change of preference mid-session, and stop the timer while the tab is hidden —
		 * browsers throttle it anyway, and resuming from a stale index causes a visible jump.
		 */
		window.voaMotion.subscribe(function (reduced) {
			if (reduced) {
				stop();
			} else {
				start();
			}
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});
	}

	function init() {
		var backdrops = document.querySelectorAll('.hero-backdrop, .section-backdrop');
		Array.prototype.forEach.call(backdrops, setup);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
