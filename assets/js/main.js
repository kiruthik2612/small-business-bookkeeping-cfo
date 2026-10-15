/**
 * ==========================================================================
 * FINORA - Core JavaScript Architecture
 * File: assets/js/main.js
 * Author: Theme Specialist
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- 1. Theme Manager (Dark / Light Mode with Persistence) ---
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('finora_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('finora_theme', theme);
    themeToggleButtons.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="bi bi-sun-fill" title="Switch to Light Mode"></i>' 
        : '<i class="bi bi-moon-stars-fill" title="Switch to Dark Mode"></i>';
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    });
  }

  applyTheme(storedTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme);
    });
  });

  // --- 2. RTL Layout Manager (Persistence & Dynamic Switch) ---
  const rtlToggleButtons = document.querySelectorAll('.rtl-toggle-btn');
  const storedDirection = localStorage.getItem('finora_direction') || 'ltr';

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('finora_direction', dir);
    rtlToggleButtons.forEach(btn => {
      btn.innerHTML = dir === 'rtl' 
        ? '<span style="font-weight:700; font-size: 0.8rem;">LTR</span>' 
        : '<span style="font-weight:700; font-size: 0.8rem;">RTL</span>';
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'Left to Right' : 'Right to Left'}`);
    });
  }

  applyDirection(storedDirection);

  rtlToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const targetDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(targetDir);
    });
  });

  // --- 3. Sticky Header with Scroll Detection ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- 4. Mobile Drawer Navigation Controller ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  // Mobile submenu accordion toggle
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('open');
        const icon = toggle.querySelector('.bi-chevron-down');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'none';
        }
      }
    });
  });

  // --- 5. FAQ Accordion Component ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  // Initialize pre-opened accordions on page load
  document.querySelectorAll('.faq-item.active').forEach(activeItem => {
    const body = activeItem.querySelector('.faq-body');
    const header = activeItem.querySelector('.faq-header');
    if (body) {
      body.style.maxHeight = `${body.scrollHeight + 30}px`;
    }
    if (header) {
      header.setAttribute('aria-expanded', 'true');
    }
  });

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other open accordions
      document.querySelectorAll('.faq-item.active').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.faq-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          const body = other.querySelector('.faq-body');
          if (body) body.style.maxHeight = null;
        }
      });

      // Toggle current accordion
      item.classList.toggle('active', !isActive);
      header.setAttribute('aria-expanded', String(!isActive));
      const body = item.querySelector('.faq-body');
      if (body) {
        body.style.maxHeight = !isActive ? `${body.scrollHeight + 30}px` : null;
      }
    });
  });

  // --- 6. Number Counter Animation with IntersectionObserver ---
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target')) || 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.floor(easeProgress * target);

            el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // --- 7. Pricing Monthly/Annual Toggle Switcher ---
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      document.querySelectorAll('.price-amount').forEach(el => {
        const monthly = el.getAttribute('data-monthly');
        const annual = el.getAttribute('data-annual');
        el.textContent = isAnnual ? annual : monthly;
      });
      document.querySelectorAll('.billing-period-text').forEach(el => {
        el.textContent = isAnnual ? '/year (billed annually)' : '/month';
      });
      document.querySelectorAll('.annual-discount-badge').forEach(badge => {
        badge.style.display = isAnnual ? 'inline-flex' : 'none';
      });
    });
  }

  // --- 9. Universal Card & Linked Box Click Delegation ---
  document.addEventListener('click', (e) => {
    // If user clicked directly on an interactive element (link, button, form element), let it work normally
    if (e.target.closest('a, button, input, textarea, select, label')) {
      return;
    }

    const card = e.target.closest('[data-card-href], .card, .blog-card-premium, .service-card, .clickable-card');
    if (!card) return;

    // 1. Check explicit data-card-href attribute
    let targetHref = card.getAttribute('data-card-href');

    // 2. Look for prominent detail or article links inside the card
    if (!targetHref) {
      const detailLink = card.querySelector('a[href*="service-details.html"], a[href*="blog-details.html"], a.blog-title-link, a.blog-read-btn, a[href*="contact.html?plan="]');
      if (detailLink) {
        targetHref = detailLink.getAttribute('href');
      }
    }

    // 3. Fallback: primary action button
    if (!targetHref) {
      const actionBtn = card.querySelector('.btn[href]');
      if (actionBtn) {
        targetHref = actionBtn.getAttribute('href');
      }
    }

    if (targetHref && targetHref !== '#' && !targetHref.startsWith('javascript:')) {
      window.location.href = targetHref;
    }
  });

  // Keyboard navigation support (Enter key on focused card)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('[data-card-href], .clickable-card');
      if (card && e.target === card) {
        const href = card.getAttribute('data-card-href') || card.querySelector('a[href]')?.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          window.location.href = href;
        }
      }
    }
  });

})();
