// Header scroll behavior:
// - add `.scrolled` when page is slightly scrolled (shrink header)
// - add/remove `.hidden` to hide on scroll-down and show on scroll-up
const header = document.querySelector('.site-header');
let lastScroll = 0;

// thresholds (tweakable)
const SHRINK_THRESHOLD = 20; // when header becomes compact
const HIDE_THRESHOLD = 80;   // start hiding after this many px when scrolling down

function onScroll() {
  const current = window.scrollY || document.documentElement.scrollTop;
  if (!header) return;

  // shrink after small threshold
  if (current > SHRINK_THRESHOLD) header.classList.add('scrolled');
  else header.classList.remove('scrolled');

  // hide on scroll down, show on scroll up (only after HIDE_THRESHOLD)
  if (current > lastScroll && current > HIDE_THRESHOLD) {
    // scrolling down
    header.classList.add('hidden');
  } else if (current < lastScroll) {
    // scrolling up
    header.classList.remove('hidden');
  }

  lastScroll = current;
}

window.addEventListener('scroll', onScroll, { passive: true });

// initialize state on load
document.addEventListener('DOMContentLoaded', onScroll);

export {};
