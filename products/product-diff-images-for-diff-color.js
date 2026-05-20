// =========================================
// ============== PRODUCT SCRIPT ===========
// =========================================
let CUR_KEY = null;
let colorIdx = 0;
let imgIdx = 0;
let sizeIdx = 0;

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

  // Only render swatches and sizes if the elements exist and data is provided
  if (p.colors && p.colors.length > 0) {
    renderSwatches(p);
    buildThumbs(p);
  }

  if (p.sizes && p.sizes.length > 0) {
    renderSizes(p);
  }

  // Set main image if colors exist, otherwise use static image from HTML
  if (p.colors && p.colors.length > 0) {
    setMainImage(p, false);
  }
}

function setMainImage(p, animate) {
  const img = document.getElementById("main-img");
  const images = p.colors?.[colorIdx]?.images;

  if (!img || !images || images.length === 0) return; // Exit if no images available

  if (animate) {
    img.classList.add("fade");
    setTimeout(() => {
      img.src = images[imgIdx];
      img.classList.remove("fade");
    }, 200);
  } else {
    img.src = images[imgIdx];
  }
}

function scrollActiveThumb() {
  const container = document.getElementById("thumbs");
  const thumbs = container?.querySelectorAll(".thumb");

  if (!container || !thumbs || thumbs.length === 0) return;

  const active = thumbs[imgIdx];
  if (!active) return;

  const left = active.offsetLeft;
  const width = active.offsetWidth;

  container.scrollTo({
    left: left - container.offsetWidth / 2 + width / 2,
    behavior: "smooth",
  });
}

function buildThumbs(p) {
  const el = document.getElementById("thumbs");
  if (!el) return; // Exit if thumbs element doesn't exist

  const images = p.colors?.[colorIdx]?.images;
  if (!images) return;

  el.innerHTML = images
    .map(
      (src, i) => `
      <div class="thumb ${i === imgIdx ? "active" : ""}" onclick="goImg(${i})">
        <img src="${src}" loading="lazy">
      </div>`,
    )
    .join("");

  // 👉 Wait for DOM paint, then scroll
  setTimeout(scrollActiveThumb, 0);
}

function navImg(dir) {
  const images = PRODUCT.colors?.[colorIdx]?.images;
  if (!images || images.length === 0) return;

  imgIdx = (imgIdx + dir + images.length) % images.length;

  setMainImage(PRODUCT, true);

  document.querySelectorAll(".thumb").forEach((el, i) => {
    el.classList.toggle("active", i === imgIdx);
  });
  scrollActiveThumb();
}

function goImg(i) {
  imgIdx = i;
  setMainImage(PRODUCT, true);

  document.querySelectorAll(".thumb").forEach((el, j) => {
    el.classList.toggle("active", j === i);
  });
  scrollActiveThumb();
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

  if (PRODUCT.colors?.[colorIdx]?.images) {
    setMainImage(PRODUCT, true);
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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navImg(-1);
  if (e.key === "ArrowRight") navImg(1);
});

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
      let image = product.colors?.[colorIdx]?.images?.[imgIdx];
      if (!image) {
        const mainImgEl = document.getElementById("main-img");
        image = mainImgEl?.src || "";
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
