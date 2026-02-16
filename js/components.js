async function loadComponent(id, file) {
  const container = document.getElementById(id);
  try {
    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to load component:", file, error);
  }
}

loadComponent("header", "../components/header.html");
loadComponent("footer", "../components/footer.html");