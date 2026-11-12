'use strict';
const isArabic = document.documentElement.dir === 'rtl';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const gallery = document.querySelector('.gallery');
if (gallery?.children.length > 1) {
  const slides = Array.from(gallery.children);
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  const makeButton = (symbol, label) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = symbol;
    button.setAttribute('aria-label', label);
    return button;
  };
  const previous = makeButton(isArabic ? '→' : '←', isArabic ? 'الصورة السابقة' : 'Previous screenshot');
  const next = makeButton(isArabic ? '←' : '→', isArabic ? 'الصورة التالية' : 'Next screenshot');
  const position = document.createElement('span');
  position.className = 'gallery-position';
  position.dir = 'ltr';
  controls.append(previous, position, next);
  gallery.after(controls);

  let active = 0;
  function updatePosition() {
    const max = gallery.scrollWidth - gallery.clientWidth;
    const offset = Math.abs(gallery.scrollLeft);
    const start = slides[0].offsetLeft;
    active = max > 1 && offset >= max - 2 ? slides.length - 1 : 0;
    if (active === 0) {
      slides.forEach((slide, index) => {
        if (Math.abs(slide.offsetLeft - start) <= offset + 2) active = index;
      });
    }
    const label = `${active + 1} / ${slides.length}`;
    if (position.textContent !== label) position.textContent = label;
    previous.disabled = offset < 2;
    next.disabled = offset >= max - 2;
  }
  function step(direction) {
    const max = gallery.scrollWidth - gallery.clientWidth;
    const current = Math.abs(gallery.scrollLeft);
    const start = slides[0].offsetLeft;
    const offsets = slides.map(slide => Math.min(max, Math.abs(slide.offsetLeft - start)));
    const target = direction > 0
      ? offsets.find(offset => offset > current + 2)
      : offsets.findLast(offset => offset < current - 2);
    if (target === undefined) return;
    gallery.scrollTo({
      left: isArabic ? -target : target,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  }
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  let framePending = false;
  gallery.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
      framePending = false;
      updatePosition();
    });
  }, { passive: true });
  window.addEventListener('resize', updatePosition);
  updatePosition();
}
