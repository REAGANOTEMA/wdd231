// File: app.js
// Location: /wdd231/chamber/scripts/app.js
// Author: Reagan Otema

// DOM elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const membersContainer = document.getElementById('membersContainer');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('q');
const filterLevel = document.getElementById('filterLevel');
const copyrightYear = document.getElementById('copyrightYear');
const lastMod = document.getElementById('lastMod');
const viewDirectoryBtn = document.querySelector('.hero-cta .btn');

// Data
let membersData = [];
let currentView = 'grid';

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'block';
  mobileMenu.style.display = isOpen ? 'none' : 'block';
  hamburger.setAttribute('aria-expanded', String(!isOpen));
});

// Switch view buttons
gridBtn.addEventListener('click', () => {
  currentView = 'grid';
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
  renderMembers();
});

listBtn.addEventListener('click', () => {
  currentView = 'list';
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
  renderMembers();
});

// Hero "View Directory" button
if(viewDirectoryBtn){
  viewDirectoryBtn.addEventListener('click', () => {
    document.getElementById('members').scrollIntoView({ behavior: 'smooth' });
  });
}

// Search and filter listeners
searchInput.addEventListener('input', renderMembers);
filterLevel.addEventListener('change', renderMembers);

// Fetch members from JSON
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load JSON');
    membersData = await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    // fallback data
    membersData = [
      {
        name: "Kampala Tech Hub",
        address: "Plot 12, Kampala Rd",
        phone: "+256 700 123456",
        website: "https://kampalatech.ug",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop",
        level: 3
      },
      {
        name: "Pearl Coffee Co.",
        address: "45 Jinja Rd, Kampala",
        phone: "+256 701 654321",
        website: "https://pearlcoffee.ug",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop",
        level: 2
      },
      {
        name: "Nile Safari Tours",
        address: "Ggaba Rd, Kampala",
        phone: "+256 775 987654",
        website: "https://nilesafaritours.ug",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
        level: 1
      }
    ];
  }
  renderMembers();
}

// Render members
function renderMembers() {
  const query = searchInput.value.toLowerCase();
  const levelFilter = filterLevel.value;

  const filtered = membersData.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.address.toLowerCase().includes(query) ||
      m.phone.includes(query);

    const matchesLevel =
      levelFilter === 'all' || String(m.level) === levelFilter;

    return matchesSearch && matchesLevel;
  });

  membersContainer.innerHTML = '';

  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  } else {
    noResults.style.display = 'none';
  }

  if (currentView === 'grid') {
    membersContainer.classList.remove('list');
    membersContainer.classList.add('members');
  } else {
    membersContainer.classList.add('list');
  }

  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <img src="${m.image}" alt="${m.name} logo">
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Visit Website</a>
      <div class="member-level">Level: ${membershipLabel(m.level)}</div>
    `;
    membersContainer.appendChild(card);
  });
}

function membershipLabel(level) {
  switch(level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    case 1: return 'Member';
    default: return 'Member';
  }
}

// Footer info
copyrightYear.textContent = new Date().getFullYear();
lastMod.textContent = document.lastModified;

// Init
fetchMembers();
