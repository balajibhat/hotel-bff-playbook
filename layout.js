// Hotel BFF — Account Guide Layout Engine
// Injects sidebar navigation into every page

const NAV = [
  { section: 'Overview' },
  { label: 'Home', icon: '\u2302', href: 'index.html', id: 'home' },
  { label: 'Client Overview', icon: '\u2139', href: 'pages/client-overview.html', id: 'client-overview' },

  { section: 'Engagement' },
  { label: 'Scope & Phases', icon: '\u25CE', href: 'pages/scope.html', id: 'scope' },
  { label: 'Key Contacts', icon: '\u263A', href: 'pages/contacts.html', id: 'contacts' },

  { section: 'Strategy' },
  { label: 'Market & Regulatory', icon: '\u26A0', href: 'pages/market.html', id: 'market' },
  { label: 'Messaging & Positioning', icon: '\u270E', href: 'pages/messaging.html', id: 'messaging' },

  { section: 'Reference' },
  { label: 'Platform & Tools', icon: '\u26C1', href: 'pages/platform.html', id: 'platform' },
];

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return '';
}

function buildSidebar(activeId) {
  const base = getBasePath();
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  let html = `
    <div class="sidebar-brand">
      <h1>Hotel BFF</h1>
      <div class="badge">Account Guide</div>
    </div>
    <nav>
  `;

  let sectionOpen = false;
  for (const item of NAV) {
    if (item.section) {
      if (sectionOpen) html += `</div>`;
      html += `<div class="nav-section"><div class="nav-section-label">${item.section}</div>`;
      sectionOpen = true;
      continue;
    }
    const isActive = item.id === activeId;
    const href = base + item.href;
    html += `<a class="nav-link${isActive ? ' active' : ''}" href="${href}">
      <span class="nav-icon">${item.icon}</span>
      ${item.label}
    </a>`;
  }

  if (sectionOpen) html += `</div>`;
  html += `</nav>`;
  sidebar.innerHTML = html;
  return sidebar;
}

function buildMobileHeader() {
  const header = document.createElement('div');
  header.className = 'mobile-header';
  header.innerHTML = `
    <h1>Hotel BFF Guide</h1>
    <button class="menu-btn" onclick="document.getElementById('sidebar').classList.toggle('open')">Menu</button>
  `;
  return header;
}

function initLayout(activeId) {
  const body = document.body;
  const content = body.innerHTML;

  body.innerHTML = '';
  const layout = document.createElement('div');
  layout.className = 'layout';

  layout.appendChild(buildMobileHeader());
  layout.appendChild(buildSidebar(activeId));

  const main = document.createElement('main');
  main.className = 'main';
  main.innerHTML = content;
  layout.appendChild(main);

  body.appendChild(layout);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}
