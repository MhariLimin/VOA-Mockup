/**
 * Client logo carousel.
 *
 * The vanilla port of ClientCarousel.tsx. Behaviour that was decided deliberately and must not drift:
 *
 *   - Advances every 1 second.
 *   - Pauses on hover and on focus.
 *   - Has NO pause button. The pause-on-interaction is what makes that acceptable.
 *   - Uses the complete client set, not a selection.
 *
 * The loop works by appending the first five slides to the end. When the track reaches the real end
 * it jumps back to zero with the transition switched off, so the wrap is invisible and the motion
 * reads as continuous rather than rewinding.
 *
 * Markup, rendered by PHP:
 *
 *   <div class="client-carousel">
 *     <div class="client-carousel-viewport">
 *       <div class="client-carousel-track">
 *         <div class="client-slide">…</div>   (count + 5 of these)
 *
 * PHP renders the duplicated slides, so this file never has to build DOM.
 */
(function () {
	'use strict';

	var STEP_MS = 1000;
	var WRAP_MS = 480;   // must match the track's CSS transition duration
	var CLONES = 5;      // how many slides PHP repeats at the end

	/** Visible slides at the current width. Matches the React breakpoints exactly. */
	function visibleCount() {
		var w = window.innerWidth;

		if (w < 480) {
			return 1;
		}
		if (w < 736) {
			return 2;
		}
		if (w < 1100) {
			return 3;
		}
		return 5;
	}

	function setup(carousel) {
		var track = carousel.querySelector('.client-carousel-track');

		if (!track) {
			return;
		}

		var slides = track.querySelectorAll('.client-slide');
		var total = slides.length - CLONES; // the real clients, excluding the appended copies

		if (total < 2) {
			return;
		}

		var active = 0;
		var visible = visibleCount();
		var paused = false;
		var timer = null;

		function render(animate) {
			track.style.transition = animate && !window.voaMotion.reduced() ? '' : 'none';
			track.style.setProperty('--visible-clients', String(visible));
			track.style.transform = 'translateX(-' + (active * (100 / visible)) + '%)';

			/*
			 * Slides outside the window are hidden from assistive technology. Without this a screen
			 * reader announces all thirty-five logos, most of them off screen.
			 */
			Array.prototype.forEach.call(slides, function (slide, i) {
				var inView = i >= active && i < active + visible;
				slide.setAttribute('aria-hidden', inView ? 'false' : 'true');
			});
		}

		function advance() {
			active += 1;

			if (active < total) {
				render(true);
				return;
			}

			/*
			 * Animate into the cloned slides, then snap back to the start with the transition off.
			 * Two nested rAFs: the first lets the jump paint, the second re-enables the transition
			 * only once it has. One frame is not enough — the browser coalesces the two style
			 * changes and the jump animates visibly.
			 */
			render(true);

			window.setTimeout(function () {
				active = 0;
				render(false);

				window.requestAnimationFrame(function () {
					window.requestAnimationFrame(function () {
						track.style.transition = '';
					});
				});
			}, window.voaMotion.reduced() ? 0 : WRAP_MS);
		}

		function stop() {
			if (timer !== null) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			stop();

			if (paused || window.voaMotion.reduced()) {
				return;
			}

			timer = window.setInterval(advance, STEP_MS);
		}

		function pause() {
			paused = true;
			stop();
		}

		function resume() {
			paused = false;
			start();
		}

		carousel.addEventListener('mouseenter', pause);
		carousel.addEventListener('mouseleave', resume);
		carousel.addEventListener('focusin', pause);
		carousel.addEventListener('focusout', resume);

		var previous = carousel.querySelector('.carousel-controls button:first-child');
		var next = carousel.querySelector('.carousel-controls button:last-child');

		if (previous) {
			previous.addEventListener('click', function () {
				if (active === 0) {
					// Jump to the end without animating backwards through every logo.
					active = total - 1;
					render(false);
					window.requestAnimationFrame(function () {
						window.requestAnimationFrame(function () {
							track.style.transition = '';
						});
					});
					return;
				}

				active -= 1;
				render(true);
			});
		}

		if (next) {
			next.addEventListener('click', advance);
		}

		window.addEventListener('resize', function () {
			var count = visibleCount();

			if (count === visible) {
				return;
			}

			visible = count;
			render(false);
		});

		window.voaMotion.subscribe(function () {
			start();
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});

		render(false);
		start();
	}

	function init() {
		Array.prototype.forEach.call(document.querySelectorAll('.client-carousel'), setup);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
