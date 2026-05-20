// =========================================
// ============== PRODUCT SCRIPT ===========
// =========================================
let CUR_KEY = null;
let colorIdx = 0;
let imgIdx = 0;
let sizeIdx = 0;
let mainSwiper;
let thumbSwiper;

function initProduct(productData) {
  window.PRODUCT = productData;

  CUR_KEY = productData.slug || "default";

  colorIdx = 0;
  imgIdx = 0;
  sizeIdx = 0;
  renderTitle();
  renderProduct();
}

function renderTitle() {
  const el = document.getElementById("productName");
  if (!el) return;

  el.textContent = PRODUCT.name || "";
}

function renderProduct() {
  const p = window.PRODUCT;

  renderTitle();

  // Only render swatches if available
  if (p.colors && p.colors.length > 0) {
    renderSwatches(p);
  }

  // Only render sizes if available
  if (p.sizes && p.sizes.length > 0) {
    renderSizes(p);
  }

  // 🔥 Build swiper slides
  buildThumbs(p);
}

function buildThumbs(p) {
  const mainWrapper = document.getElementById("mainSwiperWrapper");
  const thumbWrapper = document.getElementById("thumbSwiperWrapper");

  if (!mainWrapper || !thumbWrapper) return;

  // ======================================
  // SHARED GALLERY MODE
  // ======================================
  if (p.sharedGallery) {
    mainWrapper.innerHTML = p.gallery
      .map(
        (src) => `
        <div class="swiper-slide">
          <img src="${src}">
        </div>
      `,
      )
      .join("");

    thumbWrapper.innerHTML = p.gallery
      .map(
        (src, i) => `
        <div class="swiper-slide" onclick="selectColor(${i})">
          <img src="${src}">
        </div>
      `,
      )
      .join("");
  }

  // ======================================
  // NORMAL MODE
  // ======================================
  else {
    const images = p.colors?.[colorIdx]?.images || [];

    mainWrapper.innerHTML = images
      .map(
        (src) => `
        <div class="swiper-slide">
          <img src="${src}">
        </div>
      `,
      )
      .join("");

    thumbWrapper.innerHTML = images
      .map(
        (src) => `
        <div class="swiper-slide">
          <img src="${src}">
        </div>
      `,
      )
      .join("");
  }

  initSwipers();
  initZoom();
}

function toggleZoom(el) {
  el.classList.toggle("zoomed");
}

function renderSwatches(p) {
  const el = document.getElementById("swatches");
  if (!el) return; // Exit if swatches element doesn't exist

  el.innerHTML = p.colors
    .map(
      (c, i) => `
      <div class="swatch ${i === colorIdx ? "active" : ""}" style="background:${c.hex}" title="${c.name}" onclick="selectColor(${i})"></div>`,
    )
    .join("");

  const name = document.getElementById("color-name");
  if (name) name.textContent = p.colors[colorIdx].name;
}

function selectColor(i) {
  colorIdx = i;
  imgIdx = 0;

  document.querySelectorAll(".swatch").forEach((el, j) => {
    el.classList.toggle("active", j === i);
  });

  const colorNameEl = document.getElementById("color-name");

  if (colorNameEl && PRODUCT.colors?.[i]) {
    colorNameEl.textContent = PRODUCT.colors[i].name;
    toast("Color: " + PRODUCT.colors[i].name);
  }

  // Shared gallery → only move slide
  if (PRODUCT.sharedGallery) {
    mainSwiper.slideTo(i);
  }

  // Normal gallery → rebuild images
  else {
    buildThumbs(PRODUCT);
  }
}

function renderSizes(p) {
  const el = document.getElementById("sizes");
  if (!el) return; // Exit if sizes element doesn't exist

  el.innerHTML = p.sizes
    .map(
      (s, i) => `
      <button class="sz ${i === sizeIdx ? "active" : ""}" onclick="selectSize(${i})">${s.label}</button>`,
    )
    .join("");

  const sizeNameEl = document.getElementById("size-name");
  if (sizeNameEl) sizeNameEl.textContent = p.sizes[sizeIdx].label;
}

function selectSize(i) {
  sizeIdx = i;

  document.querySelectorAll(".sz").forEach((el, j) => {
    el.classList.toggle("active", j === i);
  });

  const sizeNameEl = document.getElementById("size-name");
  if (sizeNameEl && PRODUCT.sizes?.[i]) {
    sizeNameEl.textContent = PRODUCT.sizes[i].label;
    toast("Size: " + PRODUCT.sizes[i].label);
  }
}

