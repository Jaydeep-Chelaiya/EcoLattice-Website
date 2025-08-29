(function ($) {
  ("use strict");
  // Lenis Smooth Scroll JS Starts
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      wrapper: window,
      content: document.documentElement,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      normalizeWheel: true,
    },
  });
  // Lenis Smooth Scroll JS Ends

  // Header Reveal On Scroll Starts
  var headerscroll = document.getElementById("header");
  var headroom = new Headroom(headerscroll, {
    offset: 100,
    tolerance: 3,
    classes: {
      initial: "animated",
      pinned: "swingInX",
      unpinned: "swingOutX",
    },
  });
  headroom.init();
  // Header Reveal On Scroll Ends

  // Menu Dropdown JS Starts
  document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggleIcon = document.getElementById("dropdownIcon");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (window.innerWidth < 992) {
      dropdownToggleIcon.addEventListener("click", function (e) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
        this.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
      });
    }
  });
  // Menu Dropdown JS Ends

  // Benefit Slider Area JS Starts
  var swiper = new Swiper(".hmBenefitSlider", {
    spaceBetween: 0,
    slidesPerView: 1.3,
    slidesToScroll: 1,
    grabCursor: true,
    loop: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".dot-pagination",
      clickable: true,
    },
    breakpoints: {
      760: {
        slidesPerView: 1.4,
      },
      992: {
        slidesPerView: 2.2,
      },
      1200: {
        slidesPerView: 2.4,
      },
      1700: {
        slidesPerView: 2.95,
      },
    },
    on: {
      setTranslate(swiper, translate) {
        // force update based on current position
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      },
    },
  });
  // Benefit Slider Area JS Ends

  // About Timeline Slider Area JS Starts
  var swiper = new Swiper(".timelineSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: false,
    centeredSlides: false,
    slidesPerGroup: 1,
    breakpoints: {
      760: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      992: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1400: {
        slidesPerView: 2.85,
        spaceBetween: 30,
        centeredSlides: false,
      },
    },
  });
  // About Timeline Slider Area JS Ends

  // Single Product Slider Area JS Starts
  function updateSlideWidths() {
    const container = document.querySelector(".container");
    if (!container) return;
    const viewportWidth = window.innerWidth;
    const padding = viewportWidth < 767 ? 100 : viewportWidth > 1200 ? 40 : 200;
    const containerWidth = container.offsetWidth - padding; // fallback if .container not found
    const slides = document.querySelectorAll(".pd-slider .swiper-slide");
    slides.forEach((slide) => {
      slide.style.width = containerWidth * 1 + "px"; // default preview size for all
    });
    const activeSlide = document.querySelector(".pd-slider .swiper-slide-active");
    if (activeSlide) {
      activeSlide.style.width = containerWidth + "px"; // full container width for active
    }
  }
  var swiper = new Swiper(".pd-slider", {
    slidesPerView: "auto",
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    spaceBetween: 0,
    // autoplay: {
    //   delay: 2800,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      init: updateSlideWidths,
      slideChangeTransitionEnd: updateSlideWidths,
      resize: updateSlideWidths,
    },
  });
  // Single Product Slider Area JS Ends
})(jQuery);
