function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, selectedSize) {
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
      image: product.image,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart(cart);
}