/**
 * ==========================================================================
 * FINORA - Comprehensive Form Validation & FormSubmit Engine
 * File: assets/js/validation.js
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- Regex Rules ---
  // Name: letters, spaces, hyphens, and apostrophes only (min 2 chars)
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;

  // Email: RFC-compliant email structure
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  // Known typos for popular email providers (e.g. gmail, yahoo, hotmail, outlook)
  const commonDomainTypos = {
    // Gmail misspellings
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmaild.com': 'gmail.com',
    'gmaul.com': 'gmail.com',
    'gmeil.com': 'gmail.com',
    'gimail.com': 'gmail.com',
    'gmai.co': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmail.cm': 'gmail.com',
    'gmail.cpm': 'gmail.com',
    'gmail.con': 'gmail.com',
    'gmail.om': 'gmail.com',
    'gmail.comm': 'gmail.com',
    'gmail.coom': 'gmail.com',
    'gmail.xom': 'gmail.com',
    'gmaili.com': 'gmail.com',
    'gemail.com': 'gmail.com',
    // Yahoo misspellings
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yahu.com': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'yahoo.con': 'yahoo.com',
    // Hotmail & Outlook misspellings
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'hotmali.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com'
  };

  function validateEmailDomain(emailStr) {
    if (!emailStr || !emailStr.includes('@')) {
      return { isValid: false, error: 'Please enter a valid email address.' };
    }

    const parts = emailStr.split('@');
    if (parts.length !== 2) {
      return { isValid: false, error: 'Please enter a valid email address.' };
    }

    const username = parts[0].trim();
    const domain = parts[1].trim().toLowerCase();

    if (!username || !domain) {
      return { isValid: false, error: 'Please enter a valid email address.' };
    }

    // Check basic email structure
    if (!emailRegex.test(emailStr)) {
      return { isValid: false, error: 'Invalid email ID. Please check the format.' };
    }

    // Check if domain has valid period separation and TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return { isValid: false, error: 'Invalid email domain. Missing top-level domain (e.g., .com).' };
    }

    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return { isValid: false, error: 'Invalid email domain extension.' };
    }

    // Check for common typo domains
    if (commonDomainTypos[domain]) {
      const correct = commonDomainTypos[domain];
      return { isValid: false, error: `Invalid email ID: Did you mean @${correct}?` };
    }

    // Additional check: starts or ends with invalid chars
    if (domain.startsWith('.') || domain.endsWith('.') || domain.startsWith('-') || domain.endsWith('-')) {
      return { isValid: false, error: 'Invalid email domain name.' };
    }

    // Check for gmail-like typos that contain 'gmai' or 'gmil' or 'gaml' with .com
    if (domain !== 'gmail.com' && /^(g+m+[a-z]*i*l*|g+a+m+i+l+)\.(com|co|cm|con|net|org)$/i.test(domain)) {
      if (domain.includes('gma') || domain.includes('gmi') || domain.includes('gml')) {
        return { isValid: false, error: 'Invalid email ID: Incorrect spelling for Gmail (@gmail.com).' };
      }
    }

    return { isValid: true, error: '' };
  }

  // Phone: standard international/domestic phone characters (min 7 digits)
  const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\s.-]{6,15}$/;

  // --- Dynamic Absolute Next URL Configuration for FormSubmit ---
  // FormSubmit requires absolute URL for _next redirect when running on a web server
  const nextUrlInput = document.getElementById('formsubmit-next-url');
  if (nextUrlInput && window.location.protocol.startsWith('http')) {
    try {
      const thankYouUrl = new URL('thank-you.html', window.location.href).href;
      nextUrlInput.value = thankYouUrl;
    } catch (e) {
      // fallback to relative if URL constructor fails
      nextUrlInput.value = 'thank-you.html';
    }
  }

  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMsg = '';
    const isRequired = input.hasAttribute('required');

    // 1. Checkbox Validation (Consent, Terms)
    if (input.type === 'checkbox') {
      if (isRequired && !input.checked) {
        isValid = false;
        errorMsg = 'This field is required.';
      }
    }

    // 2. Select Dropdowns (Service, Revenue Range)
    else if (input.tagName === 'SELECT') {
      if (isRequired && (!value || value === '')) {
        isValid = false;
        errorMsg = 'This field is required.';
      }
    }

    // 3. Name Field: letters and spaces only
    else if (
      input.id === 'contact-name' || 
      input.id === 'reg-name' || 
      input.id === 'register-name' || 
      input.name === 'Full Name' || 
      input.name === 'Name'
    ) {
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (value && !nameRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid name (letters and spaces only).';
      }
    }

    // 4. Email Field: standard valid email with domain & provider typo verification
    else if (
      input.type === 'email' || 
      input.name === 'Email' || 
      input.id.includes('email')
    ) {
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (value) {
        const emailCheck = validateEmailDomain(value);
        if (!emailCheck.isValid) {
          isValid = false;
          errorMsg = emailCheck.error;
        }
      }
    }

    // 5. Phone Field: valid phone number
    else if (
      input.type === 'tel' || 
      input.name === 'Phone' || 
      input.id.includes('phone')
    ) {
      const digitCount = (value.match(/\d/g) || []).length;
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (value && (!phoneRegex.test(value) || digitCount < 7)) {
        isValid = false;
        errorMsg = 'Please enter a valid phone number.';
      }
    }

    // 6. Company Name: allow normal company characters (letters, numbers, spaces, &, ., , -) but reject numbers-only
    else if (
      input.id === 'contact-company' || 
      input.id === 'reg-company' || 
      input.name === 'Company Name'
    ) {
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (value) {
        const hasLetters = /[A-Za-zÀ-ÿ]/.test(value);
        if (!hasLetters || value.length < 2) {
          isValid = false;
          errorMsg = 'Please enter a valid company name.';
        }
      }
    }

    // 7. Password Field: minimum 6 characters
    else if (input.id === 'register-password' || input.id === 'login-password') {
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (value && value.length < 6) {
        isValid = false;
        errorMsg = 'Password must be at least 6 characters.';
      }
    }

    // 8. Confirm Password Matching
    else if (input.id === 'confirm-password') {
      const pwd = document.getElementById('register-password');
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (pwd && value !== pwd.value) {
        isValid = false;
        errorMsg = 'Passwords do not match.';
      }
    }

    // 9. Message Field: allow letters, numbers, financial symbols ($ € £), punctuation, spaces; min 5 chars
    else if (
      input.tagName === 'TEXTAREA' || 
      input.name === 'Message' || 
      input.id === 'contact-message'
    ) {
      if (isRequired && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (isRequired && value.length < 5) {
        isValid = false;
        errorMsg = 'Please provide a brief message (at least 5 characters).';
      }
    }

    // 10. Generic required input check
    else if (isRequired && !value) {
      isValid = false;
      errorMsg = 'This field is required.';
    }

    // --- DOM Feedback UI Update ---
    const parent = input.closest('.form-group') || input.parentElement;
    let feedback = parent.querySelector('.form-feedback');

    if (!feedback) {
      feedback = document.createElement('span');
      feedback.className = 'form-feedback';
      parent.appendChild(feedback);
    }

    if (!isValid) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      feedback.className = 'form-feedback invalid';
      feedback.textContent = errorMsg;
    } else {
      input.classList.remove('is-invalid');
      if (value) input.classList.add('is-valid');
      feedback.className = 'form-feedback valid';
      feedback.textContent = '';
    }

    return isValid;
  }

  // --- Helper to bind validation events to a form ---
  function initFormValidation(form) {
    form.setAttribute('novalidate', 'true');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', () => validateInput(input));

      // Remove error immediately upon correction
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateInput(input);
        }
      });
      input.addEventListener('change', () => {
        if (input.classList.contains('is-invalid')) {
          validateInput(input);
        }
      });
    });
  }

  // Helper to validate all inputs in a form
  function validateAllInputs(form) {
    let formValid = true;
    let firstInvalidInput = null;
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (input.type === 'hidden' || input.name === '_honey' || input.type === 'submit' || input.type === 'button') return;

      const isInputValid = validateInput(input);
      if (!isInputValid) {
        formValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
      }
    });

    if (!formValid && firstInvalidInput) {
      firstInvalidInput.focus();
    }
    return formValid;
  }

  // --- Helper to dynamically set absolute _next URL for all FormSubmit forms ---
  function updateFormSubmitNextUrls() {
    if (window.location.protocol.startsWith('http')) {
      try {
        const thankYouUrl = new URL('thank-you.html', window.location.href).href;
        document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
          let nextInput = form.querySelector('input[name="_next"]');
          if (!nextInput) {
            nextInput = document.createElement('input');
            nextInput.type = 'hidden';
            nextInput.name = '_next';
            form.appendChild(nextInput);
          }
          nextInput.value = thankYouUrl;
        });
      } catch (e) {
        // Fallback
      }
    }
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFormSubmitNextUrls);
  } else {
    updateFormSubmitNextUrls();
  }

  // --- 1. General Contact & Landing Page Forms (FormSubmit backend) ---
  document.querySelectorAll('form[data-validate="true"]').forEach(form => {
    if (form.id === 'newsletter-form' || form.classList.contains('newsletter-form')) return;
    initFormValidation(form);

    form.addEventListener('submit', function (e) {
      // 1. Validate all fields
      const isFormValid = validateAllInputs(form);
      if (!isFormValid) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // 2. If running locally on file:// protocol, inform the developer/user
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        alert('FormSubmit Notice: When running locally via file://, FormSubmit cannot receive external HTTP POST callbacks. To test live submission and automatic redirect to thank-you.html, please open this site via localhost or a live web server (e.g. VS Code Live Server).');
        return false;
      }

      // 3. Ensure _next contains absolute URL before sending
      if (window.location.protocol.startsWith('http')) {
        let nextInput = form.querySelector('input[name="_next"]');
        if (!nextInput) {
          nextInput = document.createElement('input');
          nextInput.type = 'hidden';
          nextInput.name = '_next';
          form.appendChild(nextInput);
        }
        try {
          nextInput.value = new URL('thank-you.html', window.location.href).href;
        } catch (err) {
          nextInput.value = window.location.origin + '/thank-you.html';
        }
      }

      // 4. Change button state to indicate submission
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite; margin-right: 0.5rem;"><i class="bi bi-arrow-repeat"></i></span> Submitting Request...';
      }

      return true;
    });
  });

  // --- 2. Registration Page Frontend Demo Handling (register.html) ---
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    initFormValidation(signupForm);

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAllInputs(signupForm)) {
        return false;
      }

      const nameInput = document.getElementById('register-name');
      const emailInput = document.getElementById('register-email');
      const passwordInput = document.getElementById('register-password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      const termsCheckbox = document.getElementById('register-terms');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

      if (confirmPasswordInput && password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match. Please verify.');
        confirmPasswordInput.focus();
        return false;
      }

      if (termsCheckbox && !termsCheckbox.checked) {
        alert('Please agree to the Terms of Service and Privacy Policy to continue.');
        termsCheckbox.focus();
        return false;
      }

      // Retrieve existing registered users list or initialize empty array
      let registeredUsers = [];
      try {
        const storedUsers = localStorage.getItem('finora_registered_users');
        if (storedUsers) {
          registeredUsers = JSON.parse(storedUsers);
        }
      } catch (err) {
        registeredUsers = [];
      }

      // Check if email already registered; if so update, otherwise add new user
      const existingUserIdx = registeredUsers.findIndex(u => u.email.toLowerCase() === email);
      const userData = {
        name: name,
        email: email,
        password: password,
        registeredAt: new Date().toISOString()
      };

      if (existingUserIdx >= 0) {
        registeredUsers[existingUserIdx] = userData;
      } else {
        registeredUsers.push(userData);
      }

      try {
        localStorage.setItem('finora_registered_users', JSON.stringify(registeredUsers));
      } catch (err) {
        console.error('Error saving to localStorage', err);
      }

      // UI state and redirect
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite; margin-right: 0.5rem;"><i class="bi bi-arrow-repeat"></i></span> Creating Account...';
      }

      setTimeout(() => {
        window.location.href = 'login.html?registered=true&email=' + encodeURIComponent(email);
      }, 700);
    });
  }

  // --- 3. Login Page Frontend Demo Handling (login.html) ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    initFormValidation(loginForm);

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const loginSuccessAlert = document.getElementById('login-success-alert');
    const loginErrorAlert = document.getElementById('login-error-alert');
    const loginErrorMessage = document.getElementById('login-error-message');

    // Check if redirected from registration (prefill email without showing success popup)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      const prefillEmail = urlParams.get('email');
      if (prefillEmail && emailInput) {
        emailInput.value = prefillEmail;
        if (passwordInput) passwordInput.focus();
      }
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset previous alert states
      if (loginSuccessAlert) loginSuccessAlert.style.display = 'none';
      if (loginErrorAlert) loginErrorAlert.style.display = 'none';

      if (!validateAllInputs(loginForm)) {
        return false;
      }

      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const password = passwordInput ? passwordInput.value : '';

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite; margin-right: 0.5rem;"><i class="bi bi-arrow-repeat"></i></span> Authenticating...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Sign In';
        }

        // Fetch registered users from localStorage
        let registeredUsers = [];
        try {
          const storedUsers = localStorage.getItem('finora_registered_users');
          if (storedUsers) {
            registeredUsers = JSON.parse(storedUsers);
          }
        } catch (err) {
          registeredUsers = [];
        }

        // Find user by email
        const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email);

        // Check demo fallback credentials or registered users
        const isDemoAdmin = email === 'admin@finora.io' || email === 'alexander@finora.io';
        const isDemoClient = email === 'demo@finora.io' || email === 'client@finora.io' || email === 'founder@yourcompany.com';

        if (!matchedUser && !isDemoAdmin && !isDemoClient && registeredUsers.length > 0) {
          // 1. User has not signed up
          if (loginErrorAlert && loginErrorMessage) {
            loginErrorMessage.textContent = 'Account not found. Please sign up first, or use demo account: demo@finora.io';
            loginErrorAlert.style.display = 'block';
            loginErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          if (emailInput) {
            emailInput.classList.add('is-invalid');
            emailInput.focus();
          }
          return;
        }

        // 2. User found, verify password if registered user
        if (matchedUser && matchedUser.password !== password) {
          if (loginErrorAlert && loginErrorMessage) {
            loginErrorMessage.textContent = 'Invalid email or password.';
            loginErrorAlert.style.display = 'block';
            loginErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          if (passwordInput) {
            passwordInput.classList.add('is-invalid');
            passwordInput.focus();
          }
          return;
        }

        // 3. Successful authentication: display success message and keep user on login.html
        if (loginErrorAlert) {
          loginErrorAlert.style.display = 'none';
        }
        if (loginSuccessAlert) {
          loginSuccessAlert.style.display = 'block';
          loginSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (emailInput) emailInput.classList.remove('is-invalid');
        if (passwordInput) passwordInput.classList.remove('is-invalid');
      }, 500);
    });

    // SSO Single Sign-On Flow Handlers (Google & Apple)
    function triggerSSOAuth(provider, btnElement) {
      if (!btnElement || btnElement.disabled) return;

      // Reset alert states
      if (loginSuccessAlert) loginSuccessAlert.style.display = 'none';
      if (loginErrorAlert) loginErrorAlert.style.display = 'none';

      const originalHtml = btnElement.innerHTML;
      btnElement.disabled = true;
      btnElement.style.opacity = '0.75';
      btnElement.innerHTML = `<span style="display:inline-block; animation: spin 1s linear infinite; margin-right: 0.5rem;"><i class="bi bi-arrow-repeat"></i></span> Connecting to ${provider}...`;

      setTimeout(() => {
        btnElement.disabled = false;
        btnElement.style.opacity = '';
        btnElement.innerHTML = originalHtml;

        // Display login success notification for SSO session
        if (loginSuccessAlert) {
          const successTitle = loginSuccessAlert.querySelector('h4');
          const successDesc = loginSuccessAlert.querySelector('p');
          if (successTitle) successTitle.textContent = `Signed in with ${provider}!`;
          if (successDesc) successDesc.textContent = `Welcome back! You are securely authenticated via your ${provider} account.`;
          loginSuccessAlert.style.display = 'block';
          loginSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (emailInput) {
          emailInput.value = provider.toLowerCase() === 'google' ? 'alex.user@gmail.com' : 'alex.user@icloud.com';
          emailInput.classList.remove('is-invalid');
        }
        if (passwordInput) {
          passwordInput.value = '••••••••••••';
          passwordInput.classList.remove('is-invalid');
        }
      }, 700);
    }

    const googleSSOBtn = document.getElementById('google-sso-btn');
    if (googleSSOBtn) {
      googleSSOBtn.addEventListener('click', () => triggerSSOAuth('Google', googleSSOBtn));
    }

    const appleSSOBtn = document.getElementById('apple-sso-btn');
    if (appleSSOBtn) {
      appleSSOBtn.addEventListener('click', () => triggerSSOAuth('Apple', appleSSOBtn));
    }

    // Forgot Password link interaction
    const forgotPwdLink = document.getElementById('forgot-password-link');
    if (forgotPwdLink) {
      forgotPwdLink.addEventListener('click', (e) => {
        e.preventDefault();
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailCheck = validateEmailDomain(emailVal);
        if (emailVal && emailCheck.isValid) {
          alert('Password Reset Link Sent!\n\nA password reset email has been sent to ' + emailVal + ' (frontend demo).');
        } else {
          alert('Forgot Password:\n\n' + (emailCheck.error || 'Please enter a valid registered business email address in the email field above to receive a password reset link.'));
          if (emailInput) {
            emailInput.classList.add('is-invalid');
            emailInput.focus();
          }
        }
      });
    }
  }

  // --- Password Strength Meter (for Registration) ---
  const pwdInput = document.getElementById('register-password');
  const strengthMeter = document.getElementById('password-strength-bar');
  const strengthLabel = document.getElementById('password-strength-text');

  if (pwdInput && strengthMeter && strengthLabel) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      let score = 0;

      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (val.length === 0) {
        strengthMeter.style.width = '0%';
        strengthMeter.style.backgroundColor = 'transparent';
        strengthLabel.textContent = '';
      } else if (score <= 1) {
        strengthMeter.style.width = '25%';
        strengthMeter.style.backgroundColor = '#ef4444';
        strengthLabel.textContent = 'Weak (Needs numbers & symbols)';
        strengthLabel.style.color = '#ef4444';
      } else if (score === 2 || score === 3) {
        strengthMeter.style.width = '65%';
        strengthMeter.style.backgroundColor = '#f59e0b';
        strengthLabel.textContent = 'Moderate';
        strengthLabel.style.color = '#f59e0b';
      } else {
        strengthMeter.style.width = '100%';
        strengthMeter.style.backgroundColor = '#0284c7';
        strengthLabel.textContent = 'Strong Password';
        strengthLabel.style.color = '#0284c7';
      }
    });
  }

  // --- 4. Financial Intelligence Newsletter Subscription Popup ---
  function showNewsletterSuccessModal(email) {
    let backdrop = document.getElementById('newsletter-success-modal');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'newsletter-success-modal';
      backdrop.className = 'finora-modal-backdrop';
      backdrop.setAttribute('role', 'dialog');
      backdrop.setAttribute('aria-modal', 'true');
      backdrop.setAttribute('aria-labelledby', 'newsletter-modal-title');

      backdrop.innerHTML = `
        <div class="finora-modal-dialog" style="max-width: 480px; text-align: center;">
          <div class="finora-modal-header" style="border-bottom: none; padding-bottom: 0.5rem; justify-content: flex-end;">
            <button type="button" class="finora-modal-close" aria-label="Close modal" id="newsletter-modal-close-x">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="finora-modal-body" style="padding: 0 2rem 1.75rem 2rem;">
            <div style="width: 4rem; height: 4rem; margin: 0 auto 1.25rem; border-radius: 50%; background: var(--accent-soft); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: var(--shadow-glow);">
              <i class="bi bi-check2-circle"></i>
            </div>
            <h3 id="newsletter-modal-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Successfully Subscribed!</h3>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.5rem;">
              Thank you for subscribing to Finora Financial Intelligence. You'll receive our latest financial insights and CFO tips.
            </p>
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-main); display: flex; align-items: center; justify-content: center; gap: 0.5rem; word-break: break-all;">
              <i class="bi bi-envelope-check text-accent" style="font-size: 1.1rem; flex-shrink: 0;"></i>
              <span id="newsletter-modal-email-text"></span>
            </div>
            <button type="button" id="newsletter-modal-confirm-btn" class="btn btn-accent" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem;">
              <i class="bi bi-check2"></i> Great, Thanks!
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(backdrop);

      // Close handlers
      const closeModal = () => {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      };

      const closeX = backdrop.querySelector('#newsletter-modal-close-x');
      const confirmBtn = backdrop.querySelector('#newsletter-modal-confirm-btn');

      if (closeX) closeX.addEventListener('click', closeModal);
      if (confirmBtn) confirmBtn.addEventListener('click', closeModal);

      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
          closeModal();
        }
      });
    }

    const emailDisplay = backdrop.querySelector('#newsletter-modal-email-text');
    if (emailDisplay) {
      emailDisplay.textContent = email;
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Initialize all newsletter forms across the website
  function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('#newsletter-form, .newsletter-form, form[action*="formsubmit.co/advisory@finora.io"]');

    newsletterForms.forEach(form => {
      // If it's a contact form, skip
      if (form.id === 'contact-form' || form.querySelector('textarea') || form.querySelector('input[name="Company Name"]')) {
        return;
      }

      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      // Realtime validation
      emailInput.addEventListener('blur', () => validateInput(emailInput));
      emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
          validateInput(emailInput);
        }
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const rawVal = emailInput.value.trim();

        // 1. Validate empty
        if (!rawVal) {
          validateInput(emailInput);
          emailInput.focus();
          return false;
        }

        // 2. Validate format, domain, and typos using Finora's email verification engine
        const emailCheck = validateEmailDomain(rawVal);
        if (!emailCheck.isValid) {
          emailInput.classList.add('is-invalid');
          emailInput.classList.remove('is-valid');
          const parent = emailInput.closest('.form-group') || emailInput.parentElement;
          let feedback = parent.querySelector('.form-feedback');
          if (!feedback) {
            feedback = document.createElement('span');
            feedback.className = 'form-feedback';
            parent.appendChild(feedback);
          }
          feedback.className = 'form-feedback invalid';
          feedback.textContent = emailCheck.error;
          emailInput.focus();
          return false;
        }

        // 3. Clear any errors
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        const parent = emailInput.closest('.form-group') || emailInput.parentElement;
        const feedback = parent.querySelector('.form-feedback');
        if (feedback) {
          feedback.className = 'form-feedback valid';
          feedback.textContent = '';
        }

        // 4. Save subscriber in localStorage (demo persistence)
        try {
          const subscribers = JSON.parse(localStorage.getItem('finora_newsletter_subscribers') || '[]');
          if (!subscribers.includes(rawVal.toLowerCase())) {
            subscribers.push(rawVal.toLowerCase());
            localStorage.setItem('finora_newsletter_subscribers', JSON.stringify(subscribers));
          }
        } catch (err) {
          // localStorage fallback
        }

        // 5. Show stylish success popup
        showNewsletterSuccessModal(rawVal);

        // 6. Clear input field after successful subscription
        emailInput.value = '';
        emailInput.classList.remove('is-valid');
        if (feedback) feedback.textContent = '';

        return false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterForms);
  } else {
    initNewsletterForms();
  }

})();
