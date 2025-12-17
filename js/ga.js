(function () {
  var id = "G-GVF2NY18G9";
  if (typeof window.GA_MEASUREMENT_ID === "string" && window.GA_MEASUREMENT_ID) {
    id = window.GA_MEASUREMENT_ID;
  }
  if (!id || id === "G-XXXXXXXXXX") return;

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
})();
