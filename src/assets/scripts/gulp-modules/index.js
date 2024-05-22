import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);
const calcOffset = 101 * 2 + 300 - 2 * 200 - 150 - 250 + 10;
const offset = window.innerHeight + calcOffset; // формула обчислення числа:  (к-ть Непарних карток зліва) * 101 + (к-ть Парних карток зліва) * 300 - (к-ть Непарних карток справа) * 200 - (к-ть Парних карток справа) * 100 - (різниця карток справа і зліва)* (відступ між картками (10))
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects',
    start: '100px 100px', // when the top of the trigger hits the top of the viewport
    end: 'bottom bottom', // end after scrolling 500px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the
    // markers: true,
  },
});
tl.to('.left-block', { y: offset, duration: 0.2 });
