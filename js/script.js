jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

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
    autoplay: {
      delay: 4500,
    },
  });
});
