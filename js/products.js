// This is the URL to the API that gives us the products.
// If your assignment uses a different API, you can change this.
const API_URL = "https://v2.api.noroff.dev/rainy-days";

// This finds the empty <div> in index.html where we will put the products.
const productListContainer = document.getElementById("product-list");

// This function shows an error message if something goes wrong.
function showError(message) {
  // Replace the content of the <div> with the error message.
  productListContainer.innerHTML = `<p>${message}</p>`;
}

// This function gets the products from the API.
async function fetchProducts() {
  // Show a loading message while we wait for the API.
  productListContainer.innerHTML = "<p>Loading products...</p>";

  try {
    // Ask the API for the product data.
    const response = await fetch(API_URL);

    // If the API gives an error (like 404), stop and show a message.
    if (!response.ok) {
      showError("Could not load products.");
      return;
    }

    // Turn the API response into actual JavaScript data.
    const data = await response.json();

    // Some APIs put the products inside "data", so we check both.
    const products = data.data || data;

    // Now we show the products on the page.
    renderProducts(products);

  } catch (error) {
    // If something breaks (like no internet), show a message.
    showError("Something went wrong. Please try again later.");
  }
}

// This function takes the product list and creates HTML for each product.
function renderProducts(products) {
  // If there are no products, show a message.
  if (!products || products.length === 0) {
    productListContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  // Make HTML for each product.
  const productHTML = products
    .map(product => {
      // Try to get the product title, price and image.
      // If something is missing, we use a fallback value.
      const title = product.title || "No title";
      const price = product.price || "No price";
      const image =
        product.image ||
        (product.images && product.images[0]?.src) ||
        "https://via.placeholder.com/300x400?text=No+image";

      // This is the HTML for ONE product card.
      return `
        <article class="product-card">
          <img src="${image}" alt="${title}">
          <h3>${title}</h3>
          <p>${price} NOK</p>
          <!-- This link will later take the user to a product details page -->
          <a href="product.html?id=${product.id}">View details</a>
        </article>
      `;
    })
    .join(""); // Join all product cards into one big string.

  // Put all the product cards into the <div> on the page.
  productListContainer.innerHTML = productHTML;
}

// This starts everything when the page loads.
fetchProducts();
