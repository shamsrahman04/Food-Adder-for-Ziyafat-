const categories = [
  { id: "starters", name: "Starters" },
  { id: "grill", name: "BBQ & Grill" },
  { id: "desi", name: "Desi Classics" },
  { id: "rice", name: "Rice & Biryani" },
  { id: "burgers", name: "Burgers" },
  { id: "pasta", name: "Pasta" },
  { id: "sides", name: "Sides" },
  { id: "desserts", name: "Desserts" },
];

const dishes = [
  {
    id: "chicken-wings",
    category: "starters",
    name: "Ziyafat chicken wings",
    description: "Smoky, sticky glaze with a little kick.",
    price: 850,
    tag: "HOUSE FAVOURITE",
    image: "photo-1527477396000-e27163b481c2",
  },
  {
    id: "loaded-nachos",
    category: "starters",
    name: "Loaded nachos",
    description: "Crisp corn chips, melted cheese, salsa.",
    price: 720,
    tag: "VEGETARIAN",
    image: "photo-1513456852971-30c0b8199d4d",
  },
  {
    id: "seekh-kebab",
    category: "grill",
    name: "Beef seekh kebab",
    description: "Char-grilled kebabs with mint chutney.",
    price: 1150,
    tag: "CHAR-GRILLED",
    image: "photo-1529042410759-befb1204b468",
  },
  {
    id: "chicken-tikka",
    category: "grill",
    name: "Chicken tikka platter",
    description: "Yoghurt-marinated, grilled over charcoal.",
    price: 1450,
    tag: "HOUSE FAVOURITE",
    image: "photo-1599487488170-d11ec9c172f0",
  },
  {
    id: "butter-chicken",
    category: "desi",
    name: "Butter chicken",
    description: "Slow-cooked tomato gravy, fresh cream.",
    price: 1350,
    tag: "HOUSE FAVOURITE",
    image: "photo-1603894584373-5ac82b2ae398",
  },
  {
    id: "karahi",
    category: "desi",
    name: "Chicken karahi",
    description: "Wok-tossed with tomato, ginger & green chilli.",
    price: 1550,
    tag: "CHEF'S PICK",
    image: "photo-1565557623262-b51c2513a641",
  },
  {
    id: "chicken-biryani",
    category: "rice",
    name: "Chicken dum biryani",
    description: "Aromatic basmati, tender chicken, raita.",
    price: 980,
    tag: "HOUSE FAVOURITE",
    image: "photo-1512058564366-18510be2db19",
  },
  {
    id: "mutton-pulao",
    category: "rice",
    name: "Mutton pulao",
    description: "Fragrant rice, slow-braised mutton.",
    price: 1250,
    tag: "SLOW COOKED",
    image: "photo-1512058564366-18510be2db19",
  },
  {
    id: "classic-burger",
    category: "burgers",
    name: "Classic beef burger",
    description: "Smash patty, cheddar, house sauce.",
    price: 1050,
    tag: "HOUSE FAVOURITE",
    image: "photo-1568901346375-23c9450c58cd",
  },
  {
    id: "crispy-chicken",
    category: "burgers",
    name: "Crispy chicken burger",
    description: "Crunchy chicken, slaw, pickled onion.",
    price: 950,
    tag: "CRISPY & JUICY",
    image: "photo-1606755962773-d324e0a13086",
  },
  {
    id: "alfredo-pasta",
    category: "pasta",
    name: "Creamy chicken alfredo",
    description: "Silky parmesan cream, grilled chicken.",
    price: 1250,
    tag: "CREAMY COMFORT",
    image: "photo-1645112411341-6c4fd023714a",
  },
  {
    id: "tomato-pasta",
    category: "pasta",
    name: "Roasted tomato penne",
    description: "Slow-roasted tomato, basil, shaved parmesan.",
    price: 980,
    tag: "VEGETARIAN",
    image: "photo-1473093295043-cdd812d0e601",
  },
  {
    id: "naan",
    category: "sides",
    name: "Garlic butter naan",
    description: "Fresh from the tandoor, brushed with butter.",
    price: 180,
    tag: "BAKED TO ORDER",
    image: "photo-1601050690597-df0568f70950",
  },
  {
    id: "fries",
    category: "sides",
    name: "Masala fries",
    description: "Crispy fries tossed in house masala.",
    price: 420,
    tag: "VEGETARIAN",
    image: "photo-1573080496219-bb080dd4f877",
  },
  {
    id: "brownie",
    category: "desserts",
    name: "Warm chocolate brownie",
    description: "Rich dark chocolate, vanilla ice cream.",
    price: 650,
    tag: "SWEET FINISH",
    image: "photo-1606313564200-e75d5e30476c",
  },
  {
    id: "gulab-jamun",
    category: "desserts",
    name: "Gulab jamun",
    description: "Soft milk dumplings in cardamom syrup.",
    price: 380,
    tag: "TWO PIECES",
    image: "photo-1606313564200-e75d5e30476c",
  },
];

const cart = new Map();
let activeCategory = "all";
let toastTimer;

const categoryList = document.querySelector("#categoryList");
const menuSections = document.querySelector("#menuSections");
const searchInput = document.querySelector("#searchInput");
const cartItems = document.querySelector("#cartItems");
const emptyState = document.querySelector("#emptyState");
const menuToggle = document.querySelector("#menuToggle");
const siteNavigation = document.querySelector("#siteNavigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation" : "Close navigation",
  );
  siteNavigation.hidden = isExpanded;
});

siteNavigation.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  siteNavigation.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || siteNavigation.hidden) return;
  siteNavigation.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
});

function formatPrice(amount) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

