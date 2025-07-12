// Adobe & GA dataLayer setup

(function() {
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const pathname = window.location.pathname;
  let pageName = "generic";
  let pageType = "generic";
  let section = "general";

  if (pathname.includes("index")) {
    pageName = "home";
    pageType = "home";
    section = "home";
  } else if (pathname.includes("product")) {
    pageName = "product detail";
    pageType = "pdp";
    section = "shop";
  } else if (pathname.includes("cart")) {
    pageName = "cart";
    pageType = "cart";
    section = "shop";
  } else if (pathname.includes("checkout")) {
    pageName = "checkout";
    pageType = "checkout";
    section = "shop";
  } else if (pathname.includes("login") || pathname.includes("register")) {
    pageName = "login/register";
    pageType = "account";
    section = "user";
  } else if (pathname.includes("recipe")) {
    pageName = "recipe";
    pageType = "recipe";
    section = "recipes";
  } else if (pathname.includes("blog")) {
    pageName = "blog";
    pageType = "blog";
    section = "blogs";
  }

  window.digitalData = window.digitalData || {};
  window.digitalData.page = {
    pageInfo: {
      pageName,
      pageType,
      language: "en",
      section,
      pageURL: window.location.href
    }
  };

  window.digitalData.user = {
    loggedInStatus: localStorage.getItem("isLoggedIn") === "true" ? "logged-in" : "guest",
    fpid: getCookie("FPID") || ""
  };

  window.digitalData.events = [];
})();
