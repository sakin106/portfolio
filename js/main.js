/* =========================================
   MAIN.JS — GSAP Animations & Site Logic
   Portfolio: Sakin Bin Jabed
========================================= */

(function () {
  'use strict';

  // Wait for GSAP to be available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------
     1. SET INITIAL STATES (before animation)
  ---------------------------------------- */
  gsap.set('.word-reveal', { y: '110%', opacity: 0 });
  gsap.set('.reveal-item', { opacity: 0, y: 20 });
  gsap.set('.reveal-up',   { opacity: 0, y: 40 });
  gsap.set('.project-card', { opacity: 0, y: 30 });
  gsap.set('.service-card', { opacity: 0, y: 30 });

  /* ----------------------------------------
     2. HERO WORD REVEAL
  ---------------------------------------- */
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.word-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.12,
    }, 0.3);

    tl.to('.reveal-item', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
    }, 0.9);
  }

  /* ----------------------------------------
     3. SCROLL REVEAL — Generic
  ---------------------------------------- */
  function initScrollAnimations() {
    gsap.utils.toArray('.reveal-up').forEach(function (el) {
      var delay = el.dataset.delay ? parseFloat(el.dataset.delay) * 0.15 : 0;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  /* ----------------------------------------
     4. NAVBAR — Scroll Shrink + Active Link
  ---------------------------------------- */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 80,
      onEnter: function () { navbar.classList.add('scrolled'); },
      onLeaveBack: function () { navbar.classList.remove('scrolled'); },
    });

    var sections = document.querySelectorAll('section[id], footer[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function () {
        var current = '';
        sections.forEach(function (sec) {
          if (sec.getBoundingClientRect().top <= 120) {
            current = sec.id;
          }
        });
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
          }
        });
      },
    });
  }

  /* ----------------------------------------
     5. HAMBURGER MENU
  ---------------------------------------- */
  function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------
     6. PROJECT CARDS — Staggered Entrance
  ---------------------------------------- */
  function initProjectCards() {
    var cards = gsap.utils.toArray('.project-card');
    if (!cards.length) return;

    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 75%',
      onEnter: function () {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
        });
      },
    });
  }

  /* ----------------------------------------
     7. SERVICE CARDS — Staggered Entrance
  ---------------------------------------- */
  function initServiceCards() {
    var cards = gsap.utils.toArray('.service-card');
    if (!cards.length) return;

    ScrollTrigger.create({
      trigger: '#services',
      start: 'top 78%',
      onEnter: function () {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
      },
    });
  }

  /* ----------------------------------------
     8. CONTACT FORM
  ---------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    var submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.querySelector('#name').value.trim();
      var email   = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        gsap.to(form, { x: -8, duration: 0.07, repeat: 5, yoyo: true, ease: 'power2.inOut' });
        return;
      }

      var btnSpan = submitBtn.querySelector('span');
      btnSpan.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        form.reset();
        btnSpan.textContent = 'Send Message →';
        submitBtn.disabled = false;
        success.classList.add('visible');
        gsap.fromTo(success, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        setTimeout(function () {
          gsap.to(success, {
            opacity: 0,
            duration: 0.4,
            onComplete: function () { success.classList.remove('visible'); },
          });
        }, 5000);
      }, 900);
    });
  }

  /* ----------------------------------------
     9. SMOOTH ANCHOR SCROLL
  ---------------------------------------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var navbar = document.getElementById('navbar');
        var navH = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------
     10. PARALLAX HERO ORBS
  ---------------------------------------- */
  function initParallax() {
    gsap.to('.orb-1', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
    gsap.to('.orb-2', {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  /* ----------------------------------------
     INIT
  ---------------------------------------- */
  function init() {
    initHeroAnimations();
    initScrollAnimations();
    initNavbar();
    initHamburger();
    initProjectCards();
    initServiceCards();
    initContactForm();
    initSmoothAnchors();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
