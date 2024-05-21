import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';


import '../modules/helpers/imgParallax';
import "../modules/property/filter"

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);
