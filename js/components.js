// Loads shared layout components (header and footer) into the page
function getBasePath() {
  const depth = window.location.pathname.split("/").length - 3;
  return depth > 0 ? "../".repeat(depth) : "";
}

const base = getBasePath();

async function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(base + filePath);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to load component:", base + filePath, error);
  }
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");