const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.getElementById("product-list");

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    renderProducts(products);
  } catch (error) {
    container.innerHTML = "<p>Could not load products.</p>";
  }
}

function renderProducts(products) {
  container.innerHTML = "";

  products.forEach(product => {
    const image = product.image?.url || "https://via.placeholder.com/400x500?text=No+image";

    container.innerHTML += `
      <a href="product.html?id=${product.id}" class="product-card">
        <img src="${image}" alt="${product.image?.alt || product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} NOK</p>
      </a>
    `;
  });
}

fetchProducts();