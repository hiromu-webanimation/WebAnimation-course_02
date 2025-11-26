jQuery(function ($) {
  // animation ===================-

  // ScrollTriggerの設定を統一（invalidateOnRefreshでレイアウト変更を検知）
  const mapScrollTrigger = {
    trigger: '.map',
    start: 'top center',
  };

  gsap.to('.map__ripples', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    scrollTrigger: mapScrollTrigger,
  });
  gsap.to('.map__img', {
    '--scale': 2,
    '-opacity': 0,
    duration: 2.5,
    delay: 0.2,
    ease: 'power3.out',
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
      },
    }
  );

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

  // list swiper
  const swiperList = new Swiper('.swiper-list', {
    navigation: {
      nextEl: '.slider__button--next',
      prevEl: '.slider__button--prev',
    },
    spaceBetween: 1,
    speed: 300,
    slidesPerView: 3,
  });

  // op animation
  const op = gsap.timeline({
    onComplete: function () {
      // timeline完了後にMVのSwiperのautoplayを開始
      swiperMv.params.autoplay.delay = 4500;
      swiperMv.autoplay.start();
    },
  });
  gsap.set('body', {
    opacity: 1,
  });
  gsap.set('.header', {
    opacity: 0,
  });
  gsap.set('.fv__bg-contaienr', {
    maskSize: '30%',
  });

  op.to('.fv__copy', {
    opacity: 1,
    filter: 'blur(0px)',
  })
    .to(
      '.fv__copy',
      {
        xPercent: -100,
        duration: 1,
        opacity: 0,
        ease: 'power3.out',
      },
      '+=0.7'
    )
    .to(
      '.fv__bg-contaienr',
      {
        opacity: 1,
        ease: 'power3.out',
      },
      '-=0.4'
    )
    .to('.fv__bg-contaienr', {
      maskSize: '500%',
      duration: 3,
      ease: 'power3.inOut',
    })
    .to(
      '.fv__inner',
      {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=1'
    )
    .to(
      '.header',
      {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.3'
    );
});
