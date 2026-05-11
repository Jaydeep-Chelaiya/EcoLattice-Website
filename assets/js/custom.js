(function ($) {
  ("use strict");
  // Lenis Smooth Scroll JS Starts
  const DROPDOWN_SELECTOR = '[class*="Dropdown__DropdownContainer-sc"]';
  const POPUP_SELECTOR = ".popup-content";

  // Combine selectors
  const SCROLL_EXCLUDE_SELECTOR = `${DROPDOWN_SELECTOR}, ${POPUP_SELECTOR}, .samplepopup .modal-content`;

  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      normalizeWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Single prevent handler
      prevent: (node) => node?.closest(SCROLL_EXCLUDE_SELECTOR),
    },
  });
  // Lenis Smooth Scroll JS Ends

  // Unified scroll blocker
  const stopScrollPropagation = (e) => {
    if (!e.target) return;

    if (e.target.closest(SCROLL_EXCLUDE_SELECTOR)) {
      e.stopPropagation();
    }
  };

  // Capture phase ensures we beat Lenis
  ["wheel", "touchmove"].forEach((event) => {
    document.addEventListener(event, stopScrollPropagation, {
      passive: false,
      capture: true,
    });
  });

  // Header Reveal On Scroll Starts
  var headerscroll = document.getElementById("header");
  var headroom = new Headroom(headerscroll, {
    offset: 100,
    tolerance: 3,
    classes: {
      initial: "animated",
      pinned: "headroom--pinned",
      unpinned: "headroom--unpinned",
    },
  });
  headroom.init();
  // Header Reveal On Scroll Ends

  // Menu Dropdown JS Starts
  document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggleIcon = document.getElementById("dropdownIcon");
    const dropdownMenu = document.querySelector(".dropdown-wrapper");
    if (window.innerWidth < 992) {
      dropdownToggleIcon.addEventListener("click", function (e) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
        this.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
      });
    }
  });
  const menuItems = document.querySelectorAll(".dropdown-list-wrapper li");
  const posters = document.querySelectorAll(".posters .single-poster-item");
  function showPoster(index) {
    posters.forEach((p) => p.classList.remove("active"));
    if (posters[index]) posters[index].classList.add("active");
  }
  // Show poster for initially active menu item
  const activeIndex = [...menuItems].findIndex((li) => li.classList.contains("active"));
  if (activeIndex !== -1) showPoster(activeIndex);
  menuItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      showPoster(index);
    });
    item.addEventListener("mouseleave", () => {
      if (activeIndex !== -1) showPoster(activeIndex);
    });
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
      delay: 8000,
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
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
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

  // Newsletter Arrow JS Starts
  (function () {
    const interval = setInterval(() => {
      const buttonSpan = document.querySelector(".eapps-form-builder-bd28a378-3c36-4c16-b690-75b3f75d7ee0-custom-css-root .es-button-base-overlay");
      if (buttonSpan && !buttonSpan.querySelector(".cta-arrow")) {
        const spanElement = document.createElement("span");
        spanElement.className = "cta-arrow";
        spanElement.innerHTML = `<img src="https://www.tyt.co.in/ecolattice/assets/img/new-arrow.svg" alt="Navigation Arrow">`;
        buttonSpan.appendChild(spanElement);
        clearInterval(interval);
      }
    }, 300);
  })();
  // Newsletter Arrow JS Ends

  // Request Sample CTA JS Starts
  document.addEventListener("DOMContentLoaded", function () {
    const modalEl = document.getElementById("samplePopup");
    const popupModal = new bootstrap.Modal(modalEl);
    // Open popup on button click
    document.querySelectorAll(".open-sample-popup").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        popupModal.show();
      });
    });
  });
  // Request Sample CTA JS Ends
})(jQuery);
