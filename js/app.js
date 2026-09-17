/* =========================================================
   Restaurant Menu Template - app.js
   Loads data/restaurant.json and renders the whole page.
   Nothing restaurant-specific should ever be added here.
   ========================================================= */

(function () {
  "use strict";

  var DATA_URL = "data/restaurant.json";

  /** Full dataset once loaded */
  var DATA = null;
  /** Current filter state */
  var state = { category: "all", query: "" };

  /* ---------- tiny helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var has = function (v) { return v !== undefined && v !== null && String(v).trim() !== ""; };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  /** show/hide an element and set its text only when there is content */
  function setText(el, value) {
    if (!el) return;
    if (has(value)) { el.textContent = value; el.hidden = false; }
    else { el.textContent = ""; el.hidden = true; }
  }
  /** Digits-only phone, used for tel: and wa.me links */
  function digits(v) { return has(v) ? String(v).replace(/[^\d]/g, "") : ""; }

  /* =========================================================
     1. DATA LOADING
     ========================================================= */
function loadRestaurantData() {

    return fetch(DATA_URL, { cache: "no-cache" })
        .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
        .catch(function () {

            console.warn(
                "JSON loading blocked. Using embedded restaurant data."
            );

            return LOCAL_RESTAURANT_DATA;

        });

}

  /* =========================================================
     2. THEME + FONTS
     ========================================================= */
  function applyTheme(theme) {
    var t = theme || {};
    var root = document.documentElement.style;
    var map = {
      "--primary-color": t.primary,
      "--secondary-color": t.secondary,
      "--accent-color": t.accent,
      "--background-color": t.background,
      "--surface-color": t.surface,
      "--text-color": t.text,
      "--muted-text-color": t.mutedText,
      "--hero-overlay": t.heroOverlay,
      "--border-radius": t.borderRadius,
      "--heading-font": t.headingFont,
      "--body-font": t.bodyFont
    };
    Object.keys(map).forEach(function (key) {
      if (has(map[key])) root.setProperty(key, map[key]);
    });
  }

  /**
   * Google Fonts are declared in JSON as e.g.
   *   "googleFonts": ["Cormorant Garamond:wght@500;700", "Karla:wght@400;600"]
   * so index.html never needs editing when fonts change.
   */
  function loadFonts(theme) {
    var fonts = (theme && theme.googleFonts) || [];
    if (!fonts.length) return;
    var families = fonts.map(function (f) { return "family=" + f.replace(/ /g, "+"); }).join("&");
    var pre1 = document.createElement("link");
    pre1.rel = "preconnect"; pre1.href = "https://fonts.googleapis.com";
    var pre2 = document.createElement("link");
    pre2.rel = "preconnect"; pre2.href = "https://fonts.gstatic.com"; pre2.crossOrigin = "anonymous";
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" + families + "&display=swap";
    document.head.append(pre1, pre2, link);
  }

  /* =========================================================
     3. DIRECTION / LANGUAGE (LTR + RTL)
     ========================================================= */
  function configureDirection(info) {
    var dir = info.direction === "rtl" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", info.language || "en");
  }

  /* =========================================================
     4. RESTAURANT INFO, SEO, HEADER, HERO
     ========================================================= */
  function applyRestaurantInfo(info, labels) {
    // SEO / document
    document.title = [info.name, info.tagline].filter(has).join(" - ") || "Restaurant Menu";
    var meta = document.querySelector('meta[name="description"]');
    if (meta && has(info.description)) meta.setAttribute("content", info.description);
    if (has(info.favicon)) $("favicon").href = info.favicon;

    // Header brand
    setText($("brandName"), info.shortName || info.name);
    if (has(info.logo)) {
      var logo = $("brandLogo");
      logo.src = info.logo; logo.alt = (info.name || "") + " logo"; logo.hidden = false;
      var flogo = $("footerLogo");
      flogo.src = info.logo; flogo.alt = ""; flogo.hidden = false;
    }

    // Nav labels
    var nav = (labels && labels.nav) || {};
    var navLinks = document.querySelectorAll(".site-nav a");
    if (has(nav.menu)) { navLinks[0].querySelector(".nav-label").textContent = nav.menu; navLinks[0].setAttribute("aria-label", nav.menu); }
    if (has(nav.location)) { navLinks[1].querySelector(".nav-label").textContent = nav.location; navLinks[1].setAttribute("aria-label", nav.location); }
    if (has(nav.contact)) { navLinks[2].querySelector(".nav-label").textContent = nav.contact; navLinks[2].setAttribute("aria-label", nav.contact); }

    // Hero
    var hero = info.hero || {};
    if (has(hero.image)) {
      var img = $("heroImage");
      img.src = hero.image;
      img.alt = info.name ? info.name + " signature dish" : "";
    }
    setText($("heroCuisine"), info.cuisine);
    setText($("heroTitle"), hero.title || info.name);
    setText($("heroSubtitle"), hero.subtitle || info.tagline);
    setText($("heroMenuBtn"), hero.menuButtonText || "View Menu");
    setText($("heroLocationBtn"), hero.locationButtonText || "Find Location");

    // Footer
    setText($("footerName"), info.shortName || info.name);
  }

  /** Restaurant schema.org JSON-LD generated from the JSON data */
  function applyStructuredData(data) {
    var info = data.restaurant || {};
    var loc = info.location || {};
    var contact = info.contact || {};
    var schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: info.name,
      description: info.description,
      servesCuisine: info.cuisine,
      priceRange: "$$",
      image: info.hero && info.hero.image ? new URL(info.hero.image, location.href).href : undefined,
      telephone: contact.phone || undefined,
      address: has(loc.address)
        ? { "@type": "PostalAddress", streetAddress: loc.address }
        : undefined,
      hasMap: loc.googleMapsUrl || undefined,
      openingHours: (info.openingHours || []).map(function (h) { return h.days + " " + h.hours; })
    };
    $("schema-jsonld").textContent = JSON.stringify(schema);
  }

  /* =========================================================
     5. PRICE FORMATTING
     ========================================================= */
  function formatPrice(value, info) {
    if (!has(value)) return "";
    var amount = typeof value === "number" ? value.toFixed(value % 1 === 0 ? 0 : 2) : value;
    var cur = info.currency || "";
    if (!cur) return String(amount);
    return info.currencyPosition === "after" ? amount + " " + cur : cur + " " + amount;
  }

  /* =========================================================
     6. CATEGORY CHIPS
     ========================================================= */
  function renderCategories(data) {
    var wrap = $("categoryChips");
    var labels = data.labels || {};
    var cats = [{ id: "all", name: labels.all || "All" }].concat(data.categories || []);
    wrap.innerHTML = "";

    cats.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.role = "tab";
      btn.textContent = cat.name;
      btn.dataset.category = cat.id;
      btn.setAttribute("aria-selected", cat.id === state.category ? "true" : "false");
      btn.addEventListener("click", function () {
        state.category = cat.id;
        wrap.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-selected", c === btn ? "true" : "false");
        });
        btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        renderMenu();
      });
      wrap.appendChild(btn);
    });
  }

  /* =========================================================
     7. MENU RENDERING + FILTERING
     ========================================================= */
  function filterMenu() {
    var q = state.query.trim().toLowerCase();
    return (DATA.menu || []).filter(function (item) {
      var byCat = state.category === "all" || item.category === state.category;
      if (!byCat) return false;
      if (!q) return true;
      return (
        String(item.name || "").toLowerCase().indexOf(q) !== -1 ||
        String(item.description || "").toLowerCase().indexOf(q) !== -1
      );
    });
  }

  function cardHtml(item) {
    var info = DATA.restaurant || {};
    var labels = DATA.labels || {};
    // Unavailable items are kept visible but visually marked (better UX than
    // silently hiding dishes people may be searching for).
    var unavailable = item.available === false;
    var html = '<article class="card' + (unavailable ? " is-unavailable" : "") + '">';

    if (has(item.image)) {
      html +=
        '<div class="card-media">' +
        '<img src="' + esc(item.image) + '" alt="' + esc(item.name || "") +
        '" loading="lazy" decoding="async" width="800" height="600" />' +
        (has(item.badge) ? '<span class="card-badge">' + esc(item.badge) + "</span>" : "") +
        "</div>";
    }

    html += '<div class="card-body">';
    if (!has(item.image) && has(item.badge)) {
      html += '<span class="card-badge is-floating">' + esc(item.badge) + "</span>";
    }
    var priceHtml = "";
    if (has(item.halfPrice) || has(item.fullPrice)) {
      priceHtml = '<span class="card-price card-price-options">' +
        (has(item.halfPrice) ? '<span class="card-price-option">' + esc(labels.half || "Half") + " · " + esc(formatPrice(item.halfPrice, info)) + "</span>" : "") +
        (has(item.fullPrice) ? '<span class="card-price-option">' + esc(labels.full || "Full") + " · " + esc(formatPrice(item.fullPrice, info)) + "</span>" : "") +
        "</span>";
    } else if (has(item.price)) {
      priceHtml = '<span class="card-price">' + esc(formatPrice(item.price, info)) + "</span>";
    }
    html +=
      '<div class="card-top"><h3 class="card-name">' + esc(item.name || "") + "</h3>" +
      priceHtml +
      "</div>";

    if (has(item.description)) {
      html += '<p class="card-desc">' + esc(item.description) + "</p>";
    }

    var meta = "";
    if (has(item.calories)) meta += '<span class="card-cal">' + esc(item.calories) + " kcal</span>";
    (item.dietary || []).forEach(function (d) {
      if (has(d)) meta += '<span class="tag">' + esc(d) + "</span>";
    });
    if (unavailable) {
      meta += '<span class="sold-out">' + esc(labels.unavailable || "Currently Unavailable") + "</span>";
    }
    if (meta) html += '<div class="card-meta">' + meta + "</div>";

    html += "</div></article>";
    return html;
  }

  function renderMenu() {
    var items = filterMenu();
    var grid = $("menuGrid");
    grid.innerHTML = items.map(cardHtml).join("");
    $("emptyState").hidden = items.length > 0;
  }

  /* =========================================================
     8. CONTACT + LOCATION + FOOTER
     ========================================================= */
  function renderContactInfo(data) {
    var info = data.restaurant || {};
    var loc = info.location || {};
    var contact = info.contact || {};
    var labels = data.labels || {};

    setText($("locationName"), loc.name || info.name);
    setText($("locationAddress"), loc.address);

    // Opening hours (hidden entirely when absent)
    var hoursList = $("openingHours");
    var hours = info.openingHours || [];
    if (hours.length) {
      hoursList.innerHTML = hours
        .map(function (h) {
          return "<li><span>" + esc(h.days) + "</span><span>" + esc(h.hours) + "</span></li>";
        })
        .join("");
      hoursList.hidden = false;
    }

    // Call
    if (has(contact.phone)) {
      var call = $("callBtn");
      call.href = "tel:" + digits(contact.phone);
      call.textContent = labels.call || "Call";
      call.hidden = false;
    }
    // WhatsApp
    if (has(contact.whatsapp)) {
      var wa = $("whatsappBtn");
      wa.href = "https://wa.me/" + digits(contact.whatsapp);
      wa.textContent = labels.whatsapp || "WhatsApp";
      wa.hidden = false;
    }
    // Directions
    var mapsUrl = has(loc.googleMapsUrl)
      ? loc.googleMapsUrl
      : has(loc.address)
        ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(loc.address)
        : "";
    if (mapsUrl) {
      var dir = $("directionsBtn");
      dir.href = mapsUrl;
      dir.textContent = labels.directions || "Get Directions";
      dir.hidden = false;
    }
    // Email
    if (has(contact.email)) {
      var em = $("emailLine");
      em.innerHTML = '<a href="mailto:' + esc(contact.email) + '">' + esc(contact.email) + "</a>";
      em.hidden = false;
    }
    // Map embed (hidden when no embed URL is configured)
    if (has(loc.googleMapsEmbedUrl)) {
      $("mapFrame").src = loc.googleMapsEmbedUrl;
      $("mapCard").hidden = false;
    }

    // Section + menu headings
    if (has(labels.menuHeading)) $("menuTitle").textContent = labels.menuHeading;
    if (has(labels.visitHeading)) document.querySelectorAll(".section-title")[1].textContent = labels.visitHeading;
    if (has(labels.searchPlaceholder)) $("menuSearch").placeholder = labels.searchPlaceholder;
    if (has(labels.noResults)) $("emptyState").textContent = labels.noResults;
    setText($("menuIntro"), data.menuIntro);

    // Footer links - only rendered when the value exists
    var links = [];
    if (has(contact.instagram)) links.push('<a href="' + esc(contact.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (has(contact.tiktok)) links.push('<a href="' + esc(contact.tiktok) + '" target="_blank" rel="noopener">TikTok</a>');
    if (has(contact.phone)) links.push('<a href="tel:' + digits(contact.phone) + '">' + esc(contact.phone) + "</a>");
    $("footerLinks").innerHTML = links.join("");
    setText($("footerCopy"), (data.footer || {}).copyright);
  }

  /* =========================================================
     9. INTERACTIONS
     ========================================================= */
  function setupSmoothScrolling() {
    document.querySelectorAll("a[data-scroll]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function setupSearch() {
    $("menuSearch").addEventListener("input", function (e) {
      state.query = e.target.value;
      renderMenu();
    });
  }

  /* =========================================================
     10. BOOTSTRAP
     ========================================================= */
  function init() {
    loadRestaurantData()
      .then(function (data) {
        DATA = data;
        var info = data.restaurant || {};
        configureDirection(info);
        applyTheme(data.theme);
        loadFonts(data.theme);
        applyRestaurantInfo(info, data.labels);
        applyStructuredData(data);
        renderCategories(data);
        renderMenu();
        renderContactInfo(data);
        setupSmoothScrolling();
        setupSearch();
      })
      .catch(function (err) {
        console.error("Failed to load restaurant data:", err);
        $("fatal-error").hidden = false;
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
