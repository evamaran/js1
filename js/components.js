// Loads external HTML components (header, footer, etc.) into the page.
// This keeps the layout consistent across all pages and avoids repeating code.

async function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return; // If the container doesn't exist on this page, skip.

  try {
    const response = await fetch(filePath);
    const html = await response.text();
    container.innerHTML = html; // Insert the component into the page
  } catch (error) {
    console.error("Failed to load component:", filePath, error);
  }
}

// Load the shared layout components on every page
loadComponent("header", "/components/header.html");
loadComponent("footer", "/components/footer.html");
