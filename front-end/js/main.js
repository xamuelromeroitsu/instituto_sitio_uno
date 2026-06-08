
// Consolidated front-end scripting: header scroll behavior

const SHRINK_THRESHOLD = 20;
const HIDE_THRESHOLD = 80;
let lastScroll = 0;
let ticking = false;
const header = document.querySelector('.site-header');

function updateHeaderOnScroll() {
  if (!header) return;
  const current = window.scrollY || window.pageYOffset || 0;

  if (current > SHRINK_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (current > lastScroll && current > HIDE_THRESHOLD) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScroll = Math.max(0, current);
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeaderOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}

document.addEventListener('scroll', onScroll, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
  // apply initial state
  updateHeaderOnScroll();
});
