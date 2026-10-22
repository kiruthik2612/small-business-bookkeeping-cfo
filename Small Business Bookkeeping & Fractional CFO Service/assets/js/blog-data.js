/**
 * ==========================================================================
 * FINORA - Comprehensive Blog Articles Repository & Dynamic Page Engine
 * File: assets/js/blog-data.js
 * ==========================================================================
 */

const FINORA_ARTICLES = [
  {
    id: "cashflow-model",
    title: "The 13-Week Cash Flow Model: Why It Is Non-Negotiable for Growing Businesses",
    category: "cashflow",
    categoryLabel: "Cash Flow Strategy",
    badgeClass: "badge-accent",
    readTime: "7 min read",
    date: "October 2026",
    image: "assets/images/blog/cashflow-model.jpg",
    excerpt: "Discover why static yearly budgets fail during rapid growth cycles and how an institutional 13-week rolling forecast provides true liquidity control and prevents payroll emergencies.",
    author: {
      name: "Elena Chen, MBA",
      role: "Head of CFO Advisory",
      image: "assets/images/team/elena.jpg",
      avatar: "EC",
      avatarBg: "var(--secondary-color)"
    },
    featured: true,
    content: `
      <p>One of the most dangerous misconceptions in small business management is confusing <strong>accounting profit</strong> on an Income Statement with <strong>actual spendable cash</strong> in the operating bank account.</p>
      <p>A business can show record quarterly profitability on paper while rapidly hurtling toward insolvency due to delayed accounts receivable collections, front-loaded inventory payments, and unbudgeted capital expenditures.</p>
      
      <h2>Why Static Annual Budgets Fail</h2>
      <p>Most small companies build a budget in November, save it to a spreadsheet, and never look at it again. In reality, modern market conditions, vendor terms, and revenue velocity fluctuate weekly. An annual budget is an aspirational snapshot; a <strong>13-Week Cash Flow Model</strong> is an operational navigation instrument.</p>
      
      <blockquote style="border-left: 4px solid var(--accent-color); background: var(--bg-surface-elevated); padding: 1.5rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin: 2rem 0; font-style: italic; font-size: 1.15rem; color: var(--text-main);">
        "Revenue is vanity, profit is sanity, but cash is king. If you don't know your exact cash runway 90 days from today, you aren't managing your business—you're gambling."
      </blockquote>

      <h2>The Anatomy of a 13-Week Forecast</h2>
      <p>A standard calendar quarter contains exactly 13 weeks. This timeframe strikes the ultimate balance: it is long enough to identify approaching cash deficits and take corrective action, yet short enough to maintain high forecasting accuracy.</p>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li><strong>Beginning Cash Balance:</strong> True reconciled bank cash across all operating accounts.</li>
        <li><strong>Cash Inflows:</strong> Expected AR collections categorized by client payment reliability.</li>
        <li><strong>Operational Cash Outflows:</strong> Payroll cycles, contractor fees, software subscriptions, and lease obligations.</li>
        <li><strong>Discretionary Outflows:</strong> Marketing ad spend, capital equipment, and inventory purchases.</li>
        <li><strong>Net Weekly Cash Flow & Ending Cash:</strong> The definitive buffer metric.</li>
      </ul>

      <h2>3 Immediate Actions to Take This Week</h2>
      <ol style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; padding-left: 1.25rem; list-style: decimal;">
        <li><strong>Audit Your Aging AR Report:</strong> Contact all clients with outstanding invoices older than 30 days and offer immediate ACH payment links.</li>
        <li><strong>Stagger Vendor Payment Terms:</strong> Transition key vendors from Net 15 to Net 30 or Net 45 to preserve operating liquidity.</li>
        <li><strong>Establish a 13-Week Cadence:</strong> Update your model every Monday morning during your leadership sync.</li>
      </ol>
    `
  },
  {
    id: "fractional-cfo-vs-fulltime",
    title: "When to Hire a Fractional CFO vs. Full-Time CFO: The $2M ARR Inflection Point",
    category: "cfo",
    categoryLabel: "CFO Strategy",
    badgeClass: "badge-secondary",
    readTime: "6 min read",
    date: "October 2026",
    image: "assets/images/blog/fractional-cfo.jpg",
    excerpt: "How scaling businesses obtain boardroom-grade capital allocation, financial architecture, and debt negotiation without taking on a $350k annual executive salary overhead.",
    author: {
      name: "Alexander Knight, CPA",
      role: "Managing Partner",
      image: "assets/images/team/alexander.jpg",
      avatar: "AK",
      avatarBg: "var(--primary-color)"
    },
    featured: false,
    content: `
      <p>Early-stage founders often believe their only options for financial leadership are continuing to struggle with spreadsheets alone or committing to an expensive executive executive search for a full-time Chief Financial Officer.</p>
      <p>For businesses generating between $1M and $15M in annual recurring revenue, a <strong>Fractional CFO</strong> delivers 90% of the strategic impact at a fraction of the cost.</p>

      <h2>The Real Cost Comparison</h2>
      <p>A seasoned full-time CFO in today's market demands $300,000 to $450,000 in base compensation, plus bonuses, equity, and benefits. In contrast, a fractional CFO engagement costs between $3,500 and $8,000 per month—allowing you to deploy capital into growth and engineering.</p>

      <h2>Key Deliverables You Should Expect</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li>Multi-scenario 3-statement financial modeling (Base, Bull, Bear).</li>
        <li>Unit economics optimization (LTV, CAC payback, churn cohorts).</li>
        <li>Banking relationship management and lines of credit underwriting.</li>
        <li>Board presentation decks and institutional investor due diligence.</li>
      </ul>
    `
  },
  {
    id: "automated-bookkeeping-ai",
    title: "AI & Automated Reconciliation: How Modern Bookkeeping Cuts Close Times by 75%",
    category: "bookkeeping",
    categoryLabel: "Bookkeeping",
    badgeClass: "badge-accent",
    readTime: "5 min read",
    date: "September 2026",
    image: "assets/images/blog/bookkeeping-ai.jpg",
    excerpt: "Explore the modern accounting technology stack combining OCR bank feeds, automated rule engines, and human CPA validation for 5-day monthly closes.",
    author: {
      name: "Sarah Jenkins, CPA",
      role: "Lead Controller",
      image: "assets/images/testimonials/sarah.jpg",
      avatar: "SJ",
      avatarBg: "var(--accent-color)"
    },
    featured: false,
    content: `
      <p>Waiting until the 25th of the month to receive last month's financial statements is a relic of legacy accounting practices. In volatile market environments, founders need real-time numbers to make real-time decisions.</p>
      
      <h2>The Hybrid Automated Workflow</h2>
      <p>By pairing automated bank transaction categorization with dedicated CPA oversight, Finora eliminates manual data entry while ensuring GAAP compliance.</p>
      
      <h2>Benefits of a 5-Day Monthly Close</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li>Instant visibility into monthly burn rate and runway.</li>
        <li>Zero tax season panic or last-minute scramble for receipts.</li>
        <li>Clean, investor-ready balance sheets updated monthly.</li>
      </ul>
    `
  },
  {
    id: "tax-readiness-checklist",
    title: "Year-End Tax Readiness Checklist for LLCs, S-Corps, and Fast-Scaling Startups",
    category: "taxes",
    categoryLabel: "Taxes & Compliance",
    badgeClass: "badge-info",
    readTime: "6 min read",
    date: "September 2026",
    image: "assets/images/blog/tax-strategy.jpg",
    excerpt: "Maximize your Section 179 depreciation deductions, audit 1099 contractor filings, and structure owner distributions to legally minimize tax liabilities before December 31st.",
    author: {
      name: "David Sterling, CPA",
      role: "Head of Bookkeeping",
      image: "assets/images/team/david.jpg",
      avatar: "DS",
      avatarBg: "var(--info-color)"
    },
    featured: false,
    content: `
      <p>Tax planning should never begin in March of the following year. Proactive tax optimization happens in Q4 while business owners still have the leverage to make strategic operational decisions.</p>
      
      <h2>Essential Q4 Tax Checkpoints</h2>
      <ol style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: decimal;">
        <li><strong>Reasonable Compensation Evaluation:</strong> Ensure S-Corp owner-officer W-2 salaries adhere to IRS reasonable compensation standards.</li>
        <li><strong>Section 179 Capital Deductions:</strong> Accelerate necessary hardware, software, and machinery investments before year-end.</li>
        <li><strong>State and Local Tax (SALT) Workarounds:</strong> Take advantage of pass-through entity tax elections where applicable.</li>
      </ol>
    `
  },
  {
    id: "gross-margin-expansion",
    title: "Gross Margin Expansion: 4 Levers to Instantly Boost Your Net Profitability",
    category: "growth",
    categoryLabel: "Business Growth",
    badgeClass: "badge-warning",
    readTime: "5 min read",
    date: "September 2026",
    image: "assets/images/blog/business-growth.jpg",
    excerpt: "A tactical guide to vendor renegotiation, direct labor allocation, and tiered pricing restructuring that transforms revenue into real cash flow.",
    author: {
      name: "Sophia O'Connor",
      role: "Senior Financial Analyst",
      image: "assets/images/team/sophia.jpg",
      avatar: "SO",
      avatarBg: "var(--warning-color)"
    },
    featured: false,
    content: `
      <p>Top-line revenue growth is meaningless if your cost of goods sold (COGS) expands at the same rate. True business valuation multiples are driven by gross margin efficiency and operational leverage.</p>
      
      <h2>The 4 Gross Margin Levers</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li><strong>Tiered Packaging:</strong> Shift customer base into value-driven premium support tiers.</li>
        <li><strong>Direct Labor Reclassification:</strong> Uncover hidden overhead improperly attributed to deliverable costs.</li>
        <li><strong>Vendor Volume Discounting:</strong> Audit subscription and cloud hosting contracts to consolidate spend.</li>
        <li><strong>Churn Cohort Pricing:</strong> Eliminate unprofitable low-margin legacy client contracts.</li>
      </ul>
    `
  },
  {
    id: "3-statement-financial-modeling",
    title: "Mastering 3-Statement Financial Modeling for Board Meetings & Bank Lending",
    category: "planning",
    categoryLabel: "Financial Planning",
    badgeClass: "badge-secondary",
    readTime: "8 min read",
    date: "August 2026",
    image: "assets/images/blog/financial-planning.jpg",
    excerpt: "How dynamically connecting your Income Statement, Balance Sheet, and Cash Flow Statement unlocks credible bank debt and confident investor backing.",
    author: {
      name: "Elena Chen, MBA",
      role: "Head of CFO Advisory",
      image: "assets/images/team/elena.jpg",
      avatar: "EC",
      avatarBg: "var(--secondary-color)"
    },
    featured: false,
    content: `
      <p>When presenting to board members, venture investors, or commercial credit underwriters, static slide decks are insufficient. You need an integrated 3-statement financial model that dynamically updates cash requirements as hiring or revenue assumptions change.</p>
      
      <h2>Why Linkage Matters</h2>
      <p>Net Income flows into Retained Earnings on the Balance Sheet and starts the Cash Flow Statement. Working capital changes on the Balance Sheet directly drive operational cash flow.</p>
    `
  },
  {
    id: "days-sales-outstanding-dso",
    title: "Days Sales Outstanding (DSO): How to Cut Your Invoicing Lag in Half",
    category: "cashflow",
    categoryLabel: "Cash Flow",
    badgeClass: "badge-accent",
    readTime: "5 min read",
    date: "August 2026",
    image: "assets/images/blog/dso-invoicing.jpg",
    excerpt: "Reduce unpaid accounts receivable bottlenecks by establishing milestone billing, credit card auto-charge, and automated collection workflows.",
    author: {
      name: "Marcus Vance, CPA",
      role: "Lead Controller",
      image: "assets/images/testimonials/marcus.jpg",
      avatar: "MV",
      avatarBg: "var(--accent-color)"
    },
    featured: false,
    content: `
      <p>Uncollected invoices represent interest-free loans granted to your customers. High DSO is the single most common cause of sudden cash shortages in profitable service and tech companies.</p>
      
      <h2>Best Practices to Lower DSO</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li>Require credit card or ACH on file before project commencement.</li>
        <li>Implement automated payment reminders 3 days before and on invoice due dates.</li>
        <li>Offer 2% Net 10 settlement terms for high-volume enterprise contracts.</li>
      </ul>
    `
  },
  {
    id: "due-diligence-data-room",
    title: "Building an Audit-Ready Due Diligence Data Room Before Seeking Growth Capital",
    category: "cfo",
    categoryLabel: "CFO Strategy",
    badgeClass: "badge-secondary",
    readTime: "6 min read",
    date: "August 2026",
    image: "assets/images/blog/due-diligence.jpg",
    excerpt: "A complete step-by-step checklist of historical ledgers, cap table models, and revenue recognition schedules required to ace investor audits.",
    author: {
      name: "Alexander Knight, CPA",
      role: "Managing Partner",
      image: "assets/images/team/alexander.jpg",
      avatar: "AK",
      avatarBg: "var(--primary-color)"
    },
    featured: false,
    content: `
      <p>Fundraising or M&A conversations can stall indefinitely if institutional buyers discover messy books, missing contracts, or inconsistent revenue recognition standards.</p>
      
      <h2>Key Files for Your Virtual Data Room (VDR)</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li>36 months of reconciled historical financial statements (GAAP compliant).</li>
        <li>Fully-diluted capitalization table detailing option pools and warrants.</li>
        <li>Customer cohort retention curves and unit churn analysis.</li>
        <li>Key customer master service agreements (MSAs) and vendor obligations.</li>
      </ul>
    `
  },
  {
    id: "accrual-vs-cash-basis",
    title: "Cash vs. Accrual Accounting: When Your Business Must Make the Switch",
    category: "bookkeeping",
    categoryLabel: "Bookkeeping",
    badgeClass: "badge-accent",
    readTime: "5 min read",
    date: "July 2026",
    image: "assets/images/blog/accrual-accounting.jpg",
    excerpt: "Understand the critical differences between cash and accrual methods, IRS threshold requirements, and why accrual is essential for understanding real unit economics.",
    author: {
      name: "Sarah Jenkins, CPA",
      role: "Lead Controller",
      image: "assets/images/testimonials/sarah.jpg",
      avatar: "SJ",
      avatarBg: "var(--accent-color)"
    },
    featured: false,
    content: `
      <p>While cash basis accounting is simple for solo freelancers, scaling businesses with inventory, prepaid subscriptions, or multi-month contracts must transition to accrual accounting to see true performance.</p>
      
      <h2>The Matching Principle</h2>
      <p>Accrual accounting matches revenue with the expenses incurred to generate that revenue in the exact same time period, providing an honest view of gross margin.</p>
    `
  },
  {
    id: "cac-payback-unit-economics",
    title: "CAC Payback & LTV Ratios: The Financial Metrics That Determine Scale",
    category: "planning",
    categoryLabel: "Financial Planning",
    badgeClass: "badge-secondary",
    readTime: "7 min read",
    date: "July 2026",
    image: "assets/images/blog/unit-economics.jpg",
    excerpt: "Learn how fractional CFOs calculate blended Customer Acquisition Cost (CAC), payback periods, and Lifetime Value (LTV) to guide aggressive yet sustainable hiring.",
    author: {
      name: "Elena Chen, MBA",
      role: "Head of CFO Advisory",
      image: "assets/images/team/elena.jpg",
      avatar: "EC",
      avatarBg: "var(--secondary-color)"
    },
    featured: false,
    content: `
      <p>Pouring money into sales and marketing without knowing your CAC payback velocity is one of the fastest ways to deplete operating cash.</p>
      
      <h2>Benchmark Targets for Small Businesses</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li><strong>CAC Payback Period:</strong> Under 12 months for B2B; under 6 months for transactional B2C.</li>
        <li><strong>LTV to CAC Ratio:</strong> Minimum 3:1 healthy benchmark; 5:1 indicates room for faster reinvestment.</li>
      </ul>
    `
  },
  {
    id: "bootstrapping-vs-debt-financing",
    title: "Non-Dilutive Financing: Using Revenue-Based Financing and Lines of Credit",
    category: "growth",
    categoryLabel: "Business Growth",
    badgeClass: "badge-warning",
    readTime: "6 min read",
    date: "June 2026",
    image: "assets/images/blog/debt-financing.jpg",
    excerpt: "Why selling company equity to fund working capital is a costly mistake, and how to structure non-dilutive bank revolvers and SBA 7(a) facilities instead.",
    author: {
      name: "Sophia O'Connor",
      role: "Senior Financial Analyst",
      image: "assets/images/team/sophia.jpg",
      avatar: "SO",
      avatarBg: "var(--warning-color)"
    },
    featured: false,
    content: `
      <p>Equity is the most expensive currency a founder will ever spend. For businesses with predictable recurring cash flows, debt instruments preserve ownership while providing vital growth capital.</p>
      
      <h2>Non-Dilutive Options to Consider</h2>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; padding-left: 1.25rem; list-style: disc;">
        <li>Asset-Based Working Capital Lines</li>
        <li>SBA 7(a) and 504 Expansion Loans</li>
        <li>Revenue-Based Financing for SaaS and E-commerce</li>
      </ul>
    `
  },
  {
    id: "chart-of-accounts-architecture",
    title: "Structuring a Clean Chart of Accounts (COA) for Clear Financial Visibility",
    category: "bookkeeping",
    categoryLabel: "Bookkeeping",
    badgeClass: "badge-accent",
    readTime: "4 min read",
    date: "June 2026",
    image: "assets/images/blog/chart-of-accounts.jpg",
    excerpt: "Avoid bloated ledgers with hundreds of redundant sub-accounts. Build a standard, hierarchical Chart of Accounts that makes executive reporting effortless.",
    author: {
      name: "David Sterling, CPA",
      role: "Head of Bookkeeping",
      image: "assets/images/team/david.jpg",
      avatar: "DS",
      avatarBg: "var(--info-color)"
    },
    featured: false,
    content: `
      <p>A disorganized Chart of Accounts leads to miscategorized expenses, muddy gross margins, and massive confusion during board meetings or tax season.</p>
      
      <h2>Golden Rules of COA Design</h2>
      <p>Limit your top-level accounts to standard GAAP hierarchies (1000s Assets, 2000s Liabilities, 3000s Equity, 4000s Revenue, 5000s COGS, 6000s OpEx). Never create an account for an individual vendor or client name.</p>
    `
  }
];

// Helper to get article by ID or slug
function getArticleById(id) {
  return FINORA_ARTICLES.find(a => a.id === id) || FINORA_ARTICLES[0];
}
