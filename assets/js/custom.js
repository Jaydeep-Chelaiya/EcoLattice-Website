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

  // Menu Dropdown JS Starts
  document.addEventListener("DOMContentLoaded", function () {
    // const productLink = document.getElementById("productLink");
    const dropdownToggleIcon = document.getElementById("dropdownIcon");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    // For screens larger than 992px
    // if (window.innerWidth >= 992) {
    //   productLink.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     window.location.href = this.href;
    //   });
    // }
    // For screens smaller than 992px
    if (window.innerWidth < 992) {
      // productLink.addEventListener("click", function (e) {
      //   // Navigate to the link
      //   window.location.href = this.href;
      // });
      dropdownToggleIcon.addEventListener("click", function (e) {
        e.preventDefault();
        // Toggle the dropdown menu's visibility
        dropdownMenu.classList.toggle("show");
        this.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
      });
      // Close dropdown if clicking outside
      // document.addEventListener("click", function (e) {
      //   if (!dropdownToggleIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
      //     dropdownMenu.classList.remove("show");
      //     dropdownToggleIcon.setAttribute("aria-expanded", "false");
      //   }
      // });
    }
  });
  // Menu Dropdown JS Ends

  // Benefit Slider Area JS Starts
  var swiper = new Swiper(".hmBenefitSlider", {
    spaceBetween: 10,
    slidesPerView: 1.6,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".dot-pagination",
      clickable: true,
    },
    breakpoints: {
      760: {
        slidesPerView: 2.2,
        spaceBetween: -60,
        centeredSlides: false,
      },
      992: {
        slidesPerView: 2.8,
        spaceBetween: -80,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 2.8,
        spaceBetween: -120,
        centeredSlides: false,
      },
      1400: {
        slidesPerView: 2.8,
        spaceBetween: -120,
        centeredSlides: false,
      },
      1700: {
        slidesPerView: 3.0,
        spaceBetween: -120,
        centeredSlides: false,
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
})(jQuery);
