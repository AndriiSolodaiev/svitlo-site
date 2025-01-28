import Swiper, { Pagination, EffectFade } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperAchievements = new Swiper('.swiper-achievements', {
  speed: 1000,
  slidesPerView: 1.1,
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
const swiperTeam = new Swiper('.swiper-team', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
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
