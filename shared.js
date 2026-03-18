/* shared.js — loaded on every page */
(function () {

  /* ---- Theme ---- */
  var STORAGE_KEY = 'agrv-theme';

  function getTheme() { return localStorage.getItem(STORAGE_KEY) || 'light'; }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    var sun  = btn.querySelector('.icon-sun');
    var moon = btn.querySelector('.icon-moon');
    if (sun)  sun.style.display  = theme === 'dark'  ? 'block' : 'none';
    if (moon) moon.style.display = theme === 'light' ? 'block' : 'none';
  }

  /* Apply stored theme immediately before paint */
  applyTheme(getTheme());

  document.addEventListener('DOMContentLoaded', function () {

    /* Theme toggle */
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      applyTheme(getTheme());
      themeBtn.addEventListener('click', function () {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    /* Nav hamburger */
    var navToggle = document.getElementById('navToggle');
    var navLinks  = document.getElementById('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
      });
    }

    /* Nav dropdowns */
    document.querySelectorAll('.nav-links > li.has-dropdown').forEach(function (li) {
      var trigger = li.querySelector(':scope > a');
      if (!trigger) return;

      /* Toggle on click */
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var isOpen = li.classList.contains('open');
        /* close all */
        document.querySelectorAll('.nav-links > li.has-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
        if (!isOpen) li.classList.add('open');
      });
    });

    /* Close dropdowns when clicking outside */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.nav-links > li.has-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });

    /* Close dropdowns on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-links > li.has-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });

    /* Footer year */
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    /* FAQ accordion */
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });

  });

})();
