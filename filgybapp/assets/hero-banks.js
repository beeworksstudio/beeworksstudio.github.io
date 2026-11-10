const bankArtwork = document.querySelector('.hero-bank-art');
const reduceBankMotion = matchMedia('(prefers-reduced-motion: reduce)');
const bankLanes = [...bankArtwork.querySelectorAll('.hero-bank-lane')]
  .map(lane => [...lane.children]);
let bankAnimations = [];
let artworkVisible = false;

function syncBankMotion() {
  for (const animation of bankAnimations) {
    if (artworkVisible && !document.hidden && !reduceBankMotion.matches) {
      animation.play();
    } else {
      animation.pause();
    }
  }
}

new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  if (!width || !height) return;
  bankAnimations.forEach(animation => animation.cancel());
  const span = width + 200;
  const duration = span / 12 * 1000;
  bankAnimations = bankLanes.flatMap((lane, row) => {
    const frames = Array.from({ length: 41 }, (_, index) => {
      const fraction = index / 40;
      const x = fraction * span - 100;
      const wave = Math.sin((fraction + row / 3) * 2 * Math.PI);
      const y = height * (.5 + wave * .28) + (row - 1) * 10;
      return { transform: `translate3d(${x}px, ${y}px, 0)` };
    });
    if (row === 1) frames.reverse();
    return lane.map((item, index) => {
      const animation = item.animate(frames, {
        duration, iterations: Infinity
      });
      animation.currentTime = duration * ((index + .28 * row) / lane.length);
      return animation;
    });
  });
  bankArtwork.dataset.ready = '';
  syncBankMotion();
}).observe(bankArtwork);

new IntersectionObserver(([entry]) => {
  artworkVisible = entry.isIntersecting;
  syncBankMotion();
}).observe(bankArtwork);

document.addEventListener('visibilitychange', syncBankMotion);
reduceBankMotion.addEventListener('change', syncBankMotion);
