
  // ==============================
  // Navigation (Hamburger Toggle)
  // ==============================
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
  }

  // ==============================
  // Courses Data & Display
  // ==============================
  const courses = [
    { name: "WDD 101", credits: 3, completed: true },
    { name: "WDD 121", credits: 3, completed: true },
    { name: "CSE 120", credits: 4, completed: false },
    { name: "CSE 131", credits: 4, completed: false }
  ];

  const courseContainer = document.getElementById('course-container');

  function displayCourses(filter = "all") {
    if (!courseContainer) return;
    courseContainer.innerHTML = "";

    const filteredCourses = courses.filter(course => {
      if (filter === "all") return true;
      if (filter === "wdd") return course.name.startsWith("WDD");
      if (filter === "cse") return course.name.startsWith("CSE");
    });

    filteredCourses.forEach(course => {
      const card = document.createElement('div');
      card.className = course.completed ? 'course completed' : 'course in-progress';

      const status = course.completed ? "✔ Completed" : "⏳ In Progress";
      card.innerHTML = `
        <strong>${course.name}</strong><br>
        ${course.credits} credits<br>
        <span class="status">${status}</span>
      `;

      courseContainer.appendChild(card);
    });

    // Total Credits
    const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
    const total = document.createElement('p');
    total.className = "total-credits";
    total.textContent = `Total Credits: ${totalCredits}`;
    courseContainer.appendChild(total);
  }

  // Course Filter Buttons
  const filterButtons = document.querySelectorAll('.course-buttons button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => displayCourses(btn.dataset.filter));
    });
  }

  // Initial Courses Load
  displayCourses();

  // ==============================
  // Footer Date Info
  // ==============================
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    const lastModifiedDate = new Date(document.lastModified);
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

