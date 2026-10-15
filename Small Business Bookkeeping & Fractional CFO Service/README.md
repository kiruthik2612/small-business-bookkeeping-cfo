# Finora — Small Business Bookkeeping & Fractional CFO HTML5 Template

**Finora** is a commercial-grade, multi-page HTML5/CSS3/Vanilla JS website template architected for bookkeeping firms, fractional CFO practices, CPAs, accounting companies, and small business financial consulting services.

Designed to marketplace standards (ThemeForest, TemplateMonster, Creative Market), this template provides high-conversion design aesthetics, accessible navigation, full dark/light theme switcher, RTL layout support, Chart.js financial dashboards, and FormSubmit integration.

---

## 🚀 Key Features

- **15+ Production Pages:**
  - `index.html`: Home 1 (Bookkeeping & Financial Clarity focus with live CSS metrics mockup)
  - `home-2.html`: Home 2 (Fractional CFO & Strategic Advisory focus with runway/valuation widget)
  - `about.html`: Comprehensive 10-section specialized About Us page
  - `services.html`: 12-Service Interactive Service Grid
  - `service-details.html`: Dynamic service router supporting custom queries (`?service=cfo`, `?service=cashflow`, etc.)
  - `pricing.html`: 4-Tier Interactive Pricing Table with Monthly / Annual (20% discount) switcher
  - `blog.html`: Live instant search & category filterable blog hub
  - `blog-details.html`: Publication-grade editorial business article with sticky sidebar
  - `contact.html`: FormSubmit integrated contact & diagnostic request form
  - `thank-you.html`: FormSubmit success redirection page
  - `login.html`: Client Portal authentication UI
  - `register.html`: Client onboarding form with live 4-stage password strength meter
  - `dashboard.html`: Client Financial Portal with Chart.js Area & Doughnut charts + Messaging sandbox
  - `admin-dashboard.html`: Practice Management Portal with MRR growth charts & pipeline tracker
  - `404.html`: Financial ledger themed error page
  - `coming-soon.html`: Working launch countdown timer & early access capture
  - `maintenance.html`: SOC-2 security maintenance notice with progress indicator

- **Design System & Theme Engine:**
  - Zero framework dependencies (Vanilla CSS + Vanilla JavaScript).
  - Light & Dark Theme toggler (`[data-theme="dark"]`) with `localStorage` persistence.
  - Right-to-Left (RTL) Layout switcher (`[dir="rtl"]`) with `localStorage` persistence.
  - Responsive Breakpoints covering 320px to 1920px+.

---

## 📦 How to Run Locally

### Option 1: Using VS Code Live Server (Recommended)
1. Open the project folder in **VS Code**.
2. Right-click on `index.html` or `contact.html` and select **"Open with Live Server"**.
3. The website will open at `http://127.0.0.1:5500`.

### Option 2: Using Node / npx
```bash
npx serve .
# or
npx http-server .
```

### Option 3: Using Python
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📬 FormSubmit Contact Form Setup

The contact form in `contact.html` is pre-configured with **FormSubmit**:

```html
<form action="https://formsubmit.co/YOUR_EMAIL@DOMAIN.COM" method="POST" data-validate="true" novalidate id="contact-form">
  <input type="hidden" name="_subject" value="New Financial Consultation Request">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_next" id="formsubmit-next-url" value="thank-you.html">
  <input type="text" name="_honey" style="display:none">
  ...
</form>
```

### How to Activate Your Email:
1. Open `contact.html` and replace `advisory@finora.io` with your actual email address in the `action` attribute:
   ```html
   action="https://formsubmit.co/your-email@yourdomain.com"
   ```
2. Host the website on any live server or run via `localhost`.
3. Submit the form once. FormSubmit will send a **one-time activation email** to your inbox.
4. Click the confirmation link in the email. All subsequent inquiries will be forwarded directly to your inbox and automatically redirect your users to `thank-you.html`.

> **Note on `file://` protocol:** FormSubmit is an HTTP/HTTPS service and security policies prevent direct form submission when opening raw local files (`file:///`). Always serve the template via `localhost` or your web host.

---

## 🎨 Customization Guide

### 1. Brand Colors
Edit `:root` variables in `assets/css/style.css`:
```css
:root {
  --primary-color: #0c1a30;    /* Deep Corporate Navy */
  --secondary-color: #0e7490;  /* Strategic Teal / Deep Cyan */
  --accent-color: #0284c7;     /* Harmonious Cyan / Light Blue Accent */
  --bg-body: #f8fafc;          /* Canvas Background */
}
```

### 2. Typography
Google Fonts `Plus Jakarta Sans`, `Outfit`, and `JetBrains Mono` are pre-linked in all HTML headers.

---

## 📄 License & Credits
- **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Charts:** [Chart.js](https://www.chartjs.org/)
- **Fonts:** [Google Fonts](https://fonts.google.com/)
