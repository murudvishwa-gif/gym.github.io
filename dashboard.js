document.querySelectorAll('.dash-footer').forEach((footer) => footer.remove());

document.querySelectorAll('[data-dashboard-action]').forEach((button) => button.addEventListener('click', () => {
  const current = new URL(location.href);
  current.searchParams.set('section', document.querySelector('.side-nav a.active')?.getAttribute('href')?.slice(1) || 'overview');
  sessionStorage.setItem('dashboard-return', current.pathname + current.search);
  location.href = '404.html?from=dashboard';
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
  const overviewPanel = document.createElement('section');
  overviewPanel.className = 'dashboard-chart-panel';
  const chartValues = isAdmin ? [48, 63, 56, 72, 65, 88, 76] : [42, 68, 51, 84, 63, 92, 70];
  const chartTitle = isAdmin ? 'Daily check-ins' : 'Training activity';
  const chartBars = chartValues.map((value, index) => `<div class="trend-column"><i class="trend-bar" style="--bar-height:${value}%"></i><span>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span></div>`).join('');
  overviewPanel.innerHTML = `<article class="card trend-card"><div class="card-top"><h2>${chartTitle}</h2><span class="trend-period">Last 7 days</span></div><div class="trend-chart" role="img" aria-label="${chartTitle} over the last seven days">${chartBars}</div></article>`;
  if (dashboardGrid) dashboardGrid.after(overviewPanel);
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
    membership: { title: 'Membership', description: 'Your plan, renewal date and membership benefits.', html: '<div class="card support-detail"><h2>Peak plan</h2><p>Your membership is active and renews on 18 October. Your plan includes unlimited gym access, group classes and one monthly coach check-in.</p><div class="support-contact"><a href="404.html">Explore member benefits</a></div></div>' },
    support: { title: 'Support', description: 'Get help from the Stackly club team.', html: '<div class="card support-detail"><h2>How can we help?</h2><p>Our team can help with your membership, bookings, account, and club access.</p><div class="support-contact"><a href="404.html">Contact the club team</a><a href="404.html">hello@stackly.club</a><a href="404.html">+91 98765 43210</a></div></div>' }
  };

  const moduleDetails = {
    members: [['Member snapshot', '1,284 active members', 'Memberships are up 8.6% this month.'], ['Needs attention', '12 renewals due', 'Review upcoming renewals and pending payment updates.']],
    schedule: [['Next session', isAdmin ? 'HIIT  -  6:30 PM' : 'Strength foundations  -  6:30 PM', 'Check the class capacity and arrive a few minutes early.'], ['This week', '8 sessions listed', 'Your upcoming sessions and coaching appointments are shown here.']],
    revenue: [['This month', 'INR 8.42L', 'Revenue is up 6.2% compared with last month.'], ['Recent trend', '7 day overview', 'Use the chart to compare daily performance across the week.']],
    progress: [['Weekly target', '4 of 5 workouts', 'One more workout will complete your weekly target.'], ['Training plan', 'Strength  -  Cardio  -  Recovery', 'Keep a balanced mix of training and recovery sessions.']],
    classes: [['Recommended', 'Mobility reset', 'A recovery focused session to complement your strength training.'], ['Booking reminder', 'Review your schedule', 'Check the class time and studio before you head in.']],
    attendance: [['Today', '186 check-ins', 'Peak traffic is between 5:00 PM and 7:00 PM.'], ['Weekly target', '82% reached', 'Attendance is tracking well against the weekly target.']],
    membership: [['Current plan', 'Peak  -  Active', 'Includes unlimited gym access and group classes.'], ['Renewal', '18 October', 'Your membership is active. Contact the team if you need to update your plan.']],
    support: [['Membership help', 'Plans and renewals', 'Get help with your membership, billing, or account details.'], ['Bookings help', 'Classes and coaching', 'Ask the team about class bookings, schedules, or coach appointments.']]
  };

  const extraDetails = {
    members: [['New this week', '24 joined', 'New member sign-ups are up compared with last week.'], ['Plan mix', 'Peak is most popular', 'Review plan distribution when planning upcoming classes.'], ['Follow-ups', '12 renewals due', 'Contact members whose renewals are coming up.'], ['Member satisfaction', '4.8 / 5', 'Recent feedback is positive across coaching and facilities.']],
    schedule: [['Studio A', '2 places left', 'The evening HIIT session is close to capacity.'], ['Coach appointment', 'Monday  -  7:15 PM', 'Your next coach check-in is with Arjun.'], ['Bring along', 'Water and a towel', 'Arrive a few minutes before your session starts.'], ['Next available', 'Tomorrow  -  8:00 AM', 'A morning strength session has open spaces.']],
    revenue: [['Memberships', 'INR 6.18L', 'Membership payments make up most of the current revenue.'], ['Personal training', 'INR 1.42L', 'Coaching bookings contributed to this month total.'], ['Class bookings', 'INR 82K', 'Group class bookings remain steady this week.'], ['Renewal outlook', '93% expected', 'Most upcoming renewals are on track this month.']],
    progress: [['Strength', '3 of 4 sessions', 'You are one strength session away from the weekly target.'], ['Cardio', '95 of 120 min', 'Add 25 minutes of cardio to meet your weekly plan.'], ['Recovery', '1 of 2 sessions', 'Schedule a recovery session to balance your training.'], ['Personal best', '+8% this month', 'Your logged strength is trending upward.']],
    classes: [['Strength foundations', 'Today  -  6:30 PM', 'Studio A  -  Coach Arjun  -  Booking confirmed.'], ['Mobility reset', 'Saturday  -  9:00 AM', 'Recovery room  -  Bring comfortable movement clothes.'], ['Waitlist', '2 spots available', 'Check the booking list for newly available spaces.'], ['Popular this week', 'HIIT circuit', 'Book early for the evening sessions.']],
    attendance: [['Busiest hour', '6:00-7:00 PM', 'Plan front desk coverage for the evening rush.'], ['Morning check-ins', '54 members', 'Morning attendance is highest between 7:00 and 9:00 AM.'], ['Quiet period', '2:00-4:00 PM', 'Use this time for equipment checks and floor maintenance.'], ['Returning members', '78% this week', 'Repeat visits are steady compared with last week.']],
    membership: [['Gym access', 'Unlimited', 'Visit during staffed hours at your home club.'], ['Group classes', 'Included', 'Book available classes through the schedule.'], ['Coach check-in', '1 per month', 'Use your monthly appointment to review your training plan.'], ['Member savings', '10% off gear', 'Show your active membership at the front desk.']],
    support: [['Club hours', '6:00 AM-10:00 PM', 'The front desk team is available during regular club hours.'], ['Response time', 'Within one business day', 'Include your membership email when contacting support.'], ['Visit the team', 'Front desk', 'For urgent access issues, speak with staff at the club.'], ['Account help', 'Profile and billing', 'Have your membership email ready for faster assistance.']]
  };

  const appendModuleCharts = (container, key) => {
    const chartNames = {
      members: ['Member growth', 'Membership mix'], schedule: ['Class bookings', 'Weekly capacity'],
      revenue: ['Daily revenue', 'Revenue sources'], progress: ['Weekly activity', 'Training balance'],
      classes: ['Class attendance', 'Weekly availability'], attendance: ['Daily check-ins', 'Visit patterns'],
      membership: ['Training consistency', 'Plan benefits'], support: ['Support topics', 'Response progress']
    }[key] || ['Weekly activity', 'Progress breakdown'];
    const values = key === 'revenue' ? [38, 54, 47, 72, 63, 88, 76] : [42, 68, 51, 84, 63, 92, 70];
    const chartBars = values.map((value, index) => `<div class="trend-column"><i class="trend-bar" style="--bar-height:${value}%"></i><span>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span></div>`).join('');
    const chart = document.createElement('article');
    chart.className = 'card module-chart-card';
    chart.innerHTML = `<div class="card-top"><h2>${chartNames[0]}</h2><span class="trend-period">Last 7 days</span></div><div class="trend-chart" role="img" aria-label="${chartNames[0]} for the last seven days">${chartBars}</div>`;
    container.append(chart);

    const breakdown = document.createElement('article');
    breakdown.className = 'card module-chart-card';
    breakdown.innerHTML = `<div class="card-top"><h2>${chartNames[1]}</h2><span class="trend-period">This week</span></div><div class="progress-row"><div class="progress-meta"><span>Primary target</span><b>78%</b></div><div class="track"><div class="fill" style="width:78%"></div></div></div><div class="progress-row"><div class="progress-meta"><span>Weekly average</span><b>64%</b></div><div class="track"><div class="fill" style="width:64%;background:#3874ff"></div></div></div><div class="progress-row"><div class="progress-meta"><span>Previous week</span><b>52%</b></div><div class="track"><div class="fill" style="width:52%;background:#ff8e42"></div></div></div>`;
    container.append(breakdown);
  };

  // Keep six useful destinations available in each dashboard workspace.
  const extraModule = isAdmin ? 'attendance' : 'membership';
  if (!nav.querySelector(`[href="#${extraModule}"]`)) {
    const link = document.createElement('a');
    link.href = `#${extraModule}`;
    link.innerHTML = `<span class="nav-icon">${isAdmin ? 'A' : 'M'}</span>${isAdmin ? 'Attendance' : 'Membership'}`;
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
    overviewPanel.hidden = !isOverview;
    if (stats) stats.hidden = !isOverview;
    if (dashboardGrid) dashboardGrid.hidden = !isOverview;
    const gallery = content.querySelector('.club-gallery');
    if (gallery) gallery.hidden = !isOverview;
    view.hidden = isOverview;
    view.replaceChildren();
    if (!isOverview) {
      view.classList.add('dashboard-module-layout');
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
      (moduleDetails[key] || []).forEach(([titleText, metricText, bodyText]) => {
        const card = document.createElement('article');
        card.className = 'card module-detail-card';
        const titleEl = document.createElement('h2');
        titleEl.textContent = titleText;
        const metricEl = document.createElement('div');
        metricEl.className = 'metric';
        metricEl.textContent = metricText;
        const bodyEl = document.createElement('p');
        bodyEl.textContent = bodyText;
        card.append(titleEl, metricEl, bodyEl);
        view.append(card);
      });
      (extraDetails[key] || []).forEach(([titleText, metricText, bodyText]) => {
        const card = document.createElement('article');
        card.className = 'card module-detail-card';
        card.innerHTML = `<h2>${titleText}</h2><div class="metric">${metricText}</div><p>${bodyText}</p>`;
        view.append(card);
      });
      appendModuleCharts(view, key);
    } else view.classList.remove('dashboard-module-layout');
    nav.querySelectorAll('a').forEach((link) => {
      const active = link === selectedLink || (key === 'overview' && /dashboard|overview/i.test(link.textContent));
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const url = new URL(location.href);
    if (key === 'overview') url.searchParams.delete('section');
    else url.searchParams.set('section', key);
    history.replaceState({ dashboardSection: key }, '', url.pathname + url.search);
  };

  const initialSection = new URLSearchParams(location.search).get('section');
  if (initialSection && modules[initialSection]) showModule(initialSection, nav.querySelector(`[href="#${initialSection}"]`));

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

  const topnav = document.querySelector('.topnav');
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.mobile-menu-toggle') || document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'mobile-menu-toggle';
  menuButton.setAttribute('aria-label', 'Open dashboard menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<span></span><span></span><span></span>';
  if (!menuButton.isConnected) topnav?.prepend(menuButton);

  const sidebarBrand = sidebar?.querySelector('.dash-brand');
  if (topnav && sidebarBrand && !topnav.querySelector('.mobile-dashboard-brand')) {
    const mobileBrand = sidebarBrand.cloneNode(true);
    mobileBrand.classList.add('mobile-dashboard-brand');
    mobileBrand.href = location.pathname;
    mobileBrand.setAttribute('aria-label', `Stackly logo - ${isAdmin ? 'admin' : 'member'} dashboard overview`);
    mobileBrand.dataset.homeLabel = mobileBrand.getAttribute('aria-label');
    topnav.insertBefore(mobileBrand, topnav.querySelector('.crumb'));
  }

  const menuIntro = document.createElement('div');
  menuIntro.className = 'dashboard-menu-intro';
  menuIntro.innerHTML = `<a class="dashboard-menu-home" href="${location.pathname}" aria-label="Stackly logo - dashboard overview"><img src="assets/logo-dark.webp" alt="Stackly"></a>`;
  nav.before(menuIntro);

  const signOut = document.createElement('a');
  signOut.className = 'dashboard-signout';
  signOut.href = 'login.html';
  signOut.textContent = 'Sign out';
  nav.after(signOut);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'dashboard-menu-close';
  closeButton.textContent = 'X';
  closeButton.setAttribute('aria-label', 'Close dashboard menu');
  sidebar?.prepend(closeButton);

  const closeMenu = () => {
    document.body.classList.remove('mobile-menu-open');
    sidebar?.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open dashboard menu');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    document.body.classList.toggle('mobile-menu-open', isOpen);
    sidebar?.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close dashboard menu' : 'Open dashboard menu');
  });
  closeButton.addEventListener('click', closeMenu);
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

})();
