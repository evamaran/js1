const API_URL = "https://v2.api.noroff.dev/rainy-days";

const productListContainer = document.getElementById("product-list");

function showError(message) {
  productListContainer.innerHTML = `<p>${message}</p>`;
}

async function fetchProducts() {
  productListContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      showError("Could not load products.");
      return;
    }

    const data = await response.json();
    const products = data.data || data;

    renderProducts(products);
  } catch (error) {
    showError("Something went wrong. Please try again later.");
  }
}

function renderProducts(products) {
  if (!products || products.length === 0) {
    productListContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  const productHTML = products
    .map(product => {
      const title = product.title || "No title";
      const price = product.price || "No price";
      const image =
        product.images?.[0]?.src ||
        "https://via.placeholder.com/300x400?text=No+image";

      return `
        <article class="product-card">
          <img src="${image}" alt="${title}">
          <h3>${title}</h3>
          <p>${price} NOK</p>
          <a href="product.html?id=${product.id}">View details</a>
        </article>
      `;
    })
    .join("");

  productListContainer.innerHTML = productHTML;
}

fetchProducts();
