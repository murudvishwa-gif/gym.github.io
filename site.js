(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    node.nodeValue = node.nodeValue
      .replace(/Stackly/g, 'IRONCORE')
      .replace(/SSSSS/g, '★★★★★')
      .replace(/\ba(?=\d)/g, '₹');
  });
  const supportSymbols = ['🏋', '◷', '✚', '♟'];
  document.querySelectorAll('.benefits .symbol').forEach((symbol, index) => {
    if (!symbol.textContent.trim() || symbol.textContent.trim() === '"') symbol.textContent = supportSymbols[index % supportSymbols.length];
  });

  const footer = document.querySelector('footer');
  if (footer) {
    const footerLogo = footer.querySelector('.logo');
    if (footerLogo) {
      footerLogo.style.backgroundImage = 'none';
      footerLogo.style.width = '155px';
      footerLogo.style.fontSize = '31px';
      footerLogo.setAttribute('aria-label', 'IRONCORE home');
    }

    const socials = footer.querySelector('.socials');
    if (socials) {
      const icons = [['f', 'Facebook'], ['◎', 'Instagram'], ['𝕏', 'X'], ['▶', 'YouTube']];
      socials.setAttribute('aria-label', 'Follow IRONCORE on social media');
      socials.querySelectorAll('a').forEach((link, index) => {
        const [icon, name] = icons[index];
        link.textContent = icon;
        link.href = '#';
        link.title = `Follow us on ${name}`;
        link.setAttribute('aria-label', `Follow us on ${name}`);
        link.addEventListener('click', (event) => {
          event.preventDefault();
          notify(`${name} updates are coming soon.`);
        });
      });
      if (!footer.querySelector('.footer-follow')) {
        const label = document.createElement('p');
        label.className = 'footer-follow';
        label.textContent = 'Follow the club';
        label.style.cssText = 'margin:18px 0 -10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#fff';
        socials.before(label);
      }
    }

    const destinations = {
      'Supplements': '#shop', 'Training Gear': '#shop', 'Activewear': '#shop', 'Recovery': 'services.html',
      'Memberships': 'contact.html', 'Personal Training': 'services.html', 'Classes': 'services.html', 'Find a Location': 'contact.html',
      'Contact Us': 'contact.html', 'Shipping & Returns': '#shop', 'FAQ': 'contact.html',
      'About Us': 'about.html', 'Services': 'services.html', 'Blog': 'blog.html'
    };
    footer.querySelectorAll('li').forEach((item) => {
      const label = item.textContent.trim();
      if (!destinations[label] || item.querySelector('a')) return;
      const link = document.createElement('a');
      link.href = destinations[label];
      link.textContent = label;
      item.replaceChildren(link);
    });

    const email = footer.querySelector('.newsletter input');
    if (email) {
      email.type = 'email';
      email.setAttribute('aria-label', 'Email address for club news');
      email.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        if (!email.checkValidity()) return email.reportValidity();
        notify('You’re on the list — check your inbox for your member offer.');
        email.value = '';
      });
      const subscribe = footer.querySelector('.newsletter b');
      if (subscribe) {
        subscribe.textContent = '→';
        subscribe.setAttribute('role', 'button');
        subscribe.setAttribute('tabindex', '0');
        subscribe.setAttribute('aria-label', 'Subscribe to club news');
        const submitNewsletter = () => {
          if (!email.checkValidity()) return email.reportValidity();
          notify('You’re on the list — check your inbox for your member offer.');
          email.value = '';
        };
        subscribe.addEventListener('click', submitNewsletter);
        subscribe.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); submitNewsletter(); }
        });
      }
    }
  }

  const notify = (message) => {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      toast.setAttribute('role', 'status');
      toast.style.cssText = 'position:fixed;right:22px;bottom:22px;z-index:20;max-width:330px;background:#111;color:#fff;border-left:4px solid #cdfc3d;padding:14px 18px;font:13px sans-serif;box-shadow:0 12px 30px rgba(0,0,0,.22)';
      document.body.append(toast);
    }
    toast.textContent = message;
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.remove(), 3500);
  };

  const loginForm = location.pathname.endsWith('login.html') ? document.querySelector('form') : null;
  if (loginForm && !loginForm.querySelector('[name="role"]')) {
    const roles = document.createElement('fieldset');
    roles.style.cssText = 'grid-column:span 2;border:0;padding:0;margin:0';
    roles.innerHTML = '<legend style="font-size:12px;font-weight:700;margin-bottom:9px">Continue as</legend><div style="display:flex;gap:10px"><label style="border:1px solid #e3e7e0;padding:10px 12px;font-size:12px;cursor:pointer;flex:1"><input type="radio" name="role" value="user" checked> Member</label><label style="border:1px solid #e3e7e0;padding:10px 12px;font-size:12px;cursor:pointer;flex:1"><input type="radio" name="role" value="admin"> Administrator</label></div>';
    loginForm.querySelector('input[type="password"]')?.after(roles);
  }

  const navigation = document.querySelector('nav .wrap');
  const navLinks = navigation?.querySelector('.navlinks, .links');
  if (navigation && navLinks && !navigation.querySelector('.mobile-nav-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    toggle.style.cssText = 'display:none;margin-left:auto;width:42px;height:42px;border:1px solid #dce0da;background:#fff;font-size:21px;cursor:pointer';
    navigation.append(toggle);
    const compact = window.matchMedia(`(max-width: ${navLinks.classList.contains('navlinks') ? 950 : 760}px)`);
    const renderMobileNav = () => {
      if (!compact.matches) {
        toggle.style.display = 'none';
        navLinks.style.cssText = '';
        navigation.style.height = '';
        navigation.style.minHeight = '';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
        return;
      }
      toggle.style.display = 'block';
      navigation.style.height = 'auto';
      navigation.style.minHeight = '76px';
      if (toggle.getAttribute('aria-expanded') !== 'true') navLinks.style.display = 'none';
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.textContent = open ? '×' : '☰';
      navLinks.style.cssText = open ? 'display:flex;order:4;flex-basis:100%;flex-wrap:wrap;gap:0;padding:8px 0 2px' : 'display:none';
      if (open) navLinks.querySelectorAll('a').forEach((link) => {
        link.style.cssText = 'padding:12px 4px;flex:0 0 50%;font-size:12px';
      });
    });
    compact.addEventListener('change', renderMobileNav);
    renderMobileNav();
  }

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (form === loginForm) {
        const role = form.querySelector('[name="role"]:checked')?.value || 'user';
        window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
        return;
      }
      notify(form.closest('#contact-form') ? 'Thanks — your message has been received. We’ll be in touch soon.' : 'Thanks! Your details have been saved.');
      form.reset();
    });
    form.querySelectorAll('button[type="button"]').forEach((button) => { button.type = 'submit'; });
  });

  document.querySelectorAll('.quick').forEach((button) => {
    button.setAttribute('role', 'button'); button.setAttribute('tabindex', '0');
    const add = () => notify('Added to your cart.');
    button.addEventListener('click', add);
    button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); add(); } });
  });

  const search = document.querySelector('.search');
  if (search) {
    const runSearch = () => {
      const query = search.querySelector('input').value.trim();
      if (!query) return notify('Enter a product or service to search.');
      document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      notify(`Showing popular results for “${query}”.`);
    };
    search.querySelector('button').addEventListener('click', runSearch);
    search.querySelector('input').addEventListener('keydown', (event) => { if (event.key === 'Enter') runSearch(); });
  }
})();
