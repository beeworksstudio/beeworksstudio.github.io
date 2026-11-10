(() => {
  const page = document.querySelector('[data-section-reveals]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!page || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (!reducedMotion.matches && !entry.target.contains(document.activeElement)) {
        entry.target.classList.add('is-revealing');
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });

  page.querySelectorAll(':scope > section:not(.hero)').forEach(section => observer.observe(section));
})();
