
const fallbackRestaurants = [
  {
    id: "masala-mint",
    name: "Masala Mint",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: 28,
    openNow: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "butter-paneer", name: "Butter Paneer Bowl", price: 249 },
      { id: "chicken-biryani", name: "Hyderabadi Biryani", price: 299 }
    ]
  },
  {
    id: "urban-wok",
    name: "Urban Wok",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: 22,
    openNow: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "hakka-noodles", name: "Hakka Noodles", price: 189 },
      { id: "manchurian", name: "Veg Manchurian", price: 209 }
    ]
  },
  {
    id: "slice-studio",
    name: "Slice Studio",
    cuisine: "Italian",
    rating: 4.4,
    deliveryTime: 34,
    openNow: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "margherita", name: "Margherita Pizza", price: 229 },
      { id: "alfredo-pasta", name: "Alfredo Pasta", price: 259 }
    ]
  },
  {
    id: "tokyo-tray",
    name: "Tokyo Tray",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: 38,
    openNow: true,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "salmon-sushi", name: "Salmon Sushi Set", price: 399 },
      { id: "ramen-bowl", name: "Miso Ramen", price: 349 }
    ]
  },
  {
    id: "burger-bay",
    name: "Burger Bay",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: 20,
    openNow: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "classic-burger", name: "Classic Cheese Burger", price: 199 },
      { id: "peri-fries", name: "Peri Peri Fries", price: 119 }
    ]
  },
  {
    id: "green-fork",
    name: "Green Fork",
    cuisine: "Healthy",
    rating: 4.6,
    deliveryTime: 26,
    openNow: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    dishes: [
      { id: "quinoa-salad", name: "Quinoa Power Salad", price: 239 },
      { id: "smoothie-bowl", name: "Berry Smoothie Bowl", price: 219 }
    ]
  }
];

const state = {
  restaurants: [],
  filteredRestaurants: [],
  cart: new Map(),
  search: "",
  cuisine: "all",
  minRating: 0,
  maxDelivery: "all",
  openNow: false
};

