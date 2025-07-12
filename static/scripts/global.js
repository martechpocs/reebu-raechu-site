function loadComponent(url, selector, position = "beforeend") {
  return fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.querySelector(selector);
      if (container) container.insertAdjacentHTML(position, data);
    })
    .catch(error => console.error("Component load error:", url, error));
}

function updateBreadcrumb() {
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  if (!breadcrumbCurrent) return;

  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");

  const formatted = pageName
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase()) || "Home";

    if(formatted!="" && formatted!="Home") {
      breadcrumbCurrent.textContent = formatted;
    } else if(formatted=="Home") {
      document.querySelector(".breadcrumb").textContent = "";
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("/components/header.html", "body", "afterbegin")
    .then(() => loadComponent("/components/topnav.html", ".top-nav", "beforeend"))
    .then(() => loadComponent("/components/footer.html", "body", "beforeend"))
    .then(() => loadComponent("/components/breadcrumb.html", "main", "afterbegin"))
    .then(() => updateBreadcrumb());
});
