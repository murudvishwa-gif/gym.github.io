(() => {
  const missing = '404.html';

  // Keep the required Stackly identity consistent, including legacy page markup.
  document.querySelectorAll('.logo, .dash-brand').forEach((logo) => {
    logo.href = /dashboard/.test(location.pathname) ? location.pathname : 'index.html';
    logo.setAttribute('aria-label', 'Stackly home');
    const image = document.createElement('img');
    image.src = 'assets/logo-dark.webp';
    image.alt = 'Stackly';
    logo.replaceChildren(image);
  });
  document.querySelectorAll('title').forEach((title) => { title.textContent = title.textContent.replace(/IRONCORE/gi, 'Stackly'); });
  document.querySelectorAll('body *:not(script):not(style)').forEach((el) => {
    if (el.children.length === 0 && el.textContent) el.textContent = el.textContent.replace(/IRONCORE|IRONCORE GYM & HEALTH CLUB/gi, 'Stackly');
  });

  if (/user-dashboard|admin-dashboard/.test(location.pathname)) {
    let email = '';
    try { email = localStorage.getItem('stacklyLoginEmail') || ''; } catch {}
    if (email) {
      const username = email.split('@')[0];
      const accountName = document.querySelector('.account b');
      const greeting = document.querySelector('.heading h1');
      const avatar = document.querySelector('.avatar');
      if (accountName) accountName.textContent = email;
      if (greeting && /user-dashboard/.test(location.pathname)) greeting.textContent = `Good morning, ${username}`;
      if (avatar) {
        const initials = username.split(/[._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
        avatar.textContent = initials || username.slice(0, 2).toUpperCase();
      }
    }
  }

  if (/^\/$|index|about|services|blog|contact/.test(location.pathname)) {
    const footer = document.querySelector('body > footer');
    if (footer) footer.innerHTML = `
      <div class="wrap footergrid">
        <div class="footer-brand"><a class="logo" href="index.html" aria-label="Stackly home"><img src="assets/logo-dark.webp" alt="Stackly"></a>
          <p>Move with purpose. Build strength. Feel your best.</p>
          <div class="socials" aria-label="Stackly social media">
            <a href="404.html" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z"/></svg></a>
            <a href="404.html" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.7" cy="6.7" r="1.2" fill="currentColor"/></svg></a>
            <a href="404.html" aria-label="X" title="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" stroke-width="2.4"/></svg></a>
            <a href="404.html" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.5v-7l6 3.5z"/></svg></a>
          </div>
        </div>
        <div><h5>Explore</h5><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul></div>
        <div><h5>The Club</h5><ul><li><a href="404.html">Memberships</a></li><li><a href="services.html">Personal Training</a></li><li><a href="services.html">Classes</a></li><li><a href="contact.html">Find a Location</a></li></ul></div>
        <div><h5>Need help?</h5><ul><li><a href="contact.html">Contact Us</a></li><li><a href="404.html">Shipping &amp; Returns</a></li><li><a href="contact.html">FAQ</a></li><li><a href="tel:+919876543210">Call +91 98765 43210</a></li></ul></div>
      <div><h5>Legal</h5><ul><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms &amp; Conditions</a></li></ul></div></div><div class="wrap copyright">� 2026 STACKLY. ALL RIGHTS RESERVED. &nbsp; | &nbsp; <a href="privacy.html">Privacy Policy</a> &nbsp; | &nbsp; <a href="terms.html">Terms &amp; Conditions</a></div>`;
  }

  // Use one identical public header on the four information pages.
  if (/about|services|blog|contact/.test(location.pathname)) {
    const top = document.querySelector('body > .top');
    const nav = document.querySelector('body > nav');
    const wrap = nav?.querySelector('.wrap');
    const logo = wrap?.querySelector('.logo')?.cloneNode(true);
    if (top) top.innerHTML = '<div class="wrap"><span>WELCOME TO STACKLY</span><b>TRAIN WITH PURPOSE</b><span>+91 98765 43210</span></div>';
    if (wrap && logo) {
      const current = location.pathname.split('/').pop().replace('.html', '');
      wrap.replaceChildren(logo);
      const links = document.createElement('div');
      links.className = 'links';
      [['index.html', 'HOME'], ['about.html', 'ABOUT US'], ['services.html', 'SERVICES'], ['blog.html', 'BLOG'], ['contact.html', 'CONTACT']].forEach(([href, label]) => {
        const link = document.createElement('a'); link.href = href; link.textContent = label;
        if (href === `${current}.html`) link.className = 'active';
        links.append(link);
      });
      const auth = document.createElement('div'); auth.className = 'auth';
      auth.innerHTML = '<a class="login" href="login.html">LOGIN</a><a class="signup" href="signup.html">SIGN UP</a>';
      wrap.append(links, auth);
    }
  }

  // Inert placeholder links and controls all lead to the site's 404 page.
  document.querySelectorAll('a[href="#"]').forEach((link) => { link.href = missing; });
  document.querySelectorAll('.socials a, a[aria-label^="Facebook"], a[aria-label^="Instagram"], a[aria-label="X"], a[aria-label^="YouTube"]').forEach((link) => { link.href = missing; });
  document.querySelectorAll('[data-dashboard-action], .quick').forEach((control) => {
    if (control.tagName === 'A') control.href = missing;
    else {
      control.setAttribute('role', 'link');
      control.setAttribute('tabindex', '0');
      control.addEventListener('click', () => { location.href = missing; });
      control.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') location.href = missing; });
    }
  });

  // Supply the same Stackly social links and footer destinations on every page.
  document.querySelectorAll('footer').forEach((footer) => {
    if (!footer.querySelector('.logo')) {
      const grid = document.createElement('div');
      grid.className = 'wrap footergrid';
      grid.innerHTML = '<div><a class="logo" href="index.html" aria-label="Stackly home"><img src="assets/logo-dark.webp" alt="Stackly"></a><p>Move with purpose. Build strength. Feel your best.</p></div><div><h4>Explore</h4><ul><li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="blog.html">Blog</a></li></ul></div><div><h4>Visit</h4><ul><li><a href="contact.html">Contact Us</a></li><li><a href="404.html">Memberships</a></li></ul></div>';
      footer.prepend(grid);
    }
    const destinations = { 'About Us': 'about.html', Services: 'services.html', Blog: 'blog.html', 'Contact Us': 'contact.html', 'Find a Club': 'contact.html', 'Memberships': '404.html', 'Personal Training': 'services.html', Classes: 'services.html', 'Supplements': '404.html', 'Training Gear': '404.html', Activewear: '404.html', Recovery: 'services.html', FAQ: 'contact.html', 'Shipping & Returns': '404.html' };
    footer.querySelectorAll('li').forEach((item) => {
      if (item.querySelector('a')) return;
      const label = item.textContent.trim();
      const link = document.createElement('a'); link.href = destinations[label] || missing; link.textContent = label;
      item.replaceChildren(link);
    });
    if (!footer.querySelector('.socials')) {
      const links = document.createElement('div');
      links.className = 'socials';
      links.setAttribute('aria-label', 'Stackly social media');
      links.innerHTML = '<a href="404.html" aria-label="Facebook">f</a><a href="404.html" aria-label="Instagram">◎</a><a href="404.html" aria-label="X">𝕏</a><a href="404.html" aria-label="YouTube">▶</a>';
      footer.querySelector('.footergrid > div')?.append(links);
    }
  });

  const imagePool = [
    'assets/1518611012118-696072aa579a.webp',
    'assets/1538805060514-97d9cc17730c.webp',
    'assets/1571019614242-c5c5dee9f50b.webp',
    'assets/1599058917212-d750089bc07e.webp'
  ];
  if (!/login|signup|404|dashboard/.test(location.pathname)) {
    document.querySelectorAll('main .card:not(.admin-feature)').forEach((card, index) => {
      if (index > 3 || card.querySelector('img')) return;
      const image = document.createElement('img');
      image.className = 'card-image';
      image.src = imagePool[index % imagePool.length];
      image.alt = 'Stackly training and wellness';
      image.loading = 'lazy';
      card.prepend(image);
    });
  } else if (/dashboard/.test(location.pathname)) {
    const content = document.querySelector('.dash .content');
    if (content) {
      const gallery = document.createElement('section');
      gallery.className = 'club-gallery';
      gallery.innerHTML = '<div class="card-top"><h2>Inside Stackly</h2><a href="404.html">Explore the club</a></div><div class="club-gallery-grid"></div>';
      imagePool.slice(0, 3).forEach((src) => {
        const image = document.createElement('img'); image.src = src; image.alt = 'Stackly gym training space'; image.loading = 'lazy';
        gallery.querySelector('.club-gallery-grid').append(image);
      });
      content.append(gallery);
    }
  }

  // Reveal content as it enters the viewport, with a reduced-motion fallback.
  const revealItems = document.querySelectorAll('main section, .hero, .hero-grid, .benefits, .split-promos, .dealbar, .dash-grid > *, .stats > *');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => { item.classList.add('reveal'); observer.observe(item); });
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (location.pathname.endsWith('login.html')) {
      const role = form.querySelector('[name="role"]:checked')?.value || 'user';
      const email = form.querySelector('input[type="email"]')?.value.trim().toLowerCase() || '';
      try { if (email) localStorage.setItem('stacklyLoginEmail', email); } catch {}
      location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    }
    else { alert('Thanks! Your details have been received.'); form.reset(); }
  }));
  document.querySelectorAll('form button[type="button"]').forEach((button) => { button.type = 'submit'; });

  const pageNav = document.querySelector('body > nav .wrap');
  const pageLinks = pageNav?.querySelector('.links, .navlinks');
  if (pageNav && pageLinks) {
    const menu = document.createElement('button');
    menu.className = 'site-menu-toggle'; menu.type = 'button'; menu.textContent = '☰';
    menu.setAttribute('aria-label', 'Open navigation'); menu.setAttribute('aria-expanded', 'false');
    pageNav.append(menu);
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      pageLinks.classList.toggle('mobile-open', open);
    });
  }
})();