const elements = {
  grid: document.querySelector("#restaurantGrid"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  cuisineFilter: document.querySelector("#cuisineFilter"),
  ratingFilter: document.querySelector("#ratingFilter"),
  ratingOutput: document.querySelector("#ratingOutput"),
  deliveryFilter: document.querySelector("#deliveryFilter"),
  openNowFilter: document.querySelector("#openNowFilter"),
  clearFilters: document.querySelector("#clearFilters"),
  apiStatus: document.querySelector("#apiStatus"),
  resultHeading: document.querySelector("#resultHeading"),
  openCart: document.querySelector("#openCart"),
  closeCart: document.querySelector("#closeCart"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartCount: document.querySelector("#cartCount"),
  cartItems: document.querySelector("#cartItems"),
  subtotal: document.querySelector("#subtotal"),
  deliveryFee: document.querySelector("#deliveryFee"),
  taxAmount: document.querySelector("#taxAmount"),
  grandTotal: document.querySelector("#grandTotal"),
  checkoutBtn: document.querySelector("#checkoutBtn"),
  checkoutDialog: document.querySelector("#checkoutDialog"),
  checkoutForm: document.querySelector("#checkoutForm"),
  toast: document.querySelector("#toast"),
  themeToggle: document.querySelector("#themeToggle"),
  navLinks: document.querySelectorAll(".nav-link"),
  pageViews: document.querySelectorAll(".page-view"),
  menuToggle: document.querySelector("#menuToggle"),
  navMenu: document.querySelector("#navMenu"),
  surpriseMe: document.querySelector("#surpriseMe"),
  offerButtons: document.querySelectorAll("[data-copy-code]"),
  contactForm: document.querySelector("#contactForm"),
  openCartFromOrders: document.querySelector("#openCartFromOrders")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindEvents();
  const initialView = window.location.hash.replace("#", "") || "home";
  if (document.querySelector(`[data-page="${initialView}"]`)) {
    navigateTo(initialView);
  }
  loadRestaurants();
}

function bindEvents() {
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const view = link.dataset.view;
      if (!view) return;
      event.preventDefault();
      navigateTo(view);
    });
  });

  elements.menuToggle.addEventListener("click", () => {
    elements.navMenu.classList.toggle("open");
  });

  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = elements.searchInput.value.trim().toLowerCase();
    navigateTo("restaurants");
    applyFilters();
  });

  elements.searchInput.addEventListener("input", () => {
    state.search = elements.searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  elements.cuisineFilter.addEventListener("change", () => {
    state.cuisine = elements.cuisineFilter.value;
    applyFilters();
  });

  elements.ratingFilter.addEventListener("input", () => {
    state.minRating = Number(elements.ratingFilter.value);
    elements.ratingOutput.textContent = state.minRating ? `${state.minRating}+ stars` : "Any rating";
    applyFilters();
  });

  elements.deliveryFilter.addEventListener("change", () => {
    state.maxDelivery = elements.deliveryFilter.value;
    applyFilters();
  });

  elements.openNowFilter.addEventListener("change", () => {
    state.openNow = elements.openNowFilter.checked;
    applyFilters();
  });

  elements.clearFilters.addEventListener("click", resetFilters);
  elements.openCart.addEventListener("click", openCart);
  elements.closeCart.addEventListener("click", closeCart);
  elements.openCartFromOrders.addEventListener("click", openCart);
  elements.cartDrawer.addEventListener("click", (event) => {
    if (event.target === elements.cartDrawer) closeCart();
  });

  elements.surpriseMe.addEventListener("click", () => {
    const visible = state.filteredRestaurants.length ? state.filteredRestaurants : state.restaurants;
    if (!visible.length) return;
    const restaurant = visible[Math.floor(Math.random() * visible.length)];
    state.search = restaurant.name.toLowerCase();
    elements.searchInput.value = restaurant.name;
    applyFilters();
    showToast(`${restaurant.name} looks perfect right now.`);
  });

  elements.offerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.dataset.copyCode;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      showToast(`${code} copied for checkout.`);
    });
  });

  elements.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    elements.contactForm.reset();
    showToast("Message sent. Support will contact you soon.");
  });

  elements.checkoutBtn.addEventListener("click", () => {
    if (!state.cart.size) {
      showToast("Add at least one dish before checkout.");
      return;
    }
    elements.checkoutDialog.showModal();
  });

  elements.checkoutForm.addEventListener("submit", (event) => {
    if (event.submitter.value === "cancel") return;
    event.preventDefault();
    const orderId = `BS${Math.floor(10000 + Math.random() * 90000)}`;
    state.cart.clear();
    updateCart();
    elements.checkoutDialog.close();
    closeCart();
    elements.checkoutForm.reset();
    showToast(`Order placed successfully. Your order ID is ${orderId}.`);
  });

  elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    elements.themeToggle.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";
  });
}

function navigateTo(view) {
  elements.pageViews.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === view);
  });

  elements.navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.view === view);
  });

  elements.navMenu.classList.remove("open");
  window.location.hash = view;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadRestaurants() {
  try {
    const apiRestaurants = await fetchRestaurantsFromApi();
    state.restaurants = apiRestaurants.length ? apiRestaurants : fallbackRestaurants;
    elements.apiStatus.textContent = apiRestaurants.length
      ? "Live restaurant data loaded from RapidAPI."
      : "API connected, using curated restaurant cards for menu and cart demo.";
  } catch (error) {
    state.restaurants = fallbackRestaurants;
    elements.apiStatus.textContent = "RapidAPI request failed, showing demo restaurants.";
    console.warn(error);
  }

  populateCuisineFilter();
  applyFilters();
}

