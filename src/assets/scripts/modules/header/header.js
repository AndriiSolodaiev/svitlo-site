const { default: gsap } = require('gsap');
import Hammer from 'hammerjs';
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
  const allFaqs = document.querySelectorAll('.terms-faq__item');
  const btnUp = evt.target.closest('[data-btn-up]');
  const close = evt.target.closest('[data-call-us-modal-close]');
  // const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const closePhone = evt.target.closest('[data-call-phone-modal-close]');
  const btnPhone = evt.target.closest('[data-call-phone-btn]');
  const overflowPhone = document.querySelector('[data-call-phone__overflow]');
  const overflowsAll = document.querySelectorAll('.overflow');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenuClose = evt.target.closest('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');

  const btnHeaderPc = evt.target.closest(' .header-pc .header-btn ');

  if (btnHeaderPc) {
    btnHeaderPc.closest('.header-pc').classList.toggle('is-open');
  }
  if (btnMenuTarget) {
    overflowsAll.forEach(flow => flow.classList.add('hidden'));
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
  if (btnMenuClose) {
    menu.classList.add('hidden');
    header.classList.remove('menu-is-open');
    if (!header.classList.contains('menu-is-open')) {
      window.dispatchEvent(new Event('start-scroll'));
      headerControls('home');
    } else {
      headerControls('menu');
    }
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
    overflowsAll.forEach(flow => flow.classList.add('hidden'));
    menu.classList.add('hidden');
    header.classList.remove('menu-is-open');
    headerControls('home');
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      overflow.classList.remove('hidden');
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
    overflow.classList.add('hidden');
    menu.classList.add('hidden');
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
    const textField = faq.querySelector('.terms-faq__text');
    function closeFaq(item) {
      item.classList.remove('is-open');
      gsap.to(item.querySelector('.terms-faq__text'), {
        height: 0,
        opacity: 0.1,
        duration: 0.5,
      });
    }
    Array.from(allFaqs)
      .filter(item => item !== faq)
      .forEach(item => {
        closeFaq(item);
      });
    if (faq.classList.contains('is-open')) {
      closeFaq(faq);
    } else {
      faq.classList.add('is-open');
      gsap.to(textField, {
        height: textField.scrollHeight,
        opacity: 1,
        duration: 0.35,
      });
    }
  }
});
// Закриття модальних вікон по свайпу
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.querySelector('[data-menu]');
  const overflow = document.querySelector('[data-call-us__overflow]');
  const overflowPhone = document.querySelector('[data-call-phone__overflow]');
  swipeUpToClose(menu, () => {
    header.classList.remove('menu-is-open');
  });
  swipeUpToClose(overflow);
  swipeUpToClose(overflowPhone);

  function swipeUpToClose(selector, addFunc) {
    const hammer = new Hammer(selector);

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('swipeup', function() {
      selector.classList.add('hidden');
      headerControls('home');
      window.dispatchEvent(new Event('start-scroll'));
      if (addFunc) addFunc();
    });
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

//only for verstka
document.querySelectorAll('a').forEach(link => {
  if (
    link.getAttribute('href').split('')[0] === '/' &&
    link.getAttribute('href').split('').length > 1
  ) {
    const linkHref = link.getAttribute('href');
    console.log(link.getAttribute('href').split(''));
    link.setAttribute('href', linkHref + '.html');
  }
});
