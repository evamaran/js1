// Define the API URL
const apiUrl = 'https://v2.api.noroff.dev/rainy-days';

// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
