/* =========================================================
   Ñuu Savi — main.js
   Intro de video, header, menú móvil y animaciones de entrada
   ========================================================= */
(function () {
  "use strict";

  /* -------- INTRO / VIDEO -------- */
  var intro    = document.getElementById("intro");
  var video    = document.getElementById("introVideo");
  var skipBtn  = document.getElementById("introSkip");
  var enterBtn = document.getElementById("introEnter");
  var bar      = document.getElementById("introBar");
  var body     = document.body;

  // Solo se reproduce una vez por sesión (no molesta al navegar entre páginas)
  var alreadySeen = sessionStorage.getItem("nuusavi_intro") === "1";

  function endIntro() {
    if (!intro || intro.classList.contains("is-hidden")) return;
    intro.classList.add("is-hidden");
    body.classList.remove("intro-lock");
    sessionStorage.setItem("nuusavi_intro", "1");
    // Retirar del DOM tras la transición
    window.setTimeout(function () {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }, 950);
  }

  if (intro && video && !alreadySeen) {
    body.classList.add("intro-lock");

    var started = false;

    // Barra de progreso
    video.addEventListener("timeupdate", function () {
      if (video.duration && bar) {
        bar.style.width = (video.currentTime / video.duration) * 100 + "%";
      }
    });

    // La reproducción arrancó: ocultar el botón de reserva
    video.addEventListener("playing", function () {
      started = true;
      if (enterBtn) enterBtn.hidden = true;
    });

    // Fin natural del video -> transición al hero
    video.addEventListener("ended", endIntro);

    // Error real del archivo -> no atrapar al usuario, revelar el sitio
    video.addEventListener("error", endIntro);

    // Intentar reproducir. Un rechazo puntual (AbortError por carrera de carga)
    // NO se trata como fatal: reintentamos cuando el video pueda reproducirse.
    function attemptPlay() {
      var p = video.play();
      if (p && typeof p.catch === "function") { p.catch(function () {}); }
    }
    attemptPlay();
    video.addEventListener("canplay", attemptPlay, { once: true });

    // Si el autoplay está bloqueado por el navegador, ofrecer un botón "Entrar"
    window.setTimeout(function () {
      if (!started && enterBtn) enterBtn.hidden = false;
    }, 1500);
    if (enterBtn) {
      enterBtn.addEventListener("click", function () {
        enterBtn.hidden = true;
        attemptPlay();
      });
    }

    // Red de seguridad: nunca más de 12s bloqueado
    window.setTimeout(endIntro, 12000);
  } else if (intro) {
    // Ya vista en esta sesión: quitar sin animación
    intro.classList.add("is-hidden");
    if (intro.parentNode) intro.parentNode.removeChild(intro);
  }

  if (skipBtn) skipBtn.addEventListener("click", endIntro);

  /* -------- HEADER al hacer scroll -------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------- MENÚ MÓVIL -------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------- REVEAL AL HACER SCROLL -------- */
  var revealEls = document.querySelectorAll(
    ".section-head, .fact, .official, .card, .identidad__lead, .historia-teaser__content, .historia-teaser__art"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.transitionDelay = (Math.min(i, 5) * 60) + "ms";
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -------- AÑO EN FOOTER -------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
