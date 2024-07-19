import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';
// import '../modules/helpers/imgParallax';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);
const leftBlock = document.querySelector('.left-block');
let calcOffset =
  window.innerHeight < window.innerWidth
    ? 101 * 2 + 300 - 2 * 200 - 150 - 250 + 10
    : 401 * 2 + 600 - 2 * 500 - 450 - 550 + 10;
let offset = window.innerHeight + calcOffset; // формула обчислення числа:  (к-ть Непарних карток зліва) * 101 + (к-ть Парних карток зліва) * 300 - (к-ть Непарних карток справа) * 200 - (к-ть Парних карток справа) * 100 - (різниця карток справа і зліва)* (відступ між картками (10))
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects',
    start: '100px 100px', // when the top of the trigger hits the top of the viewport
    end: 'bottom bottom', // end after scrolling 500px beyond the start
    scrub: 0.3, // smooth scrubbing, takes 1 second to "catch up" to the
    // markers: true,
  },
});
tl.fromTo('.left-block', { y: 0 }, { y: offset });
window.addEventListener('resize', function() {
  console.log('resizing');
  tl.kill();
  tl = null;
  leftBlock.style.transform = '';
  console.log(leftBlock);
  calcOffset =
    window.innerHeight < window.innerWidth
      ? 101 * 2 + 300 - 2 * 200 - 150 - 250 + 10
      : 401 * 2 + 600 - 2 * 500 - 450 - 550 + 10;
  offset = window.innerHeight + calcOffset;
  // console.log(offset);
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.projects',
      start: '100px 100px', // when the top of the trigger hits the top of the viewport
      end: 'bottom bottom', // end after scrolling 500px beyond the start
      scrub: 0.3, // smooth scrubbing, takes 1 second to "catch up" to the
      // markers: true,
    },
  });
  tl.fromTo('.left-block', { y: 0 }, { y: offset });
});
