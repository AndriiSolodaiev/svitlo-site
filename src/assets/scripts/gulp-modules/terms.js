import Swiper, { Pagination } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';

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

const termsBtns = document.querySelectorAll('[data-terms]');
const termsContent = document.querySelectorAll('[data-terms-content]');

termsBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    termsBtns.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    blockChange(btn.dataset.terms);
  });
});

function blockChange(selectBlock) {
  termsContent.forEach(block => {
    if (selectBlock !== block.dataset.termsContent) {
      block.classList.remove('is-visible');
    } else {
      block.classList.add('is-visible');
      gsap.from(block, {
        y: 100,
      });
    }
  });
}
