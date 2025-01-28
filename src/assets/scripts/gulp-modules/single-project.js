import Swiper, { Pagination, EffectCards, EffectFade } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import device from 'current-device';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
initSmoothScrolling();

// if (device.iphone()) {
//   document.querySelector('html').style.overscrollBehavior = 'none';
// }

gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperLocation = new Swiper('.swiper-location', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
  breakpoints: {
    768: {
      slidesPerView: 1.9,
    },
    1366: {
      // enabled: false,
      slidesPerView: 'auto',
      spaceBetween: 10,
    },
  },
});

const swiperTypes = new Swiper('.swiper-types', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
  breakpoints: {
    768: {
      slidesPerView: 2.1,
    },
    1366: {
      slidesPerView: 3.8,
      spaceBetween: 10,
    },
  },
});

const swiperInfra = new Swiper('.swiper-infra-btns', {
  speed: 1000,
  slidesPerView: 'auto',
  spaceBetween: 8,
});

const swiperMaterials = new Swiper('.swiper-materials-btns', {
  speed: 1000,
  slidesPerView: 'auto',
  spaceBetween: 8,
});

const swiperGallery = new Swiper('.swiper-gallery', {
  modules: [Pagination, EffectFade],
  speed: 1000,
  effect: 'fade',
  spaceBetween: 8,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const swiperOther = new Swiper('.swiper-other', {
  speed: 1000,
  spaceBetween: 8,
  slidesPerView: 1.1,
  breakpoints: {
    768: {
      slidesPerView: 1.9,
    },
    1366: {
      // enabled: false,
      slidesPerView: 3.8,
      spaceBetween: 10,
    },
  },
});

export function createAnimatedSlider({
  buttonsSelector,
  titleSelector,
  textElementSelector,
  imageContainerSelector,
}) {
  const buttons = document.querySelectorAll(buttonsSelector);
  const titleElement = document.querySelector(titleSelector);
  const textElement = document.querySelector(textElementSelector);
  const imageContainer = document.querySelector(imageContainerSelector);

  function updateContent(button) {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const newTitle = button.getAttribute('data-title');
    const newText = button.getAttribute('data-text');
    const newImage = button.getAttribute('data-img');

    // Анімація тайтлу
    const currentTitle = titleElement.textContent;
    if (currentTitle !== newTitle) {
      gsap.to(titleElement, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          titleElement.textContent = newTitle;
          gsap.set(titleElement, { y: 30, opacity: 0 });
          gsap.to(titleElement, { y: 0, opacity: 1, duration: 0.5 });
        },
      });
    }

    // Анімація тексту
    const currentText = textElement.textContent;
    if (currentText !== newText) {
      gsap.to(textElement, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          textElement.textContent = newText;
          gsap.set(textElement, { y: 30, opacity: 0 });
          gsap.to(textElement, { y: 0, opacity: 1, duration: 0.5 });
        },
      });
    }

    // Анімація зображення
    const currentImage = imageContainer.querySelector('.current-image');
    const newImageElement = document.createElement('img');
    newImageElement.src = newImage;
    newImageElement.alt = 'New Image';
    newImageElement.classList.add('current-image');
    imageContainer.appendChild(newImageElement);

    gsap.set(newImageElement, { opacity: 0, scale: 1 });
    gsap
      .timeline()
      .to(currentImage, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        onComplete: () => {
          currentImage.remove();
        },
      })
      .to(
        newImageElement,
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
        },
        '<+=0.2',
      );
  }
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      updateContent(button);
    });
  });

  // Ініціалізація першої кнопки при завантаженні сторінки
  if (buttons.length > 0) {
    updateContent(buttons[0]);
  }
}

// Використання
createAnimatedSlider({
  buttonsSelector: '[data-section="infra"] .swiper-slide',
  titleSelector: '[data-section="infra"] .sp-infra-content__text>h3',
  textElementSelector: '[data-section="infra"] .sp-infra-content__text>p',
  imageContainerSelector: '[data-section="infra"] .image-container',
});

createAnimatedSlider({
  buttonsSelector: '[data-section="materials"] .swiper-slide',
  titleSelector: '[data-section="materials"] .sp-infra-content__text>h3',
  textElementSelector: '[data-section="materials"] .sp-infra-content__text>p',
  imageContainerSelector: '[data-section="materials"] .image-container',
});
