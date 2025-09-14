document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    mobileMenu.style.display = expanded ? "none" : "flex";
    mobileMenu.setAttribute("aria-hidden", expanded);
  });

  // Hidden Timestamp
  const timestampField = document.getElementById("timestamp");
  if (timestampField) timestampField.value = new Date().toISOString();

  // Membership Modals
  const modalButtons = document.querySelectorAll(".membership-cards .card .info-link");
  modalButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const modalId = e.target.closest(".card").dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  const closeButtons = document.querySelectorAll("dialog .close");
  closeButtons.forEach(btn => btn.addEventListener("click", () => btn.closest("dialog").close()));

  // Footer Info
  document.getElementById("lastMod").textContent = new Date(document.lastModified).toLocaleDateString();
  document.getElementById("copyrightYear").textContent = new Date().getFullYear();
});
