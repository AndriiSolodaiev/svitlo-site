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
  const faq = evt.target.closest('.terms-faq__item');
  const close = evt.target.closest('[data-call-us-modal-close]');
  // const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const closePhone = evt.target.closest('[data-call-phone-modal-close]');
  // const form = evt.target.closest('[data-call-us-modal]');
  const btnPhone = evt.target.closest('[data-call-phone-btn]');
  const overflowPhone = document.querySelector('[data-call-phone__overflow]');

  const menuContainer = document.querySelector('.menu__container');
  // const countryList = evt.target.closest('.iti__country-list');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  // const btnMenu = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-menu]');

  const btnUp = evt.target.closest('[data-btn-up]');

  if (btnMenuTarget) {
    menu.classList.toggle('hidden');

    header.classList.toggle('menu-is-open');
    window.dispatchEvent(new Event('stop-scroll'));
    if (!header.classList.contains('menu-is-open')) {
      window.dispatchEvent(new Event('start-scroll'));
      headerControls('home');
    } else {
      headerControls('menu');
    }
    return;
  }
  // if (evt.target === menuContainer) {
  //   menu.classList.toggle('hidden');

  //   header.classList.toggle('menu-is-open');
  //   window.dispatchEvent(new Event('stop-scroll'));
  //   if (!header.classList.contains('menu-is-open')) {
  //     window.dispatchEvent(new Event('start-scroll'));
  //   }
  //   return;
  // }
  if (btnUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));

      overflow.classList.remove('hidden');
    } else {
      headerControls('home');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    overflow.classList.add('hidden');
    headerControls('home');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    overflow.classList.add('hidden');
    headerControls('home');
  }

  if (btnPhone) {
    if (overflowPhone.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      headerControls('call');
      overflowPhone.classList.remove('hidden');
    } else {
      headerControls('home');
      overflowPhone.classList.add('hidden');
    }
    return;
  }
  if (closePhone) {
    window.dispatchEvent(new Event('start-scroll'));
    overflowPhone.classList.add('hidden');
    headerControls('home');
  }
  if (evt.target === overflowPhone) {
    window.dispatchEvent(new Event('start-scroll'));
    overflowPhone.classList.add('hidden');
    headerControls('home');
  }

  if (faq) {
    faq.classList.toggle('is-open');
  }
});

// const loader = document.querySelector('.loader-wrap');

// document.addEventListener('DOMContentLoaded', () => {
//   window.onload = function() {
//     window.setTimeout(() => {
//       loader.classList.add('loaded');
//     }, 1200);
//   };
// });

function headerControls(activeBtn) {
  const mobBtn = document.querySelectorAll('.mob-nav-btn');
  if (!mobBtn) return;
  mobBtn.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.controls == activeBtn) {
      btn.classList.add('active');
    }
  });
}
headerControls('home');
