document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  var navAnchors = document.querySelectorAll(".nav-links a");
  var sections = Array.prototype.map.call(navAnchors, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section, i) {
      if (!section) return;
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navAnchors.forEach(function (a) { a.classList.remove("active"); });
        navAnchors[i].classList.add("active");
      }
    });
  }

  var toTop = document.querySelector(".to-top");
  function toggleToTop() {
    if (window.scrollY > 400) {
      toTop.classList.add("visible");
    } else {
      toTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", function () {
    setActiveLink();
    toggleToTop();
  });

  setActiveLink();
  toggleToTop();

  var canHover = window.matchMedia("(pointer: fine)").matches;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canHover && !reducedMotion) {
    document.querySelectorAll(".glow").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        el.style.setProperty("--my", (e.clientY - rect.top) + "px");
      });
    });

    document.querySelectorAll(".btn").forEach(function (el) {
      var strength = 0.3;
      var max = 14;

      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        relX = Math.max(-max, Math.min(max, relX * strength));
        relY = Math.max(-max, Math.min(max, relY * strength));
        el.style.transition = "transform 0.05s linear";
        el.style.transform = "translate(" + relX + "px, " + relY + "px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.transform = "translate(0, 0)";
      });
    });

    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    var ringText = document.createElement("span");
    ringText.className = "cursor-ring-text";
    ring.appendChild(ringText);
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("custom-cursor-active");

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var ringX = mouseX;
    var ringY = mouseY;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px, " + mouseY + "px) translate(-50%, -50%)";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px, " + ringY + "px) translate(-50%, -50%)";
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    var growSelector = "a, button, .btn, .glow";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(growSelector)) {
        ring.classList.add("cursor-grow");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(growSelector)) {
        ring.classList.remove("cursor-grow");
      }
    });

    document.addEventListener("mouseover", function (e) {
      var card = e.target.closest(".work-card");
      if (card) {
        ringText.textContent = card.dataset.cursorLabel || "View";
        ring.classList.add("cursor-fill");
        var textWidth = ringText.offsetWidth;
        ring.style.width = (textWidth + 44) + "px";
        ring.style.height = "46px";
        dot.classList.add("cursor-hidden");
      }
    });
    document.addEventListener("mouseout", function (e) {
      var card = e.target.closest(".work-card");
      if (card) {
        ring.classList.remove("cursor-fill");
        ring.style.width = "";
        ring.style.height = "";
        dot.classList.remove("cursor-hidden");
      }
    });
  }
});
