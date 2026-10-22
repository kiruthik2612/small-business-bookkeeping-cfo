/**
 * ==========================================================================
 * FINORA - Client & Admin Financial Dashboards Engine
 * File: assets/js/dashboard.js
 * Author: Theme Specialist
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- 1. Client Portal Chart Visualizations (Chart.js Integration) ---
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';

  // Revenue vs Expenses Area Chart
  const revenueChartCtx = document.getElementById('clientRevenueChart');
  if (revenueChartCtx && typeof Chart !== 'undefined') {
    new Chart(revenueChartCtx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Live)'],
        datasets: [
          {
            label: 'Monthly Revenue',
            data: [98500, 104200, 112000, 119800, 124500, 128450],
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.15)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5
          },
          {
            label: 'Operating Expenses',
            data: [68000, 71200, 73500, 72900, 75100, 74200],
            borderColor: '#0e7490',
            backgroundColor: 'rgba(14, 116, 144, 0.05)',
            fill: true,
            tension: 0.35,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: function (val) { return '$' + (val / 1000) + 'k'; }
            }
          }
        }
      }
    });
  }

  // Expense Breakdown Doughnut Chart
  const expenseDoughnutCtx = document.getElementById('clientExpenseDoughnut');
  if (expenseDoughnutCtx && typeof Chart !== 'undefined') {
    new Chart(expenseDoughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Payroll & Contractors', 'Cloud Infrastructure', 'Sales & Marketing', 'General & Admin'],
        datasets: [{
          data: [48, 22, 18, 12],
          backgroundColor: ['#0c1a30', '#0e7490', '#0284c7', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, font: { size: 11 } }
          }
        }
      }
    });
  }

  // Cash Flow & Runway Forecast Chart (13-Week Projection)
  const cashflowChartCtx = document.getElementById('clientCashflowChart');
  let clientCashflowChartInstance = null;
  if (cashflowChartCtx && typeof Chart !== 'undefined') {
    clientCashflowChartInstance = new Chart(cashflowChartCtx, {
      type: 'bar',
      data: {
        labels: ['W1 (Oct 10)', 'W2 (Oct 17)', 'W3 (Oct 24)', 'W4 (Oct 31)', 'W5 (Nov 07)', 'W6 (Nov 14)', 'W7 (Nov 21)', 'W8 (Nov 28)', 'W9 (Dec 05)', 'W10 (Dec 12)', 'W11 (Dec 19)', 'W12 (Dec 26)', 'W13 (Jan 02)'],
        datasets: [
          {
            type: 'line',
            label: 'Projected Cash Balance ($)',
            data: [342800, 338500, 351200, 345000, 362400, 358900, 372100, 369400, 381000, 376200, 394500, 389000, 408500],
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Net Weekly Cash Inflow / (Outflow)',
            data: [-4300, 12700, -6200, 17400, -3500, 13200, -2700, 11600, -4800, 18300, -5500, 19500, 21200],
            backgroundColor: function(context) {
              const val = context.raw;
              return val >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.75)';
            },
            borderRadius: 4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: function (val) { return '$' + (val / 1000) + 'k'; }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: textColor,
              callback: function (val) { return '$' + (val / 1000) + 'k'; }
            }
          }
        }
      }
    });
  }

  // Admin Monthly MRR & Client Acquisition Chart
  const adminGrowthCtx = document.getElementById('adminGrowthChart');
  if (adminGrowthCtx && typeof Chart !== 'undefined') {
    new Chart(adminGrowthCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Total Active Clients',
          data: [320, 345, 380, 410, 442, 468, 490, 515, 532, 550],
          backgroundColor: '#0e7490',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor } }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        }
      }
    });
  }

  // --- 2. Interactive Messaging Sandbox in Client & Admin Portals ---
  const chatForm = document.getElementById('dashboard-chat-form');
  const chatInput = document.getElementById('dashboard-chat-input');
  const chatContainer = document.getElementById('dashboard-chat-messages');

  if (chatForm && chatInput && chatContainer) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = chatInput.value.trim();
      if (!messageText) return;

      // Append Client Message
      const userBubble = document.createElement('div');
      userBubble.style.cssText = 'align-self: flex-end; background: var(--secondary-color); color: #fff; padding: 0.75rem 1rem; border-radius: 12px 12px 0 12px; max-width: 80%; margin-bottom: 0.75rem; font-size: 0.9rem;';
      userBubble.innerHTML = `<div>${messageText}</div><span style="font-size: 0.7rem; opacity: 0.8; display: block; text-align: right; margin-top: 0.25rem;">Just now</span>`;
      chatContainer.appendChild(userBubble);
      chatInput.value = '';
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Simulate Automated CFO Response
      setTimeout(() => {
        const cfoBubble = document.createElement('div');
        cfoBubble.style.cssText = 'align-self: flex-start; background: var(--bg-surface-elevated); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 12px 12px 12px 0; max-width: 80%; margin-bottom: 0.75rem; font-size: 0.9rem; border: 1px solid var(--border-color);';
        cfoBubble.innerHTML = `<div><strong>Elena Chen (CFO):</strong> Thank you for the update! I have reviewed your October reconciliations and logged the expense reclassification.</div><span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">Just now</span>`;
        chatContainer.appendChild(cfoBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1200);
    });
  }

  // --- 3. Filterable Invoice Status Table ---
  const statusFilterSelect = document.getElementById('invoice-status-filter');
  if (statusFilterSelect) {
    statusFilterSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      const rows = document.querySelectorAll('.invoice-row');
      rows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        if (selected === 'all' || rowStatus === selected) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // --- 4. Collapsible Mobile/Tablet Sidebar Controller ---
  const sidebarToggleBtn = document.querySelector('.dashboard-toggle-btn');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  const sidebarOverlay = document.querySelector('.dashboard-sidebar-overlay');
  const sidebarCloseBtn = document.querySelector('.dashboard-sidebar-close');

  function openDashboardSidebar() {
    if (dashboardSidebar && sidebarOverlay) {
      dashboardSidebar.classList.add('active');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDashboardSidebar() {
    if (dashboardSidebar && sidebarOverlay) {
      dashboardSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openDashboardSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeDashboardSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeDashboardSidebar);

  // --- 4. Sidebar Navigation & Section Routing (Client & Admin Portals) ---
  const navLinks = dashboardSidebar ? dashboardSidebar.querySelectorAll('.nav-link') : [];
  const clientDashboardSections = document.querySelectorAll('.dashboard-section');
  const isSingleSectionView = clientDashboardSections.length > 0;

  // Aliases for friendly or legacy hashes
  const sectionAliases = {
    'financials': 'cashflow',
    'cash-flow': 'cashflow',
    'messages': 'chat',
    'message': 'chat'
  };

  function normalizeSectionId(id) {
    if (!id) return '';
    const clean = id.replace(/^#/, '').toLowerCase().trim();
    return sectionAliases[clean] || clean;
  }

  function setActiveNavLink(targetId) {
    if (!dashboardSidebar) return;
    const normalizedTarget = normalizeSectionId(targetId);
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const linkId = normalizeSectionId(href);
        if (linkId === normalizedTarget) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  // Switch visible dashboard section for Client Dashboard
  function showDashboardSection(targetId, updateHistory) {
    const normalized = normalizeSectionId(targetId) || 'overview';
    const targetSection = document.getElementById(normalized);

    // If target section exists as a dashboard section, switch to it exclusively
    if (targetSection && targetSection.classList.contains('dashboard-section')) {
      clientDashboardSections.forEach(sec => {
        if (sec.id === normalized) {
          sec.hidden = false;
          sec.removeAttribute('hidden');
          sec.style.display = 'block';
        } else {
          sec.hidden = true;
          sec.setAttribute('hidden', '');
          sec.style.display = 'none';
        }
      });

      setActiveNavLink(normalized);

      if (updateHistory) {
        history.pushState(null, '', `#${normalized}`);
      }

      // Scroll viewport back to top of dashboard content smoothly
      const dashboardMain = document.getElementById('dashboard-main') || document.querySelector('.dashboard-main');
      if (dashboardMain) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Re-trigger Chart.js resize/update for newly visible charts
      setTimeout(() => {
        if (typeof Chart !== 'undefined') {
          if (normalized === 'overview') {
            if (window.Chart.getChart) {
              const rChart = window.Chart.getChart('clientRevenueChart');
              const dChart = window.Chart.getChart('clientExpenseDoughnut');
              if (rChart) rChart.resize();
              if (dChart) dChart.resize();
            }
          } else if (normalized === 'cashflow') {
            if (window.Chart.getChart) {
              const cChart = window.Chart.getChart('clientCashflowChart');
              if (cChart) cChart.resize();
            } else if (clientCashflowChartInstance) {
              clientCashflowChartInstance.resize();
            }
          }
        }
      }, 50);

      return true;
    }
    return false;
  }

  // Handle click on sidebar links
  if (dashboardSidebar) {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Check if internal anchor link
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);

          if (isSingleSectionView) {
            showDashboardSection(targetId, true);
          } else {
            // Admin portal anchor scrolling
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.pushState(null, '', href);
              setActiveNavLink(targetId);
            }
          }
        }

        // Close sidebar drawer on mobile
        if (window.innerWidth <= 992) {
          closeDashboardSidebar();
        }
      });
    });
  }

  // Handle document internal hash links (e.g. "Message CFO" buttons, links to #chat, #reports, etc.)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor || anchor.closest('.dashboard-sidebar')) return;

    const href = anchor.getAttribute('href');
    if (href && href.length > 1) {
      const targetId = href.substring(1);
      if (isSingleSectionView && showDashboardSection(targetId, true)) {
        e.preventDefault();
      }
    }
  });

  // Handle URL hash changes (back/forward browser navigation)
  window.addEventListener('hashchange', () => {
    const rawHash = window.location.hash;
    if (rawHash) {
      const targetId = rawHash.substring(1);
      if (isSingleSectionView) {
        showDashboardSection(targetId, false);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveNavLink(targetId);
        }
      }
    } else if (isSingleSectionView) {
      showDashboardSection('overview', false);
    }
  });

  // Initial load navigation: support direct links with hash
  if (isSingleSectionView) {
    const initialHash = window.location.hash ? window.location.hash.substring(1) : 'overview';
    const initialTarget = normalizeSectionId(initialHash) || 'overview';
    showDashboardSection(initialTarget, false);
  } else if ('IntersectionObserver' in window) {
    // Admin dashboard ScrollSpy
    const sectionIds = Array.from(navLinks)
      .map(link => {
        const href = link.getAttribute('href');
        return (href && href.startsWith('#')) ? href.substring(1) : null;
      })
      .filter(Boolean);

    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach(sec => sectionObserver.observe(sec));
  }

  // Admin Portal Client Search Filter
  const adminClientSearch = document.getElementById('admin-client-search');
  const adminClientsTable = document.getElementById('admin-clients-table');
  if (adminClientSearch && adminClientsTable) {
    adminClientSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const rows = adminClientsTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // --- 5. Export P&L Financial Report (PDF Generator) ---
  const exportPdfBtn = document.getElementById('export-pdf-btn');

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Ensure jsPDF is loaded
      const jspdfModule = window.jspdf;
      if (!jspdfModule || !jspdfModule.jsPDF) {
        alert('PDF Generation Library is loading. Please try again in a moment.');
        return;
      }

      const originalBtnHtml = exportPdfBtn.innerHTML;
      exportPdfBtn.disabled = true;
      exportPdfBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Generating PDF...';

      try {
        const { jsPDF } = jspdfModule;
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40;
        const contentWidth = pageWidth - (margin * 2);

        // --- PAGE 1: HEADER & COMPANY BRANDING ---
        // Top header banner background
        doc.setFillColor(12, 26, 48); // #0c1a30 primary brand
        doc.rect(0, 0, pageWidth, 75, 'F');

        // Brand Title
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('FINORA FINANCIAL ADVISORY', margin, 38);

        // Subtitle / Document Type
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(2, 132, 199); // #0284c7 accent light blue / cyan
        doc.text('EXECUTIVE FINANCIAL REPORT & CASH FLOW SUMMARY', margin, 54);

        // Date of generation
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        doc.setFontSize(9);
        doc.setTextColor(203, 213, 225);
        doc.text(`Generated: ${dateStr}`, pageWidth - margin, 46, { align: 'right' });

        // --- CLIENT & AUDIT METADATA BLOCK ---
        let currentY = 100;
        doc.setFillColor(248, 250, 252); // surface elevated #f8fafc
        doc.setDrawColor(226, 232, 240); // border color #e2e8f0
        doc.roundedRect(margin, currentY, contentWidth, 54, 4, 4, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42); // #0f172a
        doc.text('Client: Acme Corp LLC', margin + 14, currentY + 22);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139); // text muted #64748b
        doc.text('Lead CFO: Elena Chen, MBA  |  Accounting Pod: Pod Alpha (US GAAP Reconciled)', margin + 14, currentY + 40);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(14, 116, 144); // #0e7490
        doc.text('STATUS: BOOKS CLOSED (OCT 2026)', pageWidth - margin - 14, currentY + 30, { align: 'right' });

        // --- EXECUTIVE KPI CARDS ---
        currentY += 72;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text('Key Performance Indicators (KPIs)', margin, currentY);

        currentY += 12;
        const kpiCards = [
          { label: 'CASH IN BANK', value: '$342,800', note: '8.5 Mos Runway', color: [14, 116, 144] },
          { label: 'OCT REVENUE', value: '$128,450', note: '+14.2% MoM Growth', color: [16, 185, 129] },
          { label: 'OCT EXPENSES', value: '$74,200', note: 'On Target Budget', color: [100, 116, 139] },
          { label: 'NET PROFIT', value: '$54,250', note: '42.2% Net Margin', color: [245, 158, 11] }
        ];

        const cardGap = 10;
        const cardWidth = (contentWidth - (cardGap * 3)) / 4;
        const cardHeight = 56;

        kpiCards.forEach((kpi, idx) => {
          const cardX = margin + (idx * (cardWidth + cardGap));
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(cardX, currentY, cardWidth, cardHeight, 4, 4, 'FD');

          // Left accent border strip
          doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
          doc.rect(cardX, currentY, 3, cardHeight, 'F');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text(kpi.label, cardX + 8, currentY + 16);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.setTextColor(15, 23, 42);
          doc.text(kpi.value, cardX + 8, currentY + 34);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
          doc.text(kpi.note, cardX + 8, currentY + 48);
        });

        // --- CHART VISUALIZATIONS SECTION ---
        currentY += cardHeight + 24;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text('Visual Financial Analytics', margin, currentY);

        currentY += 12;
        const revenueChartCanvas = document.getElementById('clientRevenueChart');
        const expenseChartCanvas = document.getElementById('clientExpenseDoughnut');

        const chartSectionHeight = 170;
        const chartGap = 12;
        const lineChartWidth = (contentWidth * 0.60) - (chartGap / 2);
        const doughnutChartWidth = (contentWidth * 0.40) - (chartGap / 2);

        // Render Revenue Chart Container & Image
        if (revenueChartCanvas) {
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(margin, currentY, lineChartWidth, chartSectionHeight, 4, 4, 'FD');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text('Revenue vs Operating Expenses (Last 6 Months)', margin + 10, currentY + 16);

          try {
            const lineImgData = revenueChartCanvas.toDataURL('image/png', 1.0);
            doc.addImage(lineImgData, 'PNG', margin + 10, currentY + 22, lineChartWidth - 20, chartSectionHeight - 30);
          } catch (chartErr) {
            console.warn('Could not export line chart to image:', chartErr);
          }
        }

        // Render Doughnut Breakdown Container & Image
        if (expenseChartCanvas) {
          const doughnutX = margin + lineChartWidth + chartGap;
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(doughnutX, currentY, doughnutChartWidth, chartSectionHeight, 4, 4, 'FD');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text('October Expense Allocation', doughnutX + 10, currentY + 16);

          try {
            const doughnutImgData = expenseChartCanvas.toDataURL('image/png', 1.0);
            doc.addImage(doughnutImgData, 'PNG', doughnutX + 15, currentY + 24, doughnutChartWidth - 30, chartSectionHeight - 32);
          } catch (chartErr) {
            console.warn('Could not export doughnut chart to image:', chartErr);
          }
        }

        // --- TRANSACTION TABLE SECTION ---
        currentY += chartSectionHeight + 24;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text('Accounts Receivable & Invoicing Ledger', margin, currentY);

        currentY += 8;

        // Extract live table rows from DOM
        const tableElement = document.querySelector('#invoices table');
        const tableBodyRows = [];
        if (tableElement) {
          const rows = tableElement.querySelectorAll('tbody tr');
          rows.forEach(tr => {
            const cols = tr.querySelectorAll('td');
            if (cols.length >= 5) {
              const invNum = cols[0].textContent.trim();
              const client = cols[1].textContent.trim();
              const date = cols[2].textContent.trim();
              const amount = cols[3].textContent.trim();
              const status = cols[4].textContent.trim();
              tableBodyRows.push([invNum, client, date, amount, status]);
            }
          });
        }

        if (tableBodyRows.length === 0) {
          tableBodyRows.push(
            ['INV-2026-089', 'Stripe Payments Inc.', 'Oct 01, 2026', '$14,200.00', 'Paid'],
            ['INV-2026-090', 'Horizon Media Group', 'Oct 05, 2026', '$8,750.00', 'Pending (Net 15)'],
            ['INV-2026-085', 'Vanguard Consulting', 'Sep 15, 2026', '$12,400.00', 'Overdue 8 Days']
          );
        }

        if (typeof doc.autoTable === 'function') {
          doc.autoTable({
            startY: currentY,
            margin: { left: margin, right: margin },
            head: [['Invoice #', 'Customer / Client', 'Issue Date', 'Amount', 'Status']],
            body: tableBodyRows,
            theme: 'striped',
            headStyles: {
              fillColor: [12, 26, 48],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              fontSize: 9,
              cellPadding: 7
            },
            bodyStyles: {
              fontSize: 8.5,
              textColor: [15, 23, 42],
              cellPadding: 6
            },
            alternateRowStyles: {
              fillColor: [248, 250, 252]
            },
            columnStyles: {
              0: { fontStyle: 'bold', width: 90 },
              3: { halign: 'right', fontStyle: 'bold' },
              4: { halign: 'center' }
            },
            didDrawPage: function (data) {
              // Page footer
              doc.setFont('helvetica', 'normal');
              doc.setFontSize(8);
              doc.setTextColor(148, 163, 184);
              doc.text('Finora Financial Portal  |  Confidential & Proprietary  |  support@finora.io', margin, pageHeight - 20);
              doc.text(`Page 1 of 1`, pageWidth - margin, pageHeight - 20, { align: 'right' });
            }
          });
        } else {
          // Fallback manual table render
          let tableY = currentY + 14;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.text('Invoice #       Customer              Date               Amount          Status', margin, tableY);
          tableBodyRows.forEach(row => {
            tableY += 16;
            doc.setFont('helvetica', 'normal');
            doc.text(`${row[0]}    ${row[1].padEnd(20)}  ${row[2]}  ${row[3]}   ${row[4]}`, margin, tableY);
          });
        }

        // Save and trigger browser download
        const filename = `Finora_Financial_Overview_${now.toISOString().split('T')[0]}.pdf`;
        doc.save(filename);

      } catch (err) {
        console.error('Error generating PDF:', err);
        alert('An error occurred while generating the PDF. Please check the console for details.');
      } finally {
        exportPdfBtn.disabled = false;
        exportPdfBtn.innerHTML = originalBtnHtml;
      }
    });
  }

})();



