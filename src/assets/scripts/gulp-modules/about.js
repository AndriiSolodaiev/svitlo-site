import Swiper, { Pagination } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperAchievements = new Swiper('.swiper-achievements', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
});

const swiperTeam = new Swiper('.swiper-team', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
});
