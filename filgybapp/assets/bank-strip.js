const strip = document.querySelector('.bank-strip');
if (strip) {
  for (const group of strip.querySelectorAll('.bank-strip-group')) {
    const copy = group.cloneNode(true);
    copy.classList.add('bank-strip-copy');
    copy.setAttribute('aria-hidden', 'true');
    group.after(copy);
  }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  function syncMotion() {
    strip.classList.toggle('is-moving', !preference.matches);
  }
  preference.addEventListener('change', syncMotion);
  new IntersectionObserver(([entry]) => strip.classList.toggle('is-visible', entry.isIntersecting)).observe(strip);
  syncMotion();
}
