(function () {
  "use strict";

  var nav = document.getElementById("header-nav");
  var scrollTopBtn = document.getElementById("scrolltop");
  var ticking = false;

  function updateOnScroll() {
    var shouldShrink = window.scrollY > 10;
    if (nav) nav.classList.toggle("shrink", shouldShrink);
    if (scrollTopBtn) {
      scrollTopBtn.style.visibility = shouldShrink ? "visible" : "hidden";
      scrollTopBtn.style.opacity = shouldShrink ? 1 : 0;
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateOnScroll();

  // Cierra el menú móvil al elegir un link (evita que quede abierto tras navegar)
  var navCollapse = document.getElementById("navbarSupportedContent");
  if (navCollapse && window.bootstrap) {
    var links = navCollapse.querySelectorAll(".nav-link, .btn");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navCollapse.classList.contains("show")) {
          var collapseInstance = window.bootstrap.Collapse.getInstance(navCollapse) || new window.bootstrap.Collapse(navCollapse, { toggle: false });
          collapseInstance.hide();
        }
      });
    });
  }

  // Carga el formulario de contacto (iframe) solo cuando el usuario lo pide.
  // Evita que el autofocus del formulario embebido scrollee la página sola.
  var loadFormBtn = document.getElementById("loadContactFormBtn");
  var contactIframe = document.getElementById("contactFormIframe");
  var contactPlaceholder = document.getElementById("contactFormPlaceholder");
  if (loadFormBtn && contactIframe && contactPlaceholder) {
    loadFormBtn.addEventListener("click", function () {
      contactIframe.src = contactIframe.dataset.src;
      contactIframe.style.display = "block";
      contactPlaceholder.style.display = "none";
    });
  }
})();

// Modo oscuro
(function () {
  "use strict";

  var THEME_KEY = "setea-theme";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("themeToggle");
  var metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function updateToggleUI(theme) {
    if (!toggleBtn) return;
    var icon = toggleBtn.querySelector("i");
    if (icon) icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    toggleBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    if (metaThemeColor) metaThemeColor.setAttribute("content", theme === "dark" ? "#12181a" : "#7FB8A4");
  }

  updateToggleUI(root.getAttribute("data-theme") || "light");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      updateToggleUI(next);
    });
  }
})();
