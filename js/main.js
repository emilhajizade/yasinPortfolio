/* =========================================================
   KAMRAN ƏLİYEV — sayt üçün ortaq JS
   Backend yoxdur — bütün funksiyalar tam client-side işləyir.
   ========================================================= */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.addEventListener("DOMContentLoaded", function () {
    initYear();
    initNav();
    initReveal();
    initFaq();
    initGallery();
    initContactForm();
    initCalculators();
  });

  /* ---------- Footer ili ---------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Mobil naviqasiya + scroll kölgəsi ---------- */
  function initNav() {
    var nav = $(".nav");
    var burger = $(".nav__burger");
    var mobile = $(".nav__mobile");
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (burger && mobile) {
      burger.addEventListener("click", function () {
        var open = mobile.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------- Scroll-a görə görünmə animasiyası ---------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ akkordeon ---------- */
  function initFaq() {
    $$(".faq-item").forEach(function (item) {
      var btn = $(".faq-item__q", item);
      var panel = $(".faq-item__a", item);
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        // eyni qrup daxilində digərlərini bağla (isteğe bağlı: təmiz görünüş üçün)
        $$(".faq-item", item.parentElement).forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            $(".faq-item__a", other).style.maxHeight = null;
            $(".faq-item__q", other).setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", (!isOpen).toString());
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- Qalereya filtri + lightbox ---------- */
  function initGallery() {
    var grid = $(".gallery-grid");
    if (!grid) return;

    var buttons = $$(".filter-btn");
    var items = $$(".gallery-item", grid);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var filter = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-category") === filter;
          item.hidden = !match;
        });
      });
    });

    var lightbox = $(".lightbox");
    if (!lightbox) return;
    var lbFrame = $(".lightbox__inner .photo-frame__label", lightbox);
    var lbCat = $(".lightbox__cat", lightbox);
    var lbCap = $(".lightbox__capname", lightbox);
    var closeBtn = $(".lightbox__close", lightbox);

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var title = item.getAttribute("data-title") || "";
        var cat = item.getAttribute("data-category-label") || "";
        if (lbFrame) lbFrame.innerHTML = "<b>" + title + "</b>Əsl şəkli buraya yükləyin";
        if (lbCat) lbCat.textContent = cat;
        if (lbCap) lbCap.textContent = title;
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLb() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", closeLb);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ---------- Əlaqə forması ---------- */
  function initContactForm() {
    var form = $("#contactForm");
    if (!form) return;

    // Xidmətlər səhifəsindən gələn ?xidmet= parametrini formda seçili et
    var params = new URLSearchParams(window.location.search);
    var presetService = params.get("xidmet");
    if (presetService) {
      var select = $("#service", form);
      if (select) {
        var opt = $$("option", select).filter(function (o) { return o.value === presetService; })[0];
        if (opt) select.value = presetService;
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      $$("[data-required]", form).forEach(function (field) {
        var wrap = field.closest(".field");
        var value = field.value.trim();
        var ok = value.length > 0;

        if (ok && field.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (ok && field.hasAttribute("data-phone")) {
          ok = value.replace(/[^\d]/g, "").length >= 9;
        }
        if (wrap) wrap.classList.toggle("has-error", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        var firstError = $(".field.has-error");
        if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      /* ==========================================================
         QEYD (backend yoxdur):
         Bu sayt statik HTML/CSS/JS-dir, real e-poçt/WhatsApp
         göndərişi üçün formu bir xidmətə qoşmaq lazımdır, məsələn:
           • Formspree (formspree.io) — pulsuz plan, tək sətir dəyişikliklə
           • EmailJS (emailjs.com) — birbaşa brauzerdən e-poçt göndərir
           • Google Forms / Apps Script
         Hazırda bu funksiya yalnız "uğurlu" vəziyyəti göstərir və
         sürətli əlaqə üçün WhatsApp/telefon linklərini təklif edir.
      ========================================================== */
      var card = form.closest(".form-card");
      var success = $(".form-success", card);
      if (card) card.classList.add("is-submitted");
      if (success) success.classList.add("is-visible");
      form.reset();
    });
  }

  /* ---------- Resurslar səhifəsi: kalkulyatorlar ---------- */
  function initCalculators() {
    var bmiForm = $("#bmiForm");
    if (bmiForm) {
      bmiForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var heightCm = parseFloat($("#bmiHeight").value);
        var weightKg = parseFloat($("#bmiWeight").value);
        if (!heightCm || !weightKg) return;

        var heightM = heightCm / 100;
        var bmi = weightKg / (heightM * heightM);
        var category;
        if (bmi < 18.5) category = "Az çəkili";
        else if (bmi < 25) category = "Normal çəki";
        else if (bmi < 30) category = "Artıq çəkili";
        else category = "Piylənmə";

        $("#bmiValue").textContent = bmi.toFixed(1);
        $("#bmiCategory").textContent = category;
        $("#bmiResult").classList.add("is-visible");
      });
    }

    var tdeeForm = $("#tdeeForm");
    if (tdeeForm) {
      tdeeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var gender = $("#tdeeGender").value;
        var age = parseFloat($("#tdeeAge").value);
        var heightCm = parseFloat($("#tdeeHeight").value);
        var weightKg = parseFloat($("#tdeeWeight").value);
        var activity = parseFloat($("#tdeeActivity").value);
        if (!age || !heightCm || !weightKg) return;

        var bmr = gender === "male"
          ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        var tdee = bmr * activity;

        $("#tdeeValue").textContent = Math.round(tdee);
        $("#tdeeNote").textContent = "Bazal metabolizma (BMR): ~" + Math.round(bmr) + " kkal. Kilo vermək üçün ~300-500 kkal az, kilo almaq üçün ~300-500 kkal çox qəbul et.";
        $("#tdeeResult").classList.add("is-visible");
      });
    }

    var rmForm = $("#rmForm");
    if (rmForm) {
      rmForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var weight = parseFloat($("#rmWeight").value);
        var reps = parseFloat($("#rmReps").value);
        if (!weight || !reps) return;

        var oneRm = reps === 1 ? weight : weight * (1 + reps / 30);

        $("#rmValue").textContent = oneRm.toFixed(1);
        $("#rmResult").classList.add("is-visible");
      });
    }
  }
})();
