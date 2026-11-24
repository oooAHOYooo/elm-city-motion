(() => {
  // Hero Video Rotation logic
  const heroVideoLayers = [...document.querySelectorAll('.hero-video-layer')];
  const heroPills = [...document.querySelectorAll('.hero-reel-pill, .loc-pill')];
  const heroLocIndicator = document.getElementById('hero-loc-tag');
  let currentHeroIndex = 0;
  let heroTimer = null;

  const setHeroVideo = (index) => {
    if (!heroVideoLayers[index]) return;
    heroVideoLayers.forEach((layer, i) => {
      const vid = layer.querySelector('video');
      if (i === index) {
        layer.classList.add('is-active');
        if (vid) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }
      } else {
        layer.classList.remove('is-active');
        if (vid) {
          setTimeout(() => {
            if (!layer.classList.contains('is-active')) vid.pause();
          }, 1200);
        }
      }
    });

    heroPills.forEach((pill, i) => {
      pill.classList.toggle('is-active', i === index);
    });

    if (heroLocIndicator && heroVideoLayers[index].dataset.label) {
      heroLocIndicator.style.opacity = '0';
      setTimeout(() => {
        heroLocIndicator.textContent = heroVideoLayers[index].dataset.label;
        heroLocIndicator.style.opacity = '1';
      }, 250);
    }
    currentHeroIndex = index;
  };

  const autoRotateHero = () => {
    if (heroVideoLayers.length <= 1) return;
    const nextIdx = (currentHeroIndex + 1) % heroVideoLayers.length;
    setHeroVideo(nextIdx);
  };

  heroVideoLayers.forEach((layer) => {
    const vid = layer.querySelector('video');
    if (vid) {
      vid.addEventListener('ended', () => {
        if (layer.classList.contains('is-active')) autoRotateHero();
      });
    }
  });

  if (heroVideoLayers.length > 1) {
    heroTimer = setInterval(autoRotateHero, 22000);
  }

  heroPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.dataset.index, 10);
      setHeroVideo(idx);
      clearInterval(heroTimer);
      heroTimer = setInterval(autoRotateHero, 22000);
    });
  });

  // Stills gallery background rotation
  const stillsBgs = [...document.querySelectorAll('.stills-bg')];
  let currentStillsIndex = 0;
  let stillsTimer = null;

  const autoRotateStills = () => {
    if (stillsBgs.length <= 1) return;
    currentStillsIndex = (currentStillsIndex + 1) % stillsBgs.length;
    stillsBgs.forEach((bg, i) => {
      bg.classList.toggle('is-active', i === currentStillsIndex);
    });
  };

  if (stillsBgs.length > 1) {
    stillsTimer = setInterval(autoRotateStills, 8000);
  }

  // Contact section photo rotation (like hero)
  const contactBgs = [...document.querySelectorAll('.contact-bg')];
  let contactIdx = 0;
  if (contactBgs.length > 1) {
    setInterval(() => {
      contactIdx = (contactIdx + 1) % contactBgs.length;
      contactBgs.forEach((bg, i) => {
        bg.classList.toggle('is-active', i === contactIdx);
      });
    }, 9500);
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
