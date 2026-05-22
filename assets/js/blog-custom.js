(function ($) {
  ("use strict");

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
})(jQuery);
