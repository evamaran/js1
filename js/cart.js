// Get cart from localStorage
export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
export function addToCart(product, selectedSize) {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image?.url,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart(cart);
}

// ⭐ Legg de nye funksjonene HER — etter addToCart, men ikke inni den

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  const count = getCartCount();
  countElement.textContent = count;
}
