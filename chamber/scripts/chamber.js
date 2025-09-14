document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Mobile Hamburger Menu
  // -----------------------------
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    mobileMenu.style.display = expanded ? "none" : "block";
    mobileMenu.setAttribute("aria-hidden", expanded);
  });

  // -----------------------------
  // Members Data
  // -----------------------------
  const members = [
    { name: "Alpha Ltd", level: "1", image: "images/alpha.webp", email: "alpha@example.com", phone: "+256700111222", location: "Kampala" },
    { name: "Beta Co", level: "2", image: "images/beta.webp", email: "beta@example.com", phone: "+256700333444", location: "Kampala" },
    { name: "Gamma Inc", level: "3", image: "images/gama.webp", email: "gamma@example.com", phone: "+256700555666", location: "Kampala" },
    { name: "Delta LLC", level: "1", image: "images/delta.webp", email: "delta@example.com", phone: "+256700777888", location: "Kampala" }
  ];

  // -----------------------------
  // Render Members
  // -----------------------------
  const membersContainer = document.getElementById("membersContainer");
  const noResults = document.getElementById("noResults");

  function renderMembers(list) {
    membersContainer.innerHTML = "";
    if (list.length === 0) {
      noResults.style.display = "block";
      return;
    }
    noResults.style.display = "none";

    list.forEach(member => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Level:</strong> ${member.level}</p>
        <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Location:</strong> ${member.location}</p>
      `;
      membersContainer.appendChild(card);
      card.style.opacity = 0;
      setTimeout(() => { card.style.opacity = 1; }, 100);
    });
  }

  renderMembers(members);

  // -----------------------------
  // Filter & Search
  // -----------------------------
  const filterSelect = document.getElementById("filterLevel");
  const searchInput = document.getElementById("q");

  function filterMembers() {
    const query = searchInput.value.toLowerCase();
    const level = filterSelect.value;
    const filtered = members.filter(member => {
      const matchLevel = level === "all" || member.level === level;
      const matchSearch = member.name.toLowerCase().includes(query) ||
                          member.email.toLowerCase().includes(query) ||
                          member.phone.includes(query) ||
                          member.location.toLowerCase().includes(query);
      return matchLevel && matchSearch;
    });
    renderMembers(filtered);
  }

  filterSelect.addEventListener("change", filterMembers);
  searchInput.addEventListener("input", filterMembers);

  // -----------------------------
  // Grid / List Toggle
  // -----------------------------
  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");

  gridBtn.addEventListener("click", () => {
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
    membersContainer.style.display = "grid";
    membersContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px,1fr))";
  });

  listBtn.addEventListener("click", () => {
    gridBtn.setAttribute("aria-pressed", "false");
    listBtn.setAttribute("aria-pressed", "true");
    membersContainer.style.display = "block";
  });

  // -----------------------------
  // Hero CTA Smooth Scroll
  // -----------------------------
  document.querySelectorAll(".hero-cta").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      document.getElementById("members").scrollIntoView({ behavior: "smooth" });
    });
  });

  // -----------------------------
  // Footer Info
  // -----------------------------
  document.getElementById("lastMod").textContent = new Date(document.lastModified).toLocaleDateString();
  document.getElementById("copyrightYear").textContent = new Date().getFullYear();

  // -----------------------------
  // Spotlight Members (Gold/Silver)
  // -----------------------------
  const spotlightContainer = document.getElementById("spotlight-container");
  if (spotlightContainer) {
    const goldSilverMembers = members.filter(m => m.level === "2" || m.level === "3");

    function getRandomSpotlights(list, count = 3) {
      const shuffled = [...list].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    function renderSpotlights() {
      spotlightContainer.innerHTML = "";
      const spotlights = getRandomSpotlights(goldSilverMembers, 3);
      spotlights.forEach(member => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p><strong>Level:</strong> ${member.level}</p>
          <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
          <p><strong>Location:</strong> ${member.location}</p>
        `;
        spotlightContainer.appendChild(card);
        card.style.opacity = 0;
        setTimeout(() => { card.style.opacity = 1; }, 100);
      });
    }

    renderSpotlights();
  }

  // -----------------------------
  // Weather API (OpenWeatherMap)
  // -----------------------------
  const weatherDisplay = document.getElementById("weather-display");
  if (weatherDisplay) {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your key
    const city = "Kampala,UG";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const today = data.list[0];
        const forecast = data.list.filter((_, i) => i % 8 === 0).slice(0, 3);
        let html = `<p><strong>Current Temp:</strong> ${today.main.temp.toFixed(1)}°C</p>
                    <p><strong>Weather:</strong> ${today.weather[0].description}</p>
                    <h4>3-Day Forecast:</h4><ul>`;
        forecast.forEach(day => {
          const date = new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          html += `<li>${date}: ${day.main.temp.toFixed(1)}°C, ${day.weather[0].description}</li>`;
        });
        html += "</ul>";
        weatherDisplay.innerHTML = html;
      })
      .catch(() => weatherDisplay.textContent = "Unable to load weather data.");
  }
});
