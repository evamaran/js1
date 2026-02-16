async function loadComponent(id, file) {
  const container = document.getElementById(id);
  try {
    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = html;

	if (id === "header") {
		document.dispatchEvent(new Event("header-loaded"));
	}

	} catch (error) {
		console.error("Failed to load component:", file, error);
	}
}

loadComponent("header", "/js1/components/header.html");
loadComponent("footer", "/js1/components/footer.html");