/**
 * Loads gtag.js only if window.AGRV_GA_MEASUREMENT_ID is set (from site-config.js).
 * site-config.js is generated from .env / GitHub Secrets — not committed.
 */
(function () {
  var id =
    typeof window !== 'undefined' && window.AGRV_GA_MEASUREMENT_ID
      ? String(window.AGRV_GA_MEASUREMENT_ID).trim()
      : '';
  if (!id || id === 'G-XXXXXXXXXX') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
})();
