document.querySelectorAll('[data-dashboard-action]').forEach((button) => button.addEventListener('click', () => {
  button.textContent = 'Saved ✓';
  setTimeout(() => { button.textContent = button.dataset.dashboardAction; }, 1800);
}));

(() => {
  const content = document.querySelector('.dash .content');
  const nav = document.querySelector('.side-nav');
  const heading = content?.querySelector('.heading');
  if (!content || !nav || !heading) return;

  const isAdmin = location.pathname.endsWith('admin-dashboard.html');
  const overviewTitle = heading.querySelector('h1')?.textContent || 'Dashboard';
  const overviewText = heading.querySelector('p')?.textContent || '';
  const stats = content.querySelector('.stats');
  const dashboardGrid = content.querySelector('.dash-grid');
  const view = document.createElement('section');
  view.className = 'dashboard-module-view';
  view.hidden = true;
  heading.after(view);

  const modules = {
    overview: { title: overviewTitle, description: overviewText },
    members: { title: 'Members', description: 'Member activity and membership status.', source: '#members' },
    schedule: { title: isAdmin ? 'Class schedule' : 'My schedule', description: 'Upcoming classes, coaching and session capacity.', source: '#schedule' },
    revenue: { title: 'Revenue', description: 'Recent revenue performance for the club.', source: '#revenue' },
    progress: { title: 'Progress', description: 'Your weekly training activity and plan.', source: '#progress' },
    classes: { title: 'Classes', description: 'Your upcoming classes and training sessions.', source: '#schedule' },
    support: { title: 'Support', description: 'Get help from the Stackly club team.', html: '<div class="card support-detail"><h2>How can we help?</h2><p>Our team can help with your membership, bookings, account, and club access.</p><div class="support-contact"><a href="404.html">Contact the club team</a><a href="404.html">hello@stackly.club</a><a href="404.html">+91 98765 43210</a></div></div>' }
  };

  const keyFor = (link) => {
    const label = link.textContent.trim().toLowerCase();
    const target = link.getAttribute('href') || '';
    if (/dashboard|overview/.test(label)) return 'overview';
    if (/member/.test(label) || target === '#members') return 'members';
    if (/schedule/.test(label) || target === '#schedule') return 'schedule';
    if (/revenue/.test(label) || target === '#revenue') return 'revenue';
    if (/progress|activity|training plan/.test(label) || target === '#progress') return 'progress';
    if (/class/.test(label)) return 'classes';
    if (/support|help/.test(label) || target === 'contact.html') return 'support';
    return null;
  };

  const showModule = (key, selectedLink) => {
    const module = modules[key];
    if (!module) return;
    const title = heading.querySelector('h1');
    const description = heading.querySelector('p');
    if (title) title.textContent = module.title;
    if (description) description.textContent = module.description;
    const isOverview = key === 'overview';
    if (stats) stats.hidden = !isOverview;
    if (dashboardGrid) dashboardGrid.hidden = !isOverview;
    const gallery = content.querySelector('.club-gallery');
    if (gallery) gallery.hidden = !isOverview;
    view.hidden = isOverview;
    view.replaceChildren();
    if (!isOverview) {
      if (module.html) view.innerHTML = module.html;
      else {
        const source = content.querySelector(module.source);
        if (source) {
          const detail = source.cloneNode(true);
          detail.removeAttribute('id');
          detail.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
          view.append(detail);
        }
      }
    }
    nav.querySelectorAll('a').forEach((link) => {
      const active = link === selectedLink || (key === 'overview' && /dashboard|overview/i.test(link.textContent));
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const key = keyFor(link);
    if (!key) return;
    event.preventDefault();
    showModule(key, link);
  });

  content.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.closest('.side-nav')) return;
    const key = keyFor(link);
    if (!key) return;
    event.preventDefault();
    showModule(key, nav.querySelector(`a[href="#${key}"]`) || null);
  });

  // Dashboard navigation stays in this dashboard; unavailable destinations use the 404 page.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented) return;
    const destination = new URL(link.href, location.href);
    if (destination.pathname === location.pathname && !destination.hash) return;
    if (destination.hash && link.closest('.dash')) {
      event.preventDefault();
      location.href = '404.html';
      return;
    }
    if (!destination.pathname.endsWith('/404.html') && !destination.pathname.endsWith('404.html')) {
      event.preventDefault();
      location.href = '404.html';
    }
  });
})();
