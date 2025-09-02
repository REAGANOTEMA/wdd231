/* ===========================
   date.js
   Updates footer with current year and last modified date/time
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentYear");
  const lastModifiedEl = document.getElementById("lastModified");

  // Set current year
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }

  // Set last modified date/time
  if (lastModifiedEl) {
    const lastModified = new Date(document.lastModified);

    // Format options: weekday, day, month, year, time
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    lastModifiedEl.textContent = `Last Updated: ${lastModified.toLocaleString(
      undefined,
      options
    )}`;
  }
});
