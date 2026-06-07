import { modules } from '../services/moduleData.js';
import { createModuleCard } from '../components/module-card.js';

const modulesGrid = document.querySelector('#modulesGrid');
if (modulesGrid) {
  modules.forEach((module) => {
    modulesGrid.appendChild(createModuleCard(module));
  });
}

const currentYear = document.querySelector('#currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mainNav?.classList.contains('open')) {
      mainNav.classList.remove('open');
    }
  });
});

window.addEventListener('scroll', () => {
  if (siteHeader) {
    siteHeader.classList.toggle('scrolled', window.scrollY > 20);
  }
});
