/* =========================================
   CURSOR.JS — Custom Cursor & Magnetic Buttons
   Portfolio: Sakin Bin Jabed
========================================= */

(function () {
  'use strict';

  var outer = document.getElementById('cursor-outer');
  var dot   = document.getElementById('cursor-dot');

  if (!outer || !dot) return;

  // Hide on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    outer.style.display = 'none';
    dot.style.display   = 'none';
    document.body.style.cursor = 'auto';
    // Restore cursor on all buttons/links for touch
    document.querySelectorAll('button, a').forEach(function (el) {
      el.style.cursor = 'pointer';
    });
    return;
  }

  // Track mouse
  document.addEventListener('mousemove', function (e) {
    gsap.to(dot,   { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power3.out' });
    gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' });
  });

  document.addEventListener('mouseleave', function () {
    gsap.to([outer, dot], { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseenter', function () {
    gsap.to([outer, dot], { opacity: 1, duration: 0.3 });
  });

  // Hover expand on interactive elements
  var hoverTargets = document.querySelectorAll('a, button, .btn, .service-card, .project-card, .skill-pill, input, textarea, .floating-card, .proof-card');

  hoverTargets.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      document.body.classList.add('cursor-hover');
      gsap.to(dot, { scale: 0.4, duration: 0.25 });
    });
    el.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-hover');
      gsap.to(dot, { scale: 1, duration: 0.25 });
    });
  });

  // Magnetic Buttons
  document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var dX = (e.clientX - rect.left - rect.width  / 2) * 0.35;
      var dY = (e.clientY - rect.top  - rect.height / 2) * 0.35;
      gsap.to(btn, { x: dX, y: dY, duration: 0.4, ease: 'power3.out' });
      var inner = btn.querySelector('span');
      if (inner) {
        gsap.to(inner, { x: dX * 0.4, y: dY * 0.4, duration: 0.4, ease: 'power3.out' });
      }
    });

    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      var inner = btn.querySelector('span');
      if (inner) {
        gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      }
    });
  });

})();
