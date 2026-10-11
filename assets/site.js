(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const mobile = window.matchMedia('(max-width: 780px)');
  if (header && menu && nav) {
    const closeMenu = (restoreFocus = false) => {
      header.classList.remove('menu-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'Menu';
      if (restoreFocus) menu.focus();
    };
    header.classList.add('menu-ready');
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      header.classList.toggle('menu-open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close' : 'Menu';
      if (open) nav.querySelector('a').focus();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      closeMenu();
      // Same-page destinations receive focus after the disclosure closes.
      const url = new URL(link.href);
      if (url.pathname === location.pathname && url.hash) {
        const target = document.querySelector(url.hash);
        if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
      }
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    header.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!header.contains(document.activeElement)) closeMenu();
      });
    });
    mobile.addEventListener('change', () => closeMenu());
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // There is no email collection or success message without a real provider link.
  try {
    const newsletter = new URL(config.newsletterUrl);
    if (newsletter.protocol === 'https:') {
      document.querySelectorAll('[data-newsletter-link]').forEach(link => { link.href = newsletter.href; });
      document.querySelectorAll('[data-newsletter-ready]').forEach(node => { node.hidden = false; });
      document.querySelectorAll('[data-newsletter-pending]').forEach(node => { node.hidden = true; });
    }
  } catch { /* The honest, static pending state remains visible. */ }
  const email = typeof config.partnershipEmail === 'string' ? config.partnershipEmail.trim() : '';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelectorAll('[data-partnership-email]').forEach(link => {
      link.href = `mailto:${email}?subject=${encodeURIComponent('Partnership inquiry for Digital Tilda')}`;
    });
    document.querySelectorAll('[data-contact-email]').forEach(link => { link.href = `mailto:${email}`; });
    document.querySelectorAll('[data-email-label]').forEach(node => { node.textContent = email; });
  }

  const tabs = [...document.querySelectorAll('.prompt-tabs [role="tab"]')];
  const panels = [...document.querySelectorAll('.prompt-panel')];
  const copy = document.querySelector('.copy-button');
  const status = document.querySelector('.copy-status');
  let active = 0;
  const selectTab = (index, focus = false) => {
    active = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
    if (status) status.textContent = 'Make the details yours before you use it.';
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
    });
  });
  if (tabs.length) selectTab(0);
  if (copy) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const index = active;
      const prompt = panels[index].querySelector('.prompt-text');
      const text = prompt.textContent.trim();
      let copied = false;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(prompt);
        selection.removeAllRanges(); selection.addRange(range);
        try { copied = document.execCommand('copy'); } catch { /* Leave selected for manual copy. */ }
        if (copied) selection.removeAllRanges();
      }
      if (index === active) status.textContent = copied ? 'Copied! Paste it into your AI chat.' : 'Select the prompt and press Ctrl+C or ⌘C to copy.';
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-button');
  let motionPaused = false;
  let observer;
  const revealAnimations = new Set();
  const stopReveals = () => {
    observer?.disconnect();
    revealAnimations.forEach(animation => animation.cancel());
    revealAnimations.clear();
  };
  const observeReveals = () => {
    if (reducedMotion.matches || motionPaused || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.getBoundingClientRect().top > 90) {
          const animation = entry.target.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}], {duration:550,easing:'cubic-bezier(.2,.65,.3,1)'});
          revealAnimations.add(animation);
          animation.onfinish = () => revealAnimations.delete(animation);
        }
        observer.unobserve(entry.target);
      });
    }, {threshold:.08});
    document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
  };
  if (motionButton) {
    motionButton.hidden = reducedMotion.matches;
    motionButton.addEventListener('click', () => {
      motionPaused = !motionPaused;
      document.body.classList.toggle('motion-paused', motionPaused);
      motionButton.setAttribute('aria-pressed', String(motionPaused));
      motionButton.setAttribute('aria-label', motionPaused ? 'Resume motion' : 'Pause motion');
      motionButton.textContent = motionPaused ? '▶' : 'Ⅱ';
      if (motionPaused) stopReveals(); else observeReveals();
    });
  }
  reducedMotion.addEventListener('change', () => {
    stopReveals();
    if (motionButton) motionButton.hidden = reducedMotion.matches;
    observeReveals();
  });
  observeReveals();
})();
