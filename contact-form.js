/**
 * Contact form → email via Web3Forms (https://web3forms.com)
 *
 * Key: window.AGRV_WEB3FORMS_KEY from site-config.js (.env → node scripts/write-site-config.js)
 *      or GitHub Actions secrets (see readme + .github/workflows/deploy-pages.yml).
 *
 * Emails → agrvsolutions@gmail.com with subject: 53583a <Area of Interest>
 */
(function () {
  function getAccessKey() {
    if (typeof window !== 'undefined' && window.AGRV_WEB3FORMS_KEY) {
      return String(window.AGRV_WEB3FORMS_KEY).trim();
    }
    return '';
  }

  /**
   * Client-side checks only — we cannot confirm a mailbox exists without a server
   * or paid API. This blocks bad format, obvious fakes, and common disposable domains.
   */
  function validateEmail(email) {
    email = (email || '').trim().toLowerCase();
    if (!email) {
      return { ok: false, message: 'Please enter your email address.' };
    }

    var basic =
      /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
    if (!basic.test(email)) {
      return { ok: false, message: 'Please enter a valid email address (e.g. name@company.com).' };
    }

    var parts = email.split('@');
    var local = parts[0];
    var domain = parts[1] || '';
    if (local.includes('..') || local.startsWith('.') || local.endsWith('.')) {
      return { ok: false, message: 'That email address looks invalid.' };
    }

    var tld = domain.split('.').pop() || '';
    if (tld.length < 2) {
      return { ok: false, message: 'Please enter a complete email address with a valid domain.' };
    }

    if (/^(test|fake|asdf|none|noone|nobody|null|void)\d*@/i.test(email)) {
      return { ok: false, message: 'Please use a real email address we can reply to.' };
    }

    var disposable = [
      'mailinator.com',
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'yopmail.com',
      'throwaway.email',
      'trashmail.com',
      'fakeinbox.com',
      'getnada.com',
      'dispostable.com',
      'maildrop.cc',
      'sharklasers.com',
      'grr.la',
      'trbvm.com',
      'temp-mail.org',
      'burnermail.io',
      'mailnesia.com',
      'mailcatch.com',
      'emailondeck.com'
    ];
    for (var i = 0; i < disposable.length; i++) {
      var b = disposable[i];
      if (domain === b || domain.endsWith('.' + b)) {
        return {
          ok: false,
          message:
            'Please use a permanent work or personal email address, not a temporary or disposable inbox.'
        };
      }
    }

    return { ok: true };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var statusEl = document.getElementById('contactFormStatus');
    var submitBtn = form.querySelector('button[type="submit"]');
    var emailInput = form.querySelector('[name="email"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var key = getAccessKey();
      if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.className = 'contact-form-status contact-form-status--error';
          statusEl.textContent =
            'Form is not configured: run `node scripts/write-site-config.js` after setting WEB3FORMS_ACCESS_KEY in `.env`, or add the WEB3FORMS_ACCESS_KEY secret for GitHub Actions. See readme.md.';
        }
        return;
      }

      var fname = (form.querySelector('[name="first_name"]') || {}).value || '';
      var lname = (form.querySelector('[name="last_name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var org = (form.querySelector('[name="organization"]') || {}).value || '';
      var subjectSelect = form.querySelector('[name="subject"]');
      var message = (form.querySelector('[name="message"]') || {}).value || '';

      var emailCheck = validateEmail(email);
      if (!emailCheck.ok) {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.className = 'contact-form-status contact-form-status--error';
          statusEl.textContent = emailCheck.message;
        }
        if (emailInput) emailInput.focus();
        return;
      }

      var areaText = '';
      if (subjectSelect && subjectSelect.selectedIndex >= 0) {
        var opt = subjectSelect.options[subjectSelect.selectedIndex];
        areaText = opt && opt.value ? opt.text || opt.value : '';
      }

      var emailSubject = '53583a ' + (areaText || subjectSelect.value || 'Contact form');

      if (statusEl) {
        statusEl.hidden = false;
        statusEl.className = 'contact-form-status contact-form-status--pending';
        statusEl.textContent = 'Sending…';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var payload = {
        access_key: key,
        subject: emailSubject,
        from_name: (fname + ' ' + lname).trim() || 'Website contact',
        name: (fname + ' ' + lname).trim(),
        email: email.trim(),
        message: message,
        replyto: email.trim(),
        Organization: org || '(not provided)',
        'Area of interest': areaText || subjectSelect.value
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          var data = result.data;
          var msg =
            (data && data.message) ||
            (data && data.body && data.body.message) ||
            '';
          if (result.ok && data && data.success) {
            if (statusEl) {
              statusEl.className = 'contact-form-status contact-form-status--success';
              statusEl.textContent =
                'Thank you — your message was sent. We typically reply within 1–2 business days.';
            }
            form.reset();
          } else {
            throw new Error(msg || 'Send failed');
          }
        })
        .catch(function (err) {
          if (statusEl) {
            statusEl.className = 'contact-form-status contact-form-status--error';
            var detail = err && err.message ? err.message : '';
            statusEl.textContent =
              detail
                ? 'Could not send: ' + detail + ' If this mentions domain or CORS, add your site in the Web3Forms dashboard.'
                : 'Something went wrong. Please try again or email us directly at agrvsolutions@gmail.com';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        });
    });
  });
})();
