const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.getElementById("product-details");

// 1. Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. Fetch one product
async function fetchProduct() {
  container.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const product = data.data;

    renderProduct(product);
  } catch (error) {
    container.innerHTML = "<p>Could not load product.</p>";
  }
}

// 3. Render product
function renderProduct(product) {
  console.log(product);
  const image =
    product.images?.[0]?.src ||
    product.image ||
    "https://via.placeholder.com/400x500?text=No+image";

  container.innerHTML = `
    <section class="product-details-card">
      <img src="${image}" alt="${product.title}">
      <div class="details-text">
        <h1>${product.title}</h1>
        <p class="price">${product.price} NOK</p>
        <p>${product.description}</p>
        <button class="btn-add">Add to cart</button>
      </div>
    </section>
  `;
}

fetchProduct();