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

// オープニング
const op = gsap.timeline({
  onComplete: function () {
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
    '-=0.6'
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
      duration: 1.3,
      ease: 'power3.out',
    },
    '-=0.7'
  )
  .to(
    '.header',
    {
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.4'
  );

// pickupセクション
gsap.fromTo(
  '.pickup__item',
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.pickup__list',
      start: 'top 80%',
    },
  }
);
gsap.from('.pickup__item-img', {
  borderRadius: '0',
  duration: 0.8,
  ease: 'power4.inOut',
  delay: 0.5,
  scrollTrigger: {
    trigger: '.pickup__list',
    start: 'top 80%',
  },
});
gsap.from('.pickup__list', {
  gap: '0px 0px ',
  duration: 0.8,
  ease: 'power4.inOut',
  delay: 0.5,
  scrollTrigger: {
    trigger: '.pickup__list',
    start: 'top 80%',
  },
});
gsap.from('.pickup__item-content', {
  opacity: 0,
  duration: 0.8,
  ease: 'power4.inOut',
  delay: 0.8,
  scrollTrigger: {
    trigger: '.pickup__list',
    start: 'top 80%',
  },
});

// マップセクション 波紋が広がるアニメーション
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

// 汎用parallax
let parallaxes = document.querySelectorAll('.js-parallax');
parallaxes.forEach((parallax) => {
  gsap.fromTo(
    parallax.querySelector('img'),
    {
      y: -100,
    },
    {
      y: 0,
      scrollTrigger: {
        trigger: parallax,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
});

// 汎用stagger
let staggers = document.querySelectorAll('.js-stagger');
staggers.forEach((stagger) => {
  gsap.fromTo(
    stagger.querySelectorAll('.js-stagger-item'),
    {
      opacity: 0,
      x: -5,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stagger,
        start: 'top 80%',
      },
    }
  );
});

// 汎用fadeIn
let fades = document.querySelectorAll('.js-fade');
fades.forEach((fade) => {
  gsap.fromTo(
    fade,
    {
      opacity: 0,
      y: 5,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: fade,
        start: 'top 80%',
      },
    }
  );
});
