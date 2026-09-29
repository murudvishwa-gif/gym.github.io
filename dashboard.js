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
    attendance: { title: 'Attendance', description: 'Check-ins and club attendance at a glance.', html: '<div class="card support-detail"><h2>Attendance summary</h2><p>186 member check-ins have been recorded today. Peak traffic is between 5:00 PM and 7:00 PM.</p><div class="progress-row"><div class="progress-meta"><span>Weekly attendance target</span><b>82%</b></div><div class="track"><div class="fill" style="width:82%"></div></div></div></div>' },
    membership: { title: 'Membership', description: 'Your plan, renewal date and membership benefits.', html: '<div class="card support-detail"><h2>Peak plan</h2><p>Your membership is active and renews on 18 October. Your plan includes unlimited gym access, group classes and one monthly coach check-in.</p><div class="support-contact"><a href="services.html">Explore member benefits</a></div></div>' },
    support: { title: 'Support', description: 'Get help from the Stackly club team.', html: '<div class="card support-detail"><h2>How can we help?</h2><p>Our team can help with your membership, bookings, account, and club access.</p><div class="support-contact"><a href="404.html">Contact the club team</a><a href="404.html">hello@stackly.club</a><a href="404.html">+91 98765 43210</a></div></div>' }
  };

  // Keep six useful destinations available in each dashboard workspace.
  const extraModule = isAdmin ? 'attendance' : 'membership';
  if (!nav.querySelector(`[href="#${extraModule}"]`)) {
    const link = document.createElement('a');
    link.href = `#${extraModule}`;
    link.innerHTML = `<span class="nav-icon">${isAdmin ? '✓' : '★'}</span>${isAdmin ? 'Attendance' : 'Membership'}`;
    nav.append(link);
  }

  const keyFor = (link) => {
    const label = link.textContent.trim().toLowerCase();
    const target = link.getAttribute('href') || '';
    if (/dashboard|overview/.test(label)) return 'overview';
    if (/membership/.test(label) || target === '#membership') return 'membership';
    if (/member/.test(label) || target === '#members') return 'members';
    if (/schedule/.test(label) || target === '#schedule') return 'schedule';
    if (/revenue/.test(label) || target === '#revenue') return 'revenue';
    if (/attendance/.test(label) || target === '#attendance') return 'attendance';
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

})();
