document.querySelectorAll('[data-dashboard-action]').forEach((button) => button.addEventListener('click', () => {
  button.textContent = 'Saved';
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
    membership: { title: 'Membership', description: 'Your plan, renewal date and membership benefits.', html: '<div class="card support-detail"><h2>Peak plan</h2><p>Your membership is active and renews on 18 October. Your plan includes unlimited gym access, group classes and one monthly coach check-in.</p><div class="support-contact"><a href="services.html">Explore member benefits</a></div></div>' },
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
    members: [['New this week', '24 joined', 'New member sign-ups are up compared with last week.'], ['Plan mix', 'Peak is most popular', 'Review plan distribution when planning upcoming classes.'], ['Follow-ups', '12 renewals due', 'Contact members whose renewals are coming up.']],
    schedule: [['Studio A', '2 places left', 'The evening HIIT session is close to capacity.'], ['Coach appointment', 'Monday  -  7:15 PM', 'Your next coach check-in is with Arjun.'], ['Bring along', 'Water and a towel', 'Arrive a few minutes before your session starts.']],
    revenue: [['Memberships', 'INR 6.18L', 'Membership payments make up most of the current revenue.'], ['Personal training', 'INR 1.42L', 'Coaching bookings contributed to this month total.'], ['Class bookings', 'INR 82K', 'Group class bookings remain steady this week.']],
    progress: [['Strength', '3 of 4 sessions', 'You are one strength session away from the weekly target.'], ['Cardio', '95 of 120 min', 'Add 25 minutes of cardio to meet your weekly plan.'], ['Recovery', '1 of 2 sessions', 'Schedule a recovery session to balance your training.']],
    classes: [['Strength foundations', 'Today  -  6:30 PM', 'Studio A  -  Coach Arjun  -  Booking confirmed.'], ['Mobility reset', 'Saturday  -  9:00 AM', 'Recovery room  -  Bring comfortable movement clothes.'], ['Waitlist', '2 spots available', 'Check the booking list for newly available spaces.']],
    attendance: [['Busiest hour', '6:00-7:00 PM', 'Plan front desk coverage for the evening rush.'], ['Morning check-ins', '54 members', 'Morning attendance is highest between 7:00 and 9:00 AM.'], ['Quiet period', '2:00-4:00 PM', 'Use this time for equipment checks and floor maintenance.']],
    membership: [['Gym access', 'Unlimited', 'Visit during staffed hours at your home club.'], ['Group classes', 'Included', 'Book available classes through the schedule.'], ['Coach check-in', '1 per month', 'Use your monthly appointment to review your training plan.']],
    support: [['Club hours', '6:00 AM-10:00 PM', 'The front desk team is available during regular club hours.'], ['Response time', 'Within one business day', 'Include your membership email when contacting support.'], ['Visit the team', 'Front desk', 'For urgent access issues, speak with staff at the club.']]
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
    } else view.classList.remove('dashboard-module-layout');
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

  const topnav = document.querySelector('.topnav');
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.mobile-menu-toggle') || document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'mobile-menu-toggle';
  menuButton.setAttribute('aria-label', 'Open dashboard menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<span></span><span></span><span></span>';
  if (!menuButton.isConnected) topnav?.prepend(menuButton);

  const menuIntro = document.createElement('div');
  menuIntro.className = 'dashboard-menu-intro';
  menuIntro.innerHTML = '<span>STACKLY</span><small>TRAIN WITH PURPOSE</small>';
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
