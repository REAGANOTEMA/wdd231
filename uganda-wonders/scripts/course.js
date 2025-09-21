/* ===========================
   course.js
   Handles rendering, filtering, and sorting of courses
   =========================== */

// Example dataset
const courses = [
  {
    code: "WDD231",
    title: "Web Frontend Development II",
    due: "2025-09-10",
    status: "in progress",
    category: "wdd",
    description: "Building responsive, interactive web apps using modern JavaScript, accessibility, and performance.",
    credits: 3
  },
  {
    code: "CSE210",
    title: "Programming with Classes",
    due: "2025-09-20",
    status: "upcoming",
    category: "cse",
    description: "Learn OOP principles with C#. Covers classes, objects, encapsulation, inheritance, and polymorphism.",
    credits: 4
  },
  {
    code: "WDD130",
    title: "Web Fundamentals",
    due: "2025-09-05",
    status: "completed",
    category: "wdd",
    description: "Intro to HTML, CSS, and design principles for building your first websites.",
    credits: 3
  },
  {
    code: "CSE111",
    title: "Intro to Databases",
    due: "2025-09-15",
    status: "upcoming",
    category: "cse",
    description: "Covers SQL, relational databases, and database design.",
    credits: 3
  }
];

const container = document.getElementById("course-container");
const filterButtons = document.querySelectorAll(".course-buttons button");
const sortSelect = document.getElementById("sort-select");
const totalCreditsSpan = document.getElementById("totalCredits");

let activeFilter = "all";

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format date nicely
function formatDate(dateString) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Render courses dynamically
function renderCourses(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p>No courses found.</p>`;
    totalCreditsSpan.textContent = 0;
    return;
  }

  list.forEach((course, index) => {
    const card = document.createElement("div");
    card.className = "card";
    if (course.status === "completed") card.classList.add("completed");
    card.setAttribute("tabindex", "0");

    // Staggered animation
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 100 * index);

    card.innerHTML = `
      <h3>${course.code} – ${course.title}</h3>
      <p><strong>Due:</strong> ${formatDate(course.due)}</p>
      <p><strong>Status:</strong> ${capitalize(course.status)}</p>
      <p>${course.description}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;

    container.appendChild(card);
  });

  // Calculate total credits dynamically
  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsSpan.textContent = totalCredits;
}

// Apply filtering and sorting
function applyFiltersAndSort() {
  let list = [...courses];

  // Filter by category
  if (activeFilter !== "all") {
    list = list.filter(course => course.category === activeFilter);
  }

  // Sort courses
  const sortBy = sortSelect.value;
  list.sort((a, b) => {
    if (sortBy === "due") return new Date(a.due) - new Date(b.due);
    if (sortBy === "course") return a.code.localeCompare(b.code);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  renderCourses(list);
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    // Update aria-selected for accessibility
    filterButtons.forEach(btn =>
      btn.setAttribute("aria-selected", btn === button ? "true" : "false")
    );

    applyFiltersAndSort();
  });
});

// Event listener for sort select
sortSelect.addEventListener("change", applyFiltersAndSort);

// Initial render
applyFiltersAndSort();