// Swiper
function initSwipers() {
  if (mainSwiper) mainSwiper.destroy(true, true);
  if (thumbSwiper) thumbSwiper.destroy(true, true);
  // THUMBS
  thumbSwiper = new Swiper(".productThumbSwiper", {
    spaceBetween: 10,
    freeMode: true,
    preventClicks: true,
    preventClicksPropagation: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".thumb-next",
      prevEl: ".thumb-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  });

  // MAIN
  mainSwiper = new Swiper(".productMainSwiper", {
    preventClicks: true,
    effect: "fade", // Enables fade transition
    fadeEffect: {
      crossFade: true, // Fixes overlapping issues
    },
    preventClicksPropagation: true,
    // loop: true,
    navigation: {
      nextEl: ".swiper-button-next.next",
      prevEl: ".swiper-button-prev.prev",
    },
    thumbs: {
      swiper: thumbSwiper,
    },
  });
}

// ================= TOAST =================
let toastTimer;

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;

  el.textContent = msg;
  el.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2000);
}

// =========================================
// ============== POPUP SCRIPT =============
// =========================================

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const enquiryBtn = document.getElementById("enquiryBtn");
  const closePopup = document.getElementById("closePopup");

  if (enquiryBtn) {
    enquiryBtn.addEventListener("click", () => {
      const product = window.PRODUCT;

      const productName = product.name;
      const color = product.colors?.[colorIdx]?.name || "";
      const size = product.sizes?.[sizeIdx]?.label || "";

      // Get image: use color images if available, otherwise fallback to main image from HTML
      // 🔥 Get current active swiper image
      let image = "";

      // SHARED GALLERY
      if (PRODUCT.sharedGallery) {
        image = PRODUCT.gallery?.[colorIdx] || PRODUCT.gallery?.[0] || "";
      }

      // MULTIPLE IMAGES PER COLOR
      else if (PRODUCT.colors?.[colorIdx]?.images) {
        image = PRODUCT.colors[colorIdx].images?.[0] || "";
      }

      // SINGLE IMAGE PER COLOR
      else if (PRODUCT.colors?.[colorIdx]?.image) {
        image = PRODUCT.colors[colorIdx].image || "";
      }

      // ✅ POPUP UI
      const popupImage = document.getElementById("popupImage");
      const popupProduct = document.getElementById("popupProduct");

      if (popupImage) popupImage.src = image;
      if (popupProduct) popupProduct.innerText = productName;

      const popupColorEl = document.getElementById("popupColor");
      if (popupColorEl) {
        if (color) {
          popupColorEl.innerHTML = `<span class="info-label">Colour</span><span class="info-value">${color}</span>`;
        } else {
          popupColorEl.remove();
        }
      }

      const popupSizeEl = document.getElementById("popupSize");
      if (popupSizeEl) {
        if (size) {
          popupSizeEl.innerHTML = `<span class="info-label">Size</span><span class="info-value">${size}</span>`;
        } else {
          popupSizeEl.remove();
        }
      }

      if (popup) popup.classList.add("show");
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      if (popup) popup.classList.remove("show");
    });
  }
});
function getCurrentImages() {
  if (PRODUCT.galleryMode === "shared") {
    return PRODUCT.images || [];
  }
  return PRODUCT.colors?.[colorIdx]?.images || [];
}
function initZoom() {
  const zoomBtn = document.getElementById("zoomBtn");

  if (!zoomBtn) return;

  zoomBtn.onclick = (e) => {
    e.stopPropagation();

    let galleryImages = [];

    // ======================================
    // SHARED GALLERY MODE
    // ======================================
    if (PRODUCT.sharedGallery) {
      galleryImages = PRODUCT.gallery || [];
    }

    // ======================================
    // NORMAL MODE
    // ======================================
    else {
      galleryImages = PRODUCT.colors?.[colorIdx]?.images || [];
    }

    if (!galleryImages.length) return;

    // 🔥 GET CURRENT ACTIVE SLIDE
    const activeIndex = mainSwiper?.realIndex || 0;

    $.fancybox.open(
      galleryImages.map((src) => ({
        src: src,
        thumb: src,
        opts: {
          caption: PRODUCT.name || "",
          thumb: src,
        },
      })),
      {
        loop: false,

        // 🔥 START FROM CURRENT IMAGE
        index: activeIndex,

        buttons: ["zoom", "slideShow", "thumbs", "close"],

        // thumbs: {
        //   autoStart: true,
        // },

        animationEffect: "zoom",
        transitionEffect: "slide",
      },
    );
  };
}

// Hide Product Info On Submission
document.addEventListener("DOMContentLoaded", function () {
  const observer = new MutationObserver(function () {
    const success = document.querySelector('[class*="SubmitMessage__Container-sc"]');
    if (success) {
      document.querySelector(".product-info").style.display = "none";
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
