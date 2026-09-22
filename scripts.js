(() => {
  // Background switcher logic
  const heroBgs = [...document.querySelectorAll('.hero-bg')];
  const locPills = [...document.querySelectorAll('.loc-pill')];
  const locIndicator = document.getElementById('hero-loc-tag');
  let currentIndex = 0;
  let cycleTimer = null;

  const setHeroBackground = (index) => {
    if (!heroBgs[index]) return;
    heroBgs.forEach((bg, i) => {
      if (i === index) {
        bg.classList.add('is-active');
      } else {
        bg.classList.remove('is-active');
      }
    });

    locPills.forEach((pill, i) => {
      pill.classList.toggle('is-active', i === index);
    });

    if (locIndicator && heroBgs[index].dataset.label) {
      locIndicator.style.opacity = '0';
      setTimeout(() => {
        locIndicator.textContent = 'LOC: ' + heroBgs[index].dataset.label;
        locIndicator.style.opacity = '1';
      }, 200);
    }
    currentIndex = index;
  };

  locPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.dataset.index, 10);
      setHeroBackground(idx);
      clearInterval(cycleTimer);
      // Resume slow rotation after 18 seconds of inactivity
      cycleTimer = setInterval(autoRotate, 9000);
    });
  });

  const autoRotate = () => {
    const nextIdx = (currentIndex + 1) % heroBgs.length;
    setHeroBackground(nextIdx);
  };

  if (heroBgs.length > 1) {
    cycleTimer = setInterval(autoRotate, 8000);
  }

  // Animation & Depth logic
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeSections = [...document.querySelectorAll('[data-fade]')];

  if (prefersReducedMotion || typeof window.anime !== 'function') return;

  document.documentElement.classList.add('motion-ready');

  anime({
    targets: ['.hero-image', '.site-header', '.hero-meta--top', '.hero-loc-indicator', '.hero h1', '.hero-bottom'],
    opacity: (element) => element.classList.contains('hero-image') ? [0.5, 1] : [0, 1],
    delay: anime.stagger(95),
    duration: 950,
    easing: 'easeOutQuad'
  });

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      anime({ targets: entry.target, opacity: [0, 1], duration: 800, easing: 'easeOutQuad' });
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  fadeSections.forEach((section) => reveal.observe(section));

  const title = document.querySelector('.hero h1');
  const heroMeta = document.querySelector('.hero-meta--top');
  const heroLoc = document.querySelector('.hero-loc-indicator');
  const heroImage = document.querySelector('.hero-image');
  let frame;

  const setDepth = () => {
    const depth = Math.min(window.scrollY / (window.innerHeight * 0.82), 1);
    anime.set(title, { opacity: 1 - depth * 0.52 });
    anime.set(heroMeta, { opacity: 1 - depth * 0.7 });
    if (heroLoc) anime.set(heroLoc, { opacity: 1 - depth * 0.8 });
    anime.set(heroImage, { opacity: 1 - depth * 0.28 });
    frame = undefined;
  };

  window.addEventListener('scroll', () => {
    if (!frame) frame = window.requestAnimationFrame(setDepth);
  }, { passive: true });
})();
