document.addEventListener('DOMContentLoaded', () => {
  // Nur die IDs der Abschnitte – Labels sind überflüssig
  const sections = ["intro", "basic-functions", "ext-features", "examples", "about"];
  // Alle Navigationslinks (Desktop & Mobil)
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');

  // Hilfsfunktion: führt eine Funktion höchstens alle 'wait' ms aus
  function throttle(fn, wait) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= wait) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }

  // Scroll‑Handler: Nav‑Highlighting und Header‑Schatten
  function onScroll() {
    const fromTop = window.scrollY + 80; // Offset wegen des Sticky‑Headers
    let found = false;

    // Abschnitte von unten nach oben prüfen
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= fromTop) {
        navLinks.forEach(link => link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + sections[i]
        ));
        found = true;
        break;
      }
    }

    // Wenn kein Abschnitt aktiv ist, den ersten Link markieren
    if (!found && navLinks.length) {
      navLinks.forEach((link, idx) => link.classList.toggle('active', idx === 0));
    }

    // Header‑Schatten abhängig von der Scroll‑Position
    const header = document.querySelector('.sticky-header');
    if (header) {
      header.classList.toggle('header-shadow', window.scrollY > 2);
    }
  }

  // Throttled Scroll‑Listener registrieren und initial ausführen
  window.addEventListener('scroll', throttle(onScroll, 120));
  onScroll();

  // Smooth Scroll und Schließen des Offcanvas-Menüs bei Klick
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth',
        });
        // Mobilmenü schließen, falls offen
        if (window.innerWidth < 769) {
          const offcanvas = document.querySelector('.offcanvas.show');
          if (offcanvas) {
            bootstrap.Offcanvas.getInstance(offcanvas).hide();
          }
        }
      }
    });
  });




  

  // Tastaturfokus nach Schließen des Offcanvas zurück zum Menü-Button
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const menuButton = document.querySelector('[data-bs-target="#offcanvasMenu"]');
  if (offcanvasMenu && menuButton) {
    offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
      menuButton.focus();
    });
  }
});






// BANNER SCRIPT ///////////////////////////////////////////////////


   document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");
    const cookieText = document.getElementById("cookie-text");
    const langButtons = document.querySelectorAll(".lang-btn");

    let currentLang = localStorage.getItem("cookie-lang") || "en";
    const userConsent = localStorage.getItem("cookie-consent");

    const texts = {
      en: {
        message: "We use cookies to enhance your experience and load services like Vimeo.",
        accept: "Accept",
        decline: "Decline",
        blocked: "Vimeo video blocked due to cookie preferences."
      },
      de: {
        message: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und Dienste wie Vimeo zu laden.",
        accept: "Zustimmen",
        decline: "Ablehnen",
        blocked: "Vimeo-Video blockiert aufgrund Ihrer Cookie-Einstellungen."
      }
    };

    function applyLanguage(lang) {
      currentLang = lang;
      localStorage.setItem("cookie-lang", lang);
      cookieText.textContent = texts[lang].message;
      acceptBtn.textContent = texts[lang].accept;
      declineBtn.textContent = texts[lang].decline;

      langButtons.forEach(btn => btn.classList.remove("active"));
      document.getElementById("lang-" + lang).classList.add("active");
    }

    langButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.id.replace("lang-", ""));
      });
    });

    function removeVimeoPlaceholders() {
      document.querySelectorAll('.vimeo-embed').forEach(div => {
        const src = div.getAttribute('data-src');
        const width = div.getAttribute('data-width') || "100%";
        const height = div.getAttribute('data-height') || "360";
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        div.replaceWith(iframe);
      });
    }

    function showPlaceholders() {
      document.querySelectorAll('.vimeo-embed').forEach(div => {
        div.textContent = texts[currentLang].blocked;
        div.style.background = "#ccc";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.height = div.getAttribute("data-height") || "360px";
        div.style.color = "#333";
        div.style.fontSize = "0.95rem";
        div.style.textAlign = "center";
      });
    }

    // Initial setup
    applyLanguage(currentLang);

    if (!userConsent) {
      banner.style.display = "flex";
      showPlaceholders();
    } else if (userConsent === "accept") {
      removeVimeoPlaceholders();
    } else if (userConsent === "decline") {
      showPlaceholders();
    }

    acceptBtn.onclick = () => {
      localStorage.setItem("cookie-consent", "accept");
      banner.style.display = "none";
      removeVimeoPlaceholders();
    };

    declineBtn.onclick = () => {
      localStorage.setItem("cookie-consent", "decline");
      banner.style.display = "none";
      showPlaceholders();
    };
  });