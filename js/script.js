jQuery(function ($) {
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
    on: {
      init: function () {
        // Swiper初期化後にScrollTriggerを更新
        ScrollTrigger.refresh();
      },
    },
  });

  // list swiper
  const swiperList = new Swiper('.swiper-list', {
    navigation: {
      nextEl: '.slider__button--next',
      prevEl: '.slider__button--prev',
    },
    spaceBetween: 1,
    speed: 300,
    slidesPerView: 3,
    on: {
      init: function () {
        ScrollTrigger.refresh();
      },
    },
  });

  // animation ===================-

  // ScrollTriggerの設定を統一（invalidateOnRefreshでレイアウト変更を検知）
  const mapScrollTrigger = {
    trigger: '.map',
    start: 'top center',
    markers: true,
  };

  gsap.to('.map__ripples', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    scrollTrigger: mapScrollTrigger,
  });

  gsap.fromTo(
    '.map__ripple',
    {
      scale: 1,
      opacity: 1,
    },
    {
      scale: 5,
      opacity: 0,
      duration: 2.5,
      stagger: 0.2,
      delay: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        ...mapScrollTrigger,
        toggleActions: 'play none none none',
      },
    }
  );

  gsap.fromTo(
    '.map__title',
    {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(15px)',
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      delay: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        ...mapScrollTrigger,
        toggleActions: 'play none none none',
      },
    }
  );
});