function renderCategories() {
  const buttons = [{ id: "all", name: "All menu" }, ...categories];
  categoryList.innerHTML = buttons
    .map(
      (category, index) => `
        <button class="category-button${activeCategory === category.id ? " active" : ""}" type="button" data-category="${category.id}" aria-pressed="${activeCategory === category.id}">
            <span class="category-icon">${category.id === "all" ? "✳" : String(index).padStart(2, "0")}</span>${category.name}
        </button>`,
    )
    .join("");
}

function getVisibleDishes() {
  const query = searchInput.value.trim().toLowerCase();
  return dishes.filter((dish) => {
    const matchesCategory =
      activeCategory === "all" || dish.category === activeCategory;
    const matchesQuery =
      !query ||
      `${dish.name} ${dish.description} ${dish.tag}`
        .toLowerCase()
        .includes(query);
    return matchesCategory && matchesQuery;
  });
}

function renderMenu() {
  const visibleDishes = getVisibleDishes();
  const visibleCategories = categories.filter((category) =>
    visibleDishes.some((dish) => dish.category === category.id),
  );

  menuSections.innerHTML = visibleCategories
    .map((category) => {
      const categoryDishes = visibleDishes.filter(
        (dish) => dish.category === category.id,
      );
      return `<section class="menu-section-group" aria-labelledby="heading-${category.id}">
            <div class="menu-section"><h3 id="heading-${category.id}">${category.name}</h3><span>${String(categoryDishes.length).padStart(2, "0")} ${categoryDishes.length === 1 ? "dish" : "dishes"}</span></div>
            ${categoryDishes
              .map(
                (
                  dish,
                  index,
                ) => `<article class="dish-card" style="animation-delay:${index * 45}ms">
                <img class="dish-image" src="https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=240&h=220&q=75" alt="${dish.name}" loading="lazy">
                <div class="dish-info"><div class="dish-name-row"><strong class="dish-name">${dish.name}</strong><span class="dish-price">${formatPrice(dish.price)}</span></div><p class="dish-description">${dish.description}</p><span class="diet-tag">${dish.tag}</span></div>
                <button class="add-button" type="button" data-add="${dish.id}" aria-label="Add ${dish.name} to your order">+</button>
            </article>`,
              )
              .join("")}
        </section>`;
    })
    .join("");

  const categoryName = categories.find(
    (category) => category.id === activeCategory,
  )?.name;
  document.querySelector("#resultsLabel").textContent = searchInput.value.trim()
    ? `Results for “${searchInput.value.trim()}”`
    : categoryName || "All dishes";
  document.querySelector("#dishCount").textContent = visibleDishes.length;
  emptyState.hidden = visibleDishes.length > 0;
  menuSections.hidden = visibleDishes.length === 0;
}

function renderCart() {
  const entries = [...cart.entries()];
  const itemCount = entries.reduce(
    (total, [, quantity]) => total + quantity,
    0,
  );
  const subtotal = entries.reduce(
    (total, [id, quantity]) =>
      total + dishes.find((dish) => dish.id === id).price * quantity,
    0,
  );

  cartItems.innerHTML = entries.length
    ? entries
        .map(([id, quantity]) => {
          const dish = dishes.find((item) => item.id === id);
          return `<div class="cart-line">
            <strong class="cart-line-name">${dish.name}</strong><span class="cart-line-total">${formatPrice(dish.price * quantity)}</span>
            <div class="quantity-control" aria-label="Quantity for ${dish.name}">
                <button type="button" data-change="${id}" data-amount="-1" aria-label="Remove one ${dish.name}">−</button>
                <span>${quantity}</span>
                <button type="button" data-change="${id}" data-amount="1" aria-label="Add one ${dish.name}">+</button>
            </div>
        </div>`;
        })
        .join("")
    : '<div class="cart-empty"><span class="empty-bowl" aria-hidden="true">✳</span><strong>Your table is waiting.</strong><p>Add something delicious<br>to get started.</p></div>';

  document.querySelector("#cartCount").textContent = itemCount;
  document.querySelector("#subtotal").textContent = formatPrice(subtotal);
  document.querySelector("#mobileCartCount").textContent = itemCount;
  document.querySelector("#mobileSubtotal").textContent = formatPrice(subtotal);
  document.querySelector("#checkoutButton").disabled = itemCount === 0;
  document.querySelector("#clearCart").hidden = itemCount === 0;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
});

searchInput.addEventListener("input", renderMenu);

menuSections.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.dataset.add;
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  showToast(
    `${dishes.find((dish) => dish.id === id).name} added to your order`,
  );
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = button.dataset.change;
  const nextQuantity = (cart.get(id) || 0) + Number(button.dataset.amount);
  if (nextQuantity > 0) cart.set(id, nextQuantity);
  else cart.delete(id);
  renderCart();
});

document.querySelector("#clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
});

document.querySelector("#changeTable").addEventListener("click", () => {
  const tableNumber = document.querySelector("#tableNumber");
  const table = window.prompt(
    "Which table are you at?",
    tableNumber.textContent,
  );
  if (table && table.trim()) tableNumber.textContent = table.trim();
});

document.querySelector("#checkoutButton").addEventListener("click", () => {
  const entries = [...cart.entries()];
  const summary = entries
    .map(
      ([id, quantity]) =>
        `${quantity} × ${dishes.find((dish) => dish.id === id).name}`,
    )
    .join("\n");
  if (
    !window.confirm(
      `Confirm your order?\n\n${summary}\n\nSubtotal: ${document.querySelector("#subtotal").textContent}`,
    )
  )
    return;
  cart.clear();
  renderCart();
  showToast("Order received. Our kitchen is on it!");
});

document.querySelector("#viewOrder").addEventListener("click", () => {
  document
    .querySelector("#orderPanel")
    .scrollIntoView({ behavior: "smooth", block: "center" });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderCategories();
renderMenu();
renderCart();
