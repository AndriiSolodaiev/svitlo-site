const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  // const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');
  const menuContainer = document.querySelector('.menu__container');
  // const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest('[data-btn-up]');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  // const btnMenu = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-menu]');
  if (btnMenuTarget) {
    menu.classList.toggle('hidden');

    header.classList.toggle('menu-is-open');
    window.dispatchEvent(new Event('stop-scroll'));
    if (!header.classList.contains('menu-is-open')) {
      window.dispatchEvent(new Event('start-scroll'));
    }
    return;
  }
  if (evt.target === menuContainer) {
    menu.classList.toggle('hidden');

    header.classList.toggle('menu-is-open');
    window.dispatchEvent(new Event('stop-scroll'));
    if (!header.classList.contains('menu-is-open')) {
      window.dispatchEvent(new Event('start-scroll'));
    }
    return;
  }
  if (btnUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
});

const loader = document.querySelector('.loader-wrap');

document.addEventListener('DOMContentLoaded', () => {
  window.onload = function() {
    window.setTimeout(() => {
      loader.classList.add('loaded');
    }, 1200);
  };
});
