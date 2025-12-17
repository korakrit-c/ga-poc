(function () {
  function joinUrl(base, path) {
    if (!base) return path;
    if (base.endsWith("/") && path.startsWith("/")) return base + path.slice(1);
    if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
    return base + path;
  }

  function setText(text) {
    var el = document.getElementById("site-version");
    if (!el) return;
    el.textContent = text;
  }

  async function loadVersion() {
    try {
      var url = joinUrl(window.SITE_BASE || "./", "meta/version.json");
      var res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) return;
      var data = await res.json();
      if (!data) return;
      var sha = data.shortSha || (data.sha ? String(data.sha).slice(0, 7) : "");
      var when = data.builtAt ? " • " + data.builtAt : "";
      if (sha) setText("v" + sha + when);
    } catch (_err) {
      return;
    }
  }

  document.addEventListener("includes:loaded", function () {
    loadVersion();
  });
})();
