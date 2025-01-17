import Swiper, { Pagination } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import googleMap from '../modules/map/map';
import device from 'current-device';
// if (device.iphone()) {
//   document.querySelector('html').style.overscrollBehavior = 'none';
// }
googleMap();

gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperLocation = new Swiper('.swiper-location', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
});

const swiperTypes = new Swiper('.swiper-types', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
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
  modules: [Pagination],
  speed: 1000,
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
});
