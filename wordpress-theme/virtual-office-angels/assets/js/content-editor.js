/* Media Library picker for the fixed-layout content editor. */
(function () {
  document.addEventListener('click', function (event) {
    var choose = event.target.closest('.voa-choose-image');
    var reset = event.target.closest('.voa-reset-image');
    if (!choose && !reset) return;
    var field = event.target.closest('.voa-image-field');
    if (!field) return;
    var input = field.querySelector('input');
    var preview = field.querySelector('.voa-image-preview');
    if (reset) {
      input.value = field.dataset.default;
      preview.src = field.dataset.defaultUrl;
      return;
    }
    if (!window.wp || !wp.media) return;
    var picker = wp.media({ title: 'Choose page image', button: { text: 'Use this image' }, library: { type: 'image' }, multiple: false });
    picker.on('select', function () {
      var image = picker.state().get('selection').first();
      if (!image) return;
      var attachment = image.toJSON();
      input.value = attachment.id;
      preview.src = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;
    });
    picker.open();
  });
}());
