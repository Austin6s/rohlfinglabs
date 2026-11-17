// A progressive enhancement: the first project remains usable without JavaScript.
const reel = document.querySelector('[data-project-reel]');
if (reel) {
  const slides = [...reel.querySelectorAll('.reel-slide')];
  const selectors = [...reel.querySelectorAll('[data-reel-select]')];
  const play = reel.querySelector('[data-reel-play]');
  const region = reel.querySelector('.reel-slides');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let playing = !motion.matches;
  let hovering = false;
  let explicitlyStarted = false;
  let visible = !('IntersectionObserver' in window);
  let pointerIntent;
  let timer;

  function schedule() {
    clearTimeout(timer);
    if (playing && visible && !document.hidden && (!hovering || explicitlyStarted)) {
      timer = setTimeout(() => show(current + 1), 6500);
    }
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    selectors.forEach((button, i) => {
      if (i === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    reel.querySelector('[data-reel-current]').textContent = String(current + 1).padStart(2, '0');
    // Warm the next image before its turn, including slides initially hidden.
    slides[(current + 1) % slides.length].querySelector('img').loading = 'eager';
    schedule();
  }
  function setPlaying(value) {
    playing = value;
    play.setAttribute('aria-label', value ? play.dataset.pauseLabel : play.dataset.playLabel);
    play.querySelector('span').textContent = value ? 'Ⅱ' : '▷';
    region.setAttribute('aria-live', value ? 'off' : 'polite');
    schedule();
  }
  function manual(index) {
    explicitlyStarted = false;
    setPlaying(false);
    show(index);
  }

  reel.querySelectorAll('.reel-controls, .reel-navigation').forEach(el => { el.hidden = false; });
  reel.querySelector('[data-reel-prev]').addEventListener('click', () => manual(current - 1));
  reel.querySelector('[data-reel-next]').addEventListener('click', () => manual(current + 1));
  selectors.forEach((button, i) => button.addEventListener('click', () => manual(i)));
  play.addEventListener('pointerdown', () => { pointerIntent = !playing; });
  play.addEventListener('click', event => {
    const value = event.detail && pointerIntent !== undefined ? pointerIntent : !playing;
    pointerIntent = undefined;
    explicitlyStarted = value;
    setPlaying(value);
  });
  reel.addEventListener('focusin', () => { explicitlyStarted = false; setPlaying(false); });
  reel.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  reel.addEventListener('mouseleave', () => { hovering = false; explicitlyStarted = false; schedule(); });
  reel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      manual(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { if (motion.matches) setPlaying(false); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      schedule();
    }, {threshold: 0.3}).observe(reel);
  }
  setPlaying(playing);
  show(0);
}
