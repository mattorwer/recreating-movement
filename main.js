document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const toggler = document.querySelector(".navbar-toggler");

  GLightbox({ selector: "[data-glightbox]" });

  // Hamburger-Menü nach Klick schließen (nur wenn Toggler sichtbar)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (toggler && getComputedStyle(toggler).display !== "none") {
        // Bootstrap 5.2+: getOrCreateInstance ist am zuverlässigsten
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        // Alternativ (falls ältere Version):
        // bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });
});