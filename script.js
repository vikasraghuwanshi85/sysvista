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

  // Scrollspy: highlight the nav link for the section currently in view.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a'));
  var spySections = navLinks
    .map(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) return null;
      var el = document.getElementById(href.slice(1));
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (spySections.length) {
    var updateActive = function () {
      var pos = window.scrollY + 120; // offset for the sticky header
      var currentId = null;
      spySections.forEach(function (s) {
        if (s.el.offsetTop <= pos) currentId = s.el.id;
      });
      spySections.forEach(function (s) {
        var on = s.el.id === currentId;
        s.link.classList.toggle('active', on);
        if (on) {
          s.link.setAttribute('aria-current', 'true');
        } else {
          s.link.removeAttribute('aria-current');
        }
      });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
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
