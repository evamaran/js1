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

  const image = product.image?.url || "https://via.placeholder.com/400x500?text=No+image";
  const alt = product.image?.alt || product.title;

  container.innerHTML = `
    <section class="product-details-card">
      
      <div class="product-image">
        <img src="${image}" alt="${alt}">
      </div>

      <div class="product-info">
        <h1>${product.title}</h1>
        <p class="price">${product.price} NOK</p>
        <p class="description">${product.description}</p>

        <label for="size">Size</label>
        <select id="size" class="size-select">
          ${product.sizes
            .map(size => `<option value="${size}">${size}</option>`)
            .join("")}
        </select>

        <button class="btn-add">Add to cart</button>
      </div>

    </section>
  `;
}

fetchProduct();