/* ============================================================
   GSR Website — Interactions
   - Sticky nav scroll state
   - Mobile menu toggle
   - Scroll-reveal animations
   - Smooth in-page navigation for diagonal panels & nav links
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Sticky nav background on scroll */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Mobile menu toggle */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { observer.observe(el); });

  /* Diagonal panel hover fallback for browsers without :has() */
  var diagPanels = document.querySelector('.diag-panels');
  if (diagPanels) {
    var supportsHas = CSS.supports('selector(:has(*))');
    if (!supportsHas) {
      diagPanels.classList.add('js-active');
      diagPanels.querySelectorAll('.diag-panel').forEach(function (panel) {
        panel.addEventListener('mouseenter', function () {
          panel.classList.add('js-hover');
        });
        panel.addEventListener('mouseleave', function () {
          panel.classList.remove('js-hover');
        });
      });
    }
  }


  /* Scroll progress bar */
  var progressBar = document.getElementById('scrollProgress');

  /* Parallax ambient shapes */
  var parallaxShapes = document.querySelectorAll('.ambient-shape');

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) { progressBar.style.width = pct + '%'; }

        parallaxShapes.forEach(function (shape) {
          var speed = parseFloat(shape.getAttribute('data-speed')) || 0.2;
          var rect = shape.parentElement.getBoundingClientRect();
          var offset = (window.innerHeight - rect.top) * speed;
          shape.style.transform = 'translateY(' + (offset * 0.15) + 'px) rotate(' + (offset * 0.05) + 'deg)';
        });

        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
