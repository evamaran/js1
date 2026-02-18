document.addEventListener("DOMContentLoaded", () => {

  const orderHistoryContainer = document.getElementById("order-history");
  const favoritesContainer = document.getElementById("favorite-items");

  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (lastOrder) {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Order #${lastOrder.orderNumber}</strong></p>
      <p>Total: ${lastOrder.total} NOK</p>
      <p>Items: ${lastOrder.items.length}</p>
    `;
    orderHistoryContainer.appendChild(div);
  } else {
    orderHistoryContainer.innerHTML = "<p>No previous orders.</p>";
  }

  if (favorites.length > 0) {
    favorites.forEach(item => {
      const p = document.createElement("p");
      p.textContent = item.title;
      favoritesContainer.appendChild(p);
    });
  } else {
    favoritesContainer.innerHTML = "<p>No saved favorites.</p>";
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
});