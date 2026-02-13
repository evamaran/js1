import { getCart, saveCart, updateCartCount } from "./cart.js";

const cartContainer = document.getElementById("cart");

// 1. Render cart
function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateCartCount();
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">

      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <p>Price: ${item.price} NOK</p>

        <div class="cart-quantity">
          <button class="qty-btn decrease" data-id="${item.id}" data-size="${item.size}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}" data-size="${item.size}">+</button>
        </div>

        <button class="remove-btn" data-id="${item.id}" data-size="${item.size}">
          Remove
        </button>
      </div>
    </div>
  `).join("");

  // Add total price
  const total = calculateTotal(cart);
  cartContainer.innerHTML += `
    <div class="cart-total">
      <h2>Total: ${total} NOK</h2>
    </div>
  `;

  attachEventListeners();
  updateCartCount();
}

// 2. Attach event listeners
function attachEventListeners() {
  // Increase quantity
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantity(btn.dataset.id, btn.dataset.size, +1);
    });
  });

  // Decrease quantity
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantity(btn.dataset.id, btn.dataset.size, -1);
    });
  });

  // Remove item
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeItem(btn.dataset.id, btn.dataset.size);
    });
  });
}

// 3. Update quantity
function updateQuantity(id, size, change) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

// 4. Remove item
function removeItem(id, size) {
  const cart = getCart().filter(item => !(item.id === id && item.size === size));
  saveCart(cart);
  renderCart();
}

// 5. Calculate total
function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// 6. Init
renderCart();
updateCartCount();
