// ==============================
// Hamburger Menu Toggle
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
// Courses Data
// ==============================
const courses = [
    // ART130
    { name: "Process Book A", course: "ART130.001", type: "Assignment", due: "2025-09-03T23:59:00", points: 50, completed: false },
    { name: "WhatsApp Sign-Up", course: "ART130.001", type: "Discussion", due: "2025-09-03T23:59:00", points: null, completed: false },
    { name: "Process Book B", course: "ART130.001", type: "Assignment", due: "2025-09-06T23:59:00", points: 50, completed: false },

    // REL275A
    { name: "Quiz Attendance", course: "REL275A.009", type: "Quiz", due: "2025-09-06T23:59:00", points: 2, completed: false },

    // WRIT101
    { name: "Draft: Your Life Story", course: "WRIT101.002", type: "Assignment", due: "2025-09-03T23:59:00", points: 2, completed: false },
    { name: "WhatsApp Sign-up", course: "WRIT101.002", type: "Discussion", due: "2025-09-03T23:59:00", points: null, completed: false },
    { name: "Final Submission: Your Life Story", course: "WRIT101.002", type: "Assignment", due: "2025-09-06T23:59:00", points: 12, completed: false },
    { name: "Study & Quiz", course: "WRIT101.002", type: "Quiz", due: "2025-09-06T23:59:00", points: 20, completed: false },
    { name: "Writing Project: One Story, Two Audiences", course: "WRIT101.002", type: "Assignment", due: "2025-09-06T23:59:00", points: 20, completed: false },

    // WDD231
    { name: "Course Home Page", course: "WDD231.001", type: "Assignment", due: "2025-09-06T23:59:00", points: 30, completed: false },

    // CSE212
    { name: "60-second Status Update", course: "CSE212.001", type: "Quiz", due: "2025-09-06T23:59:00", points: 5, completed: false },
    { name: "Analyze: Performance", course: "CSE212.001", type: "Quiz", due: "2025-09-06T23:59:00", points: 50, completed: false },
    { name: "Code: Dynamic Arrays", course: "CSE212.001", type: "Assignment", due: "2025-09-06T23:59:00", points: 50, completed: false },
    { name: "Individual Activity: Dynamic Arrays & Performance", course: "CSE212.001", type: "Quiz", due: "2025-09-06T23:59:00", points: 10, completed: false },
    { name: "Learning Activities: Dynamic Arrays & Performance", course: "CSE212.001", type: "Quiz", due: "2025-09-06T23:59:00", points: 10, completed: false },
    { name: "Interview Question", course: "CSE212.001", type: "Assignment", due: "2025-09-06T23:59:00", points: 25, completed: false }
];

// ==============================
// Sort courses by due date
// ==============================
courses.sort((a, b) => new Date(a.due) - new Date(b.due));

// ==============================
// Display Courses
// ==============================
const courseContainer = document.getElementById('course-container');

function displayCourses(filter = "all") {
    if (!courseContainer) return;
    courseContainer.innerHTML = "";

    const filtered = courses.filter(course => {
        if (filter === "all") return true;
        if (filter === "wdd") return course.course.includes("WDD");
        if (filter === "cse") return course.course.includes("CSE");
        return true;
    });

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = `course ${course.completed ? "completed" : "in-progress"}`;
        const statusText = course.completed ? "✔ Completed" : "⏳ To Do";

        card.innerHTML = `
            <strong>${course.course}</strong> - ${course.name} <br>
            Type: ${course.type} ${course.points !== null ? ` | Points: ${course.points}` : ""} <br>
            Due: ${new Date(course.due).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })} <br>
            <span class="status">${statusText}</span>
        `;

        courseContainer.appendChild(card);
    });
}

// ==============================
// Course Filter Buttons
// ==============================
const filterButtons = document.querySelectorAll('.course-buttons button');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => displayCourses(btn.dataset.filter));
});

// Initial load
displayCourses();

// ==============================
// Footer Date Info
// ==============================
const yearSpan = document.getElementById('currentYear');
const lastModifiedSpan = document.getElementById('lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) {
    const date = new Date(document.lastModified);
    const options = { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute:"2-digit" };
    lastModifiedSpan.textContent = `Last Modified: ${date.toLocaleDateString("en-US", options)}`;
}
