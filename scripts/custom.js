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
