// mv swiper
const swiperMv = new Swiper('.swiper-mv', {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  speed: 800,
  autoplay: false, // timeline完了後に開始
});

// 水音町らしさ swiper
const swiperList = new Swiper('.swiper-list', {
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
  spaceBetween: 1,
  speed: 300,
  slidesPerView: 3,
});

// ここからanimation ===================-
