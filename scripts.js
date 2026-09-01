(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeSections = [...document.querySelectorAll('[data-fade]')];

  if (prefersReducedMotion || typeof window.anime !== 'function') return;

  document.documentElement.classList.add('motion-ready');

  anime({
    targets: ['.hero-image', '.site-header', '.hero-meta--top', '.hero h1', '.hero-bottom'],
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
  const heroImage = document.querySelector('.hero-image');
  let frame;

  const setDepth = () => {
    const depth = Math.min(window.scrollY / (window.innerHeight * 0.82), 1);
    anime.set(title, { opacity: 1 - depth * 0.52 });
    anime.set(heroMeta, { opacity: 1 - depth * 0.7 });
    anime.set(heroImage, { opacity: 1 - depth * 0.28 });
    frame = undefined;
  };

  window.addEventListener('scroll', () => {
    if (!frame) frame = window.requestAnimationFrame(setDepth);
  }, { passive: true });
})();
