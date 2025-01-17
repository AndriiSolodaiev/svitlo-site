import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);
const gap = 8;
const leftBlock = document.querySelector('.left-block');
const leftBlockCards = document.querySelectorAll('.left-block .project-card');
const rightBlockCards = document.querySelectorAll('.right-block .project-card');

let calcOffset =
  rightBlockCards.length * window.innerWidth * 0.9 -
  leftBlockCards.length * window.innerWidth +
  (rightBlockCards.length - leftBlockCards.length) * gap;

console.log(calcOffset);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects',
    start: 'top top', // when the top of the trigger hits the top of the viewport
    end: 'bottom center', // end after scrolling 500px beyond the start
    scrub: 0.3, // smooth scrubbing, takes 1 second to "catch up" to the
    // markers: true,
    ease: 'none',
  },
});
tl.fromTo('.left-block', { y: 0 }, { y: calcOffset });

window.addEventListener('orientationchange', function() {
  tl.kill();
  tl = null;
  leftBlock.style.transform = '';

  calcOffset =
    rightBlockCards.length * window.innerWidth * 0.9 -
    leftBlockCards.length * window.innerWidth +
    (rightBlockCards.length - leftBlockCards.length) * gap;

  console.log(calcOffset);
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.projects',
      start: 'top top', // when the top of the trigger hits the top of the viewport
      end: 'bottom center', // end after scrolling 500px beyond the start
      scrub: 0.1, // smooth scrubbing, takes 1 second to "catch up" to the
      // markers: true,
      ease: 'none',
    },
  });
  tl.fromTo('.left-block', { y: 0 }, { y: calcOffset });
});
