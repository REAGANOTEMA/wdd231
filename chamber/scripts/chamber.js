// Final Chamber.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    mobileMenu.style.display = expanded ? 'none' : 'block';
    mobileMenu.setAttribute('aria-hidden', expanded);
  });

  // View toggle (Grid / List)
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const membersContainer = document.getElementById('membersContainer');

  gridBtn.addEventListener('click', () => {
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
    membersContainer.style.display = 'grid';
    membersContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px,1fr))';
  });

  listBtn.addEventListener('click', () => {
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
    membersContainer.style.display = 'block';
  });

  // Filter members
  const filterSelect = document.getElementById('filterLevel');
  const searchInput = document.getElementById('q');
  const noResults = document.getElementById('noResults');

  // Example member data
  const members = [
    { name: 'Alpha Ltd', level: '1', image: 'images/alpha.webp', email:'alpha@example.com', phone:'+256700111222', location:'Kampala' },
    { name: 'Beta Co', level: '2', image: 'images/beta.webp', email:'beta@example.com', phone:'+256700333444', location:'Kampala' },
    { name: 'Gamma Inc', level: '3', image: 'images/gama.webp', email:'gamma@example.com', phone:'+256700555666', location:'Kampala' },
    { name: 'Delta LLC', level: '1', image: 'images/delta.webp', email:'delta@example.com', phone:'+256700777888', location:'Kampala' }
  ];

  // Render members
  function renderMembers(list) {
    membersContainer.innerHTML = '';
    if(list.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';
    list.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Level:</strong> ${member.level}</p>
        <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Location:</strong> ${member.location}</p>
      `;
      membersContainer.appendChild(card);
      // Animate cards fade-in
      card.style.opacity = 0;
      setTimeout(() => { card.style.opacity = 1; }, 100);
    });
  }

  // Initial render
  renderMembers(members);

  // Filter and search
  function filterMembers() {
    const query = searchInput.value.toLowerCase();
    const level = filterSelect.value;
    const filtered = members.filter(member => {
      const matchLevel = level === 'all' || member.level === level;
      const matchSearch = member.name.toLowerCase().includes(query) ||
                          member.email.toLowerCase().includes(query) ||
                          member.phone.includes(query) ||
                          member.location.toLowerCase().includes(query);
      return matchLevel && matchSearch;
    });
    renderMembers(filtered);
  }

  filterSelect.addEventListener('change', filterMembers);
  searchInput.addEventListener('input', filterMembers);

  // Hero CTA Scroll
  const viewBtn = document.getElementById('viewDirectoryBtn');
  viewBtn.addEventListener('click', () => {
    document.getElementById('members').scrollIntoView({ behavior: 'smooth' });
  });

  // Footer last modified and copyright
  document.getElementById('lastMod').textContent = new Date(document.lastModified).toLocaleDateString();
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
});
