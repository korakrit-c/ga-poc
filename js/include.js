(function () {
  function joinUrl(base, path) {
    if (!base) return path;
    if (base.endsWith("/") && path.startsWith("/")) return base + path.slice(1);
    if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
    return base + path;
  }

  async function loadIncludes() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var src = node.getAttribute("data-include");
      var url = joinUrl(window.SITE_BASE || "", src);
      var res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) {
        node.innerHTML = "<!-- include failed: " + src + " -->";
        continue;
      }
      node.innerHTML = await res.text();
    }
    document.dispatchEvent(new CustomEvent("includes:loaded"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
