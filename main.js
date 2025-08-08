

/* const lightbox = GLightbox({
    selector: '[data-glightbox]'
  });
*/
/*   if (window.innerWidth >= 768) {
    const lightbox = GLightbox({
      selector: '[data-glightbox]'
    });
  }*/



// BANNER SCRIPT ///////////////////////////////////////////////////


   document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");
    const cookieText = document.getElementById("cookie-text");
    const langButtons = document.querySelectorAll(".lang-btn");

    let currentLang = localStorage.getItem("cookie-lang") || "en";
    const userConsent = localStorage.getItem("cookie-consent");

    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');



    const texts = {
      en: {
        message: "We use cookies and embed third-party services (e.g. Vimeo for video playback). These contents will only be loaded after you give your consent. For more information, please see our privacy policy.",
        accept: "Accept",
        decline: "Decline",
        blocked: "Vimeo video blocked due to cookie preferences."
      },
      de: {
        message: "Wir verwenden Cookies und binden Dienste Dritter ein (z. B. Vimeo für Videowiedergabe). Erst nach Ihrer Zustimmung werden diese Inhalte geladen. Weitere Infos finden Sie in unserer Datenschutzerklärung.",
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

        const lightbox = GLightbox({
      selector: '[data-glightbox]'
    });

// deaktiviert Glightbox bei kleinen Sceeens
 /*       if (window.innerWidth >= 576) {
      // Aktivieren bei breiten Bildschirmen
      GLightbox({ selector: '[data-glightbox]' });
    } else {
      // Deaktivieren bei kleinen Screens
      document.querySelectorAll('[data-glightbox]').forEach(link => {
        // Entferne das Attribut, damit GLightbox nicht initialisiert wird
        link.removeAttribute('data-glightbox');

        // Optional: Standardverhalten verhindern (z. B. kein Öffnen im neuen Tab)
        link.addEventListener('click', function (e) {
          e.preventDefault();
        });

        // Optional: href deaktivieren oder ersetzen
        link.removeAttribute('href');
        // oder z. B. ersetzen durch ein statisches Bild
        // link.setAttribute('href', '#');
      });
    }*/

// hamburger menü schliessen nach click
    navLinks.forEach(function(link) {
      link.addEventListener('click', function () {
        if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
          bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
        }
      });
    });


// Schatten Sticky Header einblenden




  });