async function fetchRestaurantsFromApi() {
  const headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST,
    "Content-Type": "application/json"
  };

  const requests = [
    fetch(`${API_BASE}/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language: "en_US",
        location_id: "297704",
        limit: "12",
        currency: "INR",
        offset: "0"
      })
    }),
    fetch(`${API_BASE}/restaurants/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language: "en_US",
        location_id: "297704",
        limit: "12",
        currency: "INR",
        offset: "0"
      })
    }),
    fetch(`${API_BASE}/languages`, { method: "GET", headers })
  ];

  const results = await Promise.allSettled(requests);
  for (const result of results) {
    if (result.status !== "fulfilled" || !result.value.ok) continue;
    const payload = await result.value.json();
    const normalized = normalizeApiRestaurants(payload);
    if (normalized.length) return normalized;
  }
  return [];
}

function normalizeApiRestaurants(payload) {
  const candidates = Array.isArray(payload)
    ? payload
    : payload?.results?.data || payload?.results || payload?.data || payload?.restaurants || [];

  if (!Array.isArray(candidates)) return [];

  return candidates
    .filter((item) => item?.name || item?.restaurant_name)
    .slice(0, 12)
    .map((item, index) => {
      const cuisine = item.cuisine?.[0]?.name || item.cuisine || item.category?.name || "Popular";
      const name = item.name || item.restaurant_name;
      const rating = Number(item.rating || item.average_rating || 4 + Math.random()).toFixed(1);
      const deliveryTime = 20 + (index % 5) * 5;
      return {
        id: String(item.location_id || item.id || name).toLowerCase().replace(/\s+/g, "-"),
        name,
        cuisine,
        rating: Math.min(5, Number(rating)),
        deliveryTime,
        openNow: item.open_now_text ? !String(item.open_now_text).toLowerCase().includes("closed") : index % 4 !== 0,
        image: item.photo?.images?.large?.url || fallbackRestaurants[index % fallbackRestaurants.length].image,
        dishes: buildDemoDishes(name, cuisine, index)
      };
    });
}

function buildDemoDishes(name, cuisine, index) {
  const base = 169 + index * 12;
  return [
    { id: `${name}-signature`.toLowerCase().replace(/\W+/g, "-"), name: `${cuisine} Signature Plate`, price: base },
    { id: `${name}-combo`.toLowerCase().replace(/\W+/g, "-"), name: "Chef's Combo", price: base + 70 }
  ];
}

function populateCuisineFilter() {
  const cuisines = [...new Set(state.restaurants.map((restaurant) => restaurant.cuisine))].sort();
  elements.cuisineFilter.innerHTML = '<option value="all">All cuisines</option>';
  cuisines.forEach((cuisine) => {
    const option = document.createElement("option");
    option.value = cuisine;
    option.textContent = cuisine;
    elements.cuisineFilter.append(option);
  });
}

function applyFilters() {
  state.filteredRestaurants = state.restaurants.filter((restaurant) => {
    const matchesSearch = !state.search
      || restaurant.name.toLowerCase().includes(state.search)
      || restaurant.cuisine.toLowerCase().includes(state.search)
      || restaurant.dishes.some((dish) => dish.name.toLowerCase().includes(state.search));
    const matchesCuisine = state.cuisine === "all" || restaurant.cuisine === state.cuisine;
    const matchesRating = restaurant.rating >= state.minRating;
    const matchesDelivery = state.maxDelivery === "all" || restaurant.deliveryTime <= Number(state.maxDelivery);
    const matchesOpen = !state.openNow || restaurant.openNow;
    return matchesSearch && matchesCuisine && matchesRating && matchesDelivery && matchesOpen;
  });

  renderRestaurants();
}

