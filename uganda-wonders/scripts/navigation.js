/* ===========================
   navigation.js
   Handles mobile navigation toggle and accessibility
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (!toggleBtn || !nav) return;

  // Toggle mobile menu open/close
  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("open");
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      nav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close nav when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Keyboard accessibility: close nav on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  });
});
