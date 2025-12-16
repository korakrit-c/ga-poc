(function () {
  var id = window.GA_MEASUREMENT_ID;
  if (!id || id === "G-GVF2NY18G9") return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  var script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id, {
    page_path: window.location.pathname + window.location.search,
  });

  window.trackCategoryView = function (category) {
    if (!category || !category.slug) return;
    window.gtag("event", "category_view", {
      category_slug: category.slug,
      category_name: category.name || category.slug,
    });
  };
})();
