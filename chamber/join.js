document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // 1. Set Timestamp for Form
  // -----------------------------
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // -----------------------------
  // 2. Membership Cards & Modals
  // -----------------------------
  const cards = document.querySelectorAll(".membership-cards .card");

  cards.forEach(card => {
    const modalId = card.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    const link = card.querySelector(".info-link");

    if (link && modal) {
      // Open modal on link click
      link.addEventListener("click", e => {
        e.preventDefault();
        modal.showModal();
      });

      // Close modal on button click
      const closeBtn = modal.querySelector(".close");
      closeBtn.addEventListener("click", () => modal.close());

      // Close modal on outside click
      modal.addEventListener("click", e => {
        if (e.target === modal) modal.close();
      });

      // Close modal on ESC key
      modal.addEventListener("keydown", e => {
        if (e.key === "Escape") modal.close();
      });
    }
  });

  // -----------------------------
  // 3. Mobile Hamburger Menu
  // -----------------------------
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.style.display = isExpanded ? "none" : "block";
    mobileMenu.setAttribute("aria-hidden", isExpanded);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      hamburger.setAttribute("aria-expanded", false);
      mobileMenu.setAttribute("aria-hidden", true);
    });
  });

  // -----------------------------
  // 4. Footer Information
  // -----------------------------
  const lastMod = document.getElementById("lastMod");
  const copyrightYear = document.getElementById("copyrightYear");

  if (lastMod) lastMod.textContent = new Date(document.lastModified).toLocaleDateString();
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();
});
