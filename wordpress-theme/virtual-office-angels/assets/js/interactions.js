/**
 * The smaller interactions, each the port of a piece of React state:
 *
 *   services backdrop   HomePage activeService — hovering or focusing a service card fades its
 *                        photograph in behind the grid
 *   article rail         HomePage scrollRail — the arrows scroll the rail by 80% of its width
 *   systems diagram      SystemsDiagram active — hovering a chip lights its spoke back to the core
 *   article library      InsightsPage — topic filter and ten-a-page paging, in place
 *   FAQ topics           FaqPage activeTopic — the topic buttons swap the question list
 *
 * The library and the FAQ page carry their full data as JSON beside the markup; the first view is
 * rendered by PHP, and the builders here produce the same markup for every later one.
 */
(function () {
	'use strict';

	var ARROW_LEFT = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 12H6"/><path d="m11.5 6-6 6 6 6"/></svg>';
	var ARROW_RIGHT = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h14"/><path d="m12.5 6 6 6-6 6"/></svg>';
	var PLUS = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5.5v13"/><path d="M5.5 12h13"/></svg>';

	function each(selector, fn, scope) {
		Array.prototype.forEach.call((scope || document).querySelectorAll(selector), fn);
	}

	function escape(text) {
		var node = document.createElement('div');
		node.textContent = text;
		return node.innerHTML.replace(/"/g, '&quot;');
	}

	function readJson(scope, selector) {
		var node = scope.querySelector(selector);
		try {
			return node ? JSON.parse(node.textContent) : null;
		} catch (e) {
			return null;
		}
	}

	function scrollToSection(section) {
		section.scrollIntoView({ behavior: window.voaMotion.reduced() ? 'auto' : 'smooth', block: 'start' });
	}

	/* --- Services backdrop ------------------------------------------------------------------ */

	function servicesBackdrop() {
		var wash = document.querySelectorAll('.services-wash span');

		each('.service-grid .service-card', function (card, index) {
			function on() {
				Array.prototype.forEach.call(wash, function (span, i) {
					span.setAttribute('data-active', i === index ? 'true' : 'false');
				});
			}
			function off() {
				if (wash[index]) {
					wash[index].setAttribute('data-active', 'false');
				}
			}
			card.addEventListener('mouseenter', on);
			card.addEventListener('focus', on);
			card.addEventListener('mouseleave', off);
			card.addEventListener('blur', off);
		});
	}

	/* --- Article rail ----------------------------------------------------------------------- */

	function articleRail() {
		var rail = document.querySelector('.article-rail');
		var buttons = document.querySelectorAll('.rail-controls button');

		if (!rail || buttons.length < 2) {
			return;
		}

		[-1, 1].forEach(function (direction, i) {
			buttons[i].addEventListener('click', function () {
				rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: window.voaMotion.reduced() ? 'auto' : 'smooth' });
			});
		});
	}

	/* --- Systems diagram -------------------------------------------------------------------- */

	function systemsDiagram() {
		each('.systems-diagram', function (diagram) {
			var lines = diagram.querySelectorAll('.systems-links line');
			var core = diagram.querySelector('.systems-core');
			var chips = diagram.querySelectorAll('.systems-chip');

			function set(active) {
				var linked = active >= 0 ? 'true' : 'false';
				diagram.setAttribute('data-linked', linked);
				if (core) {
					core.setAttribute('data-linked', linked);
				}
				Array.prototype.forEach.call(lines, function (line, i) {
					line.setAttribute('data-active', i === active ? 'true' : 'false');
				});
				Array.prototype.forEach.call(chips, function (chip, i) {
					chip.setAttribute('data-active', i === active ? 'true' : 'false');
				});
			}

			Array.prototype.forEach.call(chips, function (chip, index) {
				chip.addEventListener('mouseenter', function () {
					set(index);
				});
				chip.addEventListener('mouseleave', function () {
					if (chip.getAttribute('data-active') === 'true') {
						set(-1);
					}
				});
			});
		});
	}

	/* --- Article library -------------------------------------------------------------------- */

	function pagination(label, current, pages) {
		if (pages < 2) {
			return '';
		}
		var html = '<nav class="pagination" aria-label="' + escape(label) + '">';
		html += '<button type="button"' + (current === 1 ? ' disabled' : '') + '>' + ARROW_LEFT + ' Previous</button>';
		for (var n = 1; n <= pages; n++) {
			html += '<button type="button" class="' + (n === current ? 'active' : '') + '" aria-label="Page ' + n + '"' + (n === current ? ' aria-current="page"' : '') + '>' + n + '</button>';
		}
		html += '<button type="button"' + (current === pages ? ' disabled' : '') + '>Next ' + ARROW_RIGHT + '</button>';
		return html + '</nav>';
	}

	function articleCard(item, featured) {
		var image = item.image
			? '<img src="' + escape(item.image) + '" alt="" loading="lazy">'
			: '<span class="image-fallback" aria-hidden="true">' + escape(item.category) + '</span>';

		return '<article class="' + (featured ? 'article-card featured' : 'article-card') + '">' +
			'<a class="article-art" href="' + escape(item.url) + '">' + image + '<span>' + escape(item.category) + '</span></a>' +
			'<div><small>' + escape(item.date) + ' · ' + escape(item.category) + '</small>' +
			'<h2><a href="' + escape(item.url) + '">' + escape(item.title) + '</a></h2>' +
			'<a class="text-link" href="' + escape(item.url) + '">Read article ' + ARROW_RIGHT + '</a></div></article>';
	}

	function articleLibrary() {
		var section = document.querySelector('.library-section');
		var data = section && readJson(section, '.voa-library-data');

		if (!data) {
			return;
		}

		var grid = section.querySelector('.article-grid');
		var count = section.querySelector('.library-count');
		var filters = section.querySelectorAll('.filter-row button');
		var topic = data.all;
		var page = 1;

		function render() {
			var visible = topic === data.all ? data.items : data.items.filter(function (item) {
				return item.category === topic;
			});
			var pages = Math.ceil(visible.length / data.perPage);
			var slice = visible.slice((page - 1) * data.perPage, page * data.perPage);

			count.textContent = visible.length + ' ' + (visible.length === 1 ? 'article' : 'articles');
			grid.innerHTML = slice.map(function (item, index) {
				return articleCard(item, index === 0 && page === 1 && topic === data.all);
			}).join('');

			/* A single page has no pagination at all, as in React, so the block is rebuilt each time. */
			var nav = section.querySelector('.pagination');
			if (nav) {
				nav.parentNode.removeChild(nav);
			}
			grid.insertAdjacentHTML('afterend', pagination('Article pages', page, pages));
		}

		Array.prototype.forEach.call(filters, function (button) {
			button.addEventListener('click', function () {
				topic = button.textContent;
				page = 1;
				Array.prototype.forEach.call(filters, function (other) {
					var on = other === button;
					other.className = on ? 'active' : '';
					other.setAttribute('aria-pressed', on ? 'true' : 'false');
				});
				render();
			});
		});

		section.addEventListener('click', function (event) {
			var button = event.target.closest('.pagination button');
			if (!button || button.disabled) {
				return;
			}
			var buttons = Array.prototype.slice.call(button.parentNode.children);
			var index = buttons.indexOf(button);
			page = index === 0 ? page - 1 : index === buttons.length - 1 ? page + 1 : Number(button.textContent);
			render();
			scrollToSection(section);
		});
	}

	/* --- FAQ topics ------------------------------------------------------------------------- */

	function faqTopics() {
		var page = document.querySelector('.faq-page');
		var data = page && readJson(page, '.voa-faq-data');

		if (!data) {
			return;
		}

		var list = page.querySelector('.faq-list');
		var buttons = page.querySelectorAll('.faq-topics button');

		Array.prototype.forEach.call(buttons, function (button, index) {
			button.addEventListener('click', function () {
				Array.prototype.forEach.call(buttons, function (other, i) {
					other.className = i === index ? 'active' : '';
					other.setAttribute('aria-pressed', i === index ? 'true' : 'false');
				});
				list.innerHTML = data.topics[index].questions.map(function (q) {
					var faq = data.questions[q];
					return '<details><summary>' + escape(faq[0]) + PLUS + '</summary><p>' + escape(faq[1]) + '</p></details>';
				}).join('');
			});
		});
	}

	function init() {
		servicesBackdrop();
		articleRail();
		systemsDiagram();
		articleLibrary();
		faqTopics();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
}());
