/**
 * The enquiry form's two jobs beyond what Contact Form 7 does itself (inc/forms.php):
 *
 *   thank-you page   ContactForm.tsx navigates to /thank-you on submit. Here that happens once
 *                    Contact Form 7 reports the email sent, so a failed send stays on the page
 *                    with its error instead of pretending it went.
 *   ad-click marker  Google adds gclid (or gbraid / wbraid) to the address of an ad's landing page.
 *                    It is kept for the visit, so an enquiry sent from another page still carries it,
 *                    and the staff email is then labelled "From Google ADS".
 */
(function () {
	'use strict';

	var KEY = 'voa-ad-click';
	var PARAMS = ['gclid', 'gbraid', 'wbraid'];

	function rememberAdClick() {
		var params = new URLSearchParams(window.location.search);
		for (var i = 0; i < PARAMS.length; i++) {
			var value = params.get(PARAMS[i]);
			if (value) {
				try {
					sessionStorage.setItem(KEY, value);
				} catch (e) {
					/* Storage blocked: the field is still filled from the address on this page. */
				}
				return value;
			}
		}
		try {
			return sessionStorage.getItem(KEY) || '';
		} catch (e) {
			return '';
		}
	}

	var adClick = rememberAdClick();

	if (adClick) {
		Array.prototype.forEach.call(document.querySelectorAll('form.contact-form input[name="gclid"]'), function (input) {
			if (!input.value) {
				input.value = adClick;
			}
		});
	}

	// Contact Form 7 dispatches its events from the form, and they bubble.
	document.addEventListener('wpcf7mailsent', function (event) {
		var form = event.target && event.target.closest ? event.target.closest('form') || event.target.querySelector('form') : null;
		var target = form && form.getAttribute('data-voa-thanks');
		if (target) {
			window.location.assign(target);
		}
	});
})();
