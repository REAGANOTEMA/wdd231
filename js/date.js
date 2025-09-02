
  // ==============================
  // Footer Date Info (Safe Version)
  // ==============================

  // Current Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Last Modified (formatted nicely)
  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    const lastModifiedDate = new Date(document.lastModified);

    // Format as: Monday, September 2, 2025, 10:15 AM
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    lastModifiedSpan.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString("en-US", options)}`;
  }
