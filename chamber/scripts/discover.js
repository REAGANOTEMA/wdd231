async function loadDiscover() {
    const container = document.getElementById("discover-grid");
    const response = await fetch("data/discover.json");
    const places = await response.json();

    places.forEach(place => {
        const card = document.createElement("div");
        card.className = "discover-card";
        card.innerHTML = `
      <h2>${place.name}</h2>
      <figure><img src="${place.image}" alt="${place.name}"></figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="btn">Learn more</button>
    `;
        container.appendChild(card);
    });
}

function handleVisits() {
    const message = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diff = now - Number(lastVisit);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days < 1) {
            message.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            message.textContent = `You last visited 1 day ago.`;
        } else {
            message.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

document.addEventListener("DOMContentLoaded", () => {
    loadDiscover();
    handleVisits();
    document.getElementById("copyrightYear").textContent = new Date().getFullYear();
    document.getElementById("lastMod").textContent = document.lastModified;
});
