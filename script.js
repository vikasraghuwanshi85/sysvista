/* SysVista Private Limited - site interactions */
(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu after clicking a link (mobile)
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Contact form: submit via fetch to FormSubmit's AJAX endpoint so the
  // user stays on the page and sees an inline confirmation message.
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check
      if (form.querySelector('[name="_honey"]').value) return;

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      note.textContent = '';
      note.className = 'form-note';

      var data = new FormData(form);

      // Use the AJAX endpoint of FormSubmit for a no-redirect experience.
      fetch('https://formsubmit.co/ajax/support@sysvista.tech', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          form.reset();
          note.textContent = "Thank you! Your message has been sent. We'll get back to you within one business day.";
          note.className = 'form-note success';
        })
        .catch(function () {
          note.textContent = 'Something went wrong. Please email us directly at support@sysvista.tech.';
          note.className = 'form-note error';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();
