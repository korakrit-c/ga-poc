(function () {
  function joinUrl(base, path) {
    if (!base) return path;
    if (base.endsWith("/") && path.startsWith("/")) return base + path.slice(1);
    if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
    return base + path;
  }

  function categoryParamSlug() {
    try {
      var params = new URLSearchParams(window.location.search || "");
      var raw = params.get("c");
      return raw ? String(raw).trim().toLowerCase() : "";
    } catch (_err) {
      return "";
    }
  }

  function setRootLinks() {
    var root = window.SITE_BASE || "./";
    var nodes = document.querySelectorAll("[data-root-href]");
    for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute("href", root);
  }

  function currentSlug() {
    var fromParam = categoryParamSlug();
    if (fromParam) return fromParam;
    var fromData = document.body && document.body.getAttribute("data-category");
    if (fromData) return fromData;
    var path = window.location.pathname.replace(/\/+$/, "");
    var parts = path.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "";
  }

  function buildNav(categories) {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    var slug = currentSlug();
    nav.innerHTML = "";
    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      var a = document.createElement("a");
      a.textContent = cat.name;
      a.href = joinUrl(window.SITE_BASE || "./", "category/?c=" + encodeURIComponent(cat.slug));
      if (slug === cat.slug) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    }
  }

  function buildHomeGrid(categories) {
    var grid = document.getElementById("category-grid");
    if (!grid) return;
    grid.innerHTML = "";
    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      var card = document.createElement("article");
      card.className = "card";

      var h2 = document.createElement("h2");
      h2.textContent = cat.name;
      card.appendChild(h2);

      var p = document.createElement("p");
      p.textContent = cat.description;
      card.appendChild(p);

      var link = document.createElement("a");
      link.className = "button";
      link.href = joinUrl(window.SITE_BASE || "./", "category/?c=" + encodeURIComponent(cat.slug));
      link.textContent = "Explore " + cat.name;
      card.appendChild(link);

      grid.appendChild(card);
    }
  }

  function fillCategoryPage(categories) {
    if (!document.body) return;
    var slug = document.body.getAttribute("data-category") || categoryParamSlug();
    if (!slug) return;
    var cat = null;
    for (var i = 0; i < categories.length; i++) if (categories[i].slug === slug) cat = categories[i];
    if (!cat) return;

    var title = document.getElementById("category-title");
    if (title) title.textContent = cat.name;
    var desc = document.getElementById("category-description");
    if (desc) desc.textContent = cat.description;

    document.title = cat.name + " Games";

    var list = document.getElementById("category-examples");
    if (list && Array.isArray(cat.examples)) {
      list.innerHTML = "";
      for (var j = 0; j < cat.examples.length; j++) {
        var li = document.createElement("li");
        li.textContent = cat.examples[j];
        list.appendChild(li);
      }
    }
  }

  async function init() {
    setRootLinks();
    var url = joinUrl(window.SITE_BASE || "./", "data/categories.json");
    var res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return;
    var data = await res.json();
    var categories = data && data.categories ? data.categories : [];
    buildNav(categories);
    buildHomeGrid(categories);
    fillCategoryPage(categories);
  }

  document.addEventListener("includes:loaded", function () {
    init().catch(function () {});
  });
})();
