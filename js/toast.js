function showToast(product) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast");

  toast.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <div class="toast-content">
      <div class="toast-title">${product.title} ble lagt i handlekurven</div>
      <div class="toast-actions">
        <button onclick="window.location.href='/checkout/index.html'">Gå til kurv</button>
      </div>
    </div>
    <button class="close-btn">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  toast.querySelector(".close-btn").addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}