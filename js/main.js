/* =========================================================
   SSC – Safework Solutions & Consultants | main.js
   =========================================================
   Covers:
   1. Hamburger / mobile menu toggle
   2. Sticky header shadow on scroll
   3. Scroll fade-in animations (IntersectionObserver)
   4. Contact form validation + success message
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------
     1. HAMBURGER MENU
  --------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ---------------------------------------------------
     2. STICKY HEADER SHADOW
  --------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(0,0,0,0.5)'
        : '0 2px 16px rgba(0,0,0,0.35)';
    });
  }

  /* ---------------------------------------------------
     3. SCROLL FADE-IN ANIMATIONS
  --------------------------------------------------- */
  const animatedEls = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right'
  );

  if ('IntersectionObserver' in window && animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------------------------------------------------
     4. CONTACT FORM VALIDATION
  --------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Helper: show/hide error
      function setError(fieldId, show) {
        const field = document.getElementById(fieldId);
        const errEl = document.getElementById(fieldId + 'Error');
        if (!field) return;
        if (show) {
          field.classList.add('error');
          if (errEl) errEl.classList.add('show');
        } else {
          field.classList.remove('error');
          if (errEl) errEl.classList.remove('show');
        }
      }

      // Name
      const name = document.getElementById('name');
      if (!name || name.value.trim().length < 2) {
        setError('name', true); valid = false;
      } else { setError('name', false); }

      // Phone
      const phone = document.getElementById('phone');
      const phoneRe = /^[\+0-9\s\-()]{7,20}$/;
      if (!phone || !phoneRe.test(phone.value.trim())) {
        setError('phone', true); valid = false;
      } else { setError('phone', false); }

      // Email (optional, but validate if provided)
      const email = document.getElementById('email');
      if (email && email.value.trim() !== '') {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email.value.trim())) {
          setError('email', true); valid = false;
        } else { setError('email', false); }
      } else { setError('email', false); }

      // Course
      const course = document.getElementById('course');
      if (!course || course.value === '') {
        setError('course', true); valid = false;
      } else { setError('course', false); }

      if (valid) {
        // -------------------------------------------------------
        // TO CONNECT A BACKEND:
        // Option A – Formspree:
        //   contactForm.action = "https://formspree.io/f/YOUR_FORM_ID";
        //   contactForm.method = "POST";
        //   Remove e.preventDefault() above and let form submit.
        //
        // Option B – EmailJS:
        //   emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', contactForm)
        //     .then(() => showSuccess());
        //
        // Option C – Custom backend:
        //   Use fetch() to POST JSON to your API endpoint.
        // -------------------------------------------------------

        // Show success for now (no backend)
        contactForm.style.display = 'none';
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) successMsg.classList.add('show');

        // Reset after 6 seconds for demo purposes
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (successMsg) successMsg.classList.remove('show');
        }, 6000);
      }
    });

    // Clear errors on input
    contactForm.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const errEl = document.getElementById(el.id + 'Error');
        if (errEl) errEl.classList.remove('show');
      });
    });
  }

});