function renderRestaurants() {
  elements.grid.innerHTML = "";
  elements.resultHeading.textContent = `${state.filteredRestaurants.length} restaurants found`;

  if (!state.filteredRestaurants.length) {
    elements.grid.innerHTML = '<div class="empty-state">No restaurants match your filters. Try another cuisine or rating.</div>';
    return;
  }

  state.filteredRestaurants.forEach((restaurant) => {
    const card = document.createElement("article");
    card.className = "restaurant-card";
    card.innerHTML = `
      <figure>
        <img src="${restaurant.image}" alt="${restaurant.name} food">
        <span class="badge">${restaurant.openNow ? "Open now" : "Closed"}</span>
      </figure>
      <div class="card-body">
        <h3>${restaurant.name}</h3>
        <div class="meta">
          <span>${restaurant.cuisine}</span>
          <span>★ ${restaurant.rating} · ${restaurant.deliveryTime} min</span>
        </div>
        <div class="dish-list">
          ${restaurant.dishes.map((dish) => `
            <div class="dish-row">
              <div>
                <p>${dish.name}</p>
                <small>${formatMoney(dish.price)}</small>
              </div>
              <button type="button" data-restaurant-id="${restaurant.id}" data-dish-id="${dish.id}">Add</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    card.querySelectorAll("button[data-dish-id]").forEach((button) => {
      button.addEventListener("click", () => addToCart(button.dataset.restaurantId, button.dataset.dishId));
    });

    elements.grid.append(card);
  });
}

function addToCart(restaurantId, dishId) {
  const restaurant = state.restaurants.find((item) => item.id === restaurantId);
  const dish = restaurant?.dishes.find((item) => item.id === dishId);
  if (!restaurant || !dish) return;

  const key = `${restaurantId}-${dishId}`;
  const existing = state.cart.get(key);
  state.cart.set(key, {
    ...dish,
    key,
    restaurant: restaurant.name,
    quantity: existing ? existing.quantity + 1 : 1
  });

  updateCart();
  showToast(`${dish.name} added to cart.`);
}

function updateCart() {
  elements.cartItems.innerHTML = "";

  if (!state.cart.size) {
    elements.cartItems.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
  } else {
    state.cart.forEach((item) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      row.innerHTML = `
        <h3>${item.name}</h3>
        <small>${item.restaurant}</small>
        <div class="quantity-row">
          <strong>${formatMoney(item.price * item.quantity)}</strong>
          <div class="qty-controls">
            <button type="button" data-action="decrease" aria-label="Decrease ${item.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" aria-label="Increase ${item.name}">+</button>
          </div>
        </div>
      `;
      row.querySelector('[data-action="decrease"]').addEventListener("click", () => changeQuantity(item.key, -1));
      row.querySelector('[data-action="increase"]').addEventListener("click", () => changeQuantity(item.key, 1));
      elements.cartItems.append(row);
    });
  }

  const subtotal = [...state.cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal ? 39 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const count = [...state.cart.values()].reduce((sum, item) => sum + item.quantity, 0);

  elements.cartCount.textContent = count;
  elements.subtotal.textContent = formatMoney(subtotal);
  elements.deliveryFee.textContent = formatMoney(deliveryFee);
  elements.taxAmount.textContent = formatMoney(tax);
  elements.grandTotal.textContent = formatMoney(total);
}

function changeQuantity(key, delta) {
  const item = state.cart.get(key);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart.delete(key);
  } else {
    state.cart.set(key, item);
  }
  updateCart();
}

function resetFilters() {
  state.search = "";
  state.cuisine = "all";
  state.minRating = 0;
  state.maxDelivery = "all";
  state.openNow = false;
  elements.searchInput.value = "";
  elements.cuisineFilter.value = "all";
  elements.ratingFilter.value = "0";
  elements.ratingOutput.textContent = "Any rating";
  elements.deliveryFilter.value = "all";
  elements.openNowFilter.checked = false;
  applyFilters();
}

function openCart() {
  elements.cartDrawer.classList.add("open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  elements.cartDrawer.classList.remove("open");
  elements.cartDrawer.setAttribute("aria-hidden", "true");
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2600);
}
