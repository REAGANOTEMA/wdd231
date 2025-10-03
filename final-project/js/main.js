// js/main.js
import { fetchItems } from './data.js';

// UI elements
const container = document.getElementById('items-container');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.navbar ul');

// Modal elements
const modal = document.getElementById('item-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalMeta = document.getElementById('modal-meta');
const modalClose = document.querySelector('.modal-close');
const modalAddBtn = document.getElementById('modal-add-to-cart');

let currentItem = null;

// ✅ Responsive hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('active');
    });
}

// ✅ Cart helpers (localStorage)
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
    alert(`${item.title} added to cart. Items in cart: ${getCart().length}`);
}

// ✅ Render items dynamically
function renderItems(items) {
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'item-card';
        card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <h3>${item.title}</h3>
      <p class="meta"><strong>Category:</strong> ${item.category} • <strong>Price:</strong> ${item.price}</p>
      <p>${item.description}</p>
      <div class="card-actions">
        <button class="details-btn" data-id="${item.id}">Details</button>
        <button class="add-btn" data-id="${item.id}">Add to Cart</button>
      </div>
    `;
        container.appendChild(card);
    });

    // Delegate clicks
    container.addEventListener('click', handleCardClick);
}

function handleCardClick(e) {
    const detailsBtn = e.target.closest('.details-btn');
    const addBtn = e.target.closest('.add-btn');

    if (detailsBtn) {
        const id = Number(detailsBtn.dataset.id);
        openDetails(id);
    }

    if (addBtn) {
        const id = Number(addBtn.dataset.id);
        const item = window.__fetchedItems.find(it => it.id === id);
        if (item) addToCart(item);
    }
}

// ✅ Open modal
function openDetails(id) {
    const item = window.__fetchedItems.find(it => it.id === id);
    if (!item) return;
    currentItem = item;
    modalTitle.textContent = item.title;
    modalImg.src = item.image;
    modalImg.alt = item.title;
    modalDesc.textContent = item.description;
    modalMeta.textContent = `Category: ${item.category} — Price: ${item.price}`;
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-close').focus();
}

// ✅ Close modal
function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    currentItem = null;
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
    }
});
modalAddBtn.addEventListener('click', () => {
    if (currentItem) addToCart(currentItem);
    closeModal();
});

// ✅ Init
async function init() {
    const items = await fetchItems();
    window.__fetchedItems = items;

    renderItems(items);

    // Example: categories extracted with map+filter
    const categories = items.map(i => i.category).filter((v, i, a) => a.indexOf(v) === i);
    const preferred = localStorage.getItem('preferredCategory') || categories[0] || '';
    if (preferred) {
        console.log('Preferred category loaded:', preferred);
    }
}

init();
// Responsive hamburger menu with X animation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));

        // toggle menu
        navList.classList.toggle('active');

        // toggle X animation
        hamburger.classList.toggle('open');
    });
}
