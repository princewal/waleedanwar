// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

let body = document.body;
let dayNight = document.querySelector(".dayNight");

// Load more functionality variables
let allProjects = [];
let projectsShown = 0;
const projectsPerLoad = 6;

dayNight.onclick = function () {
  body.classList.toggle("night");
  // Also toggle banner class for night mode
  const banner = document.querySelector(".banner");
  if (banner) {
    banner.classList.toggle("night");
  }
};

let typingEffect = new Typed("#text", {
  strings: ["Waleed", "a Developer", "a Coder", "a Lead"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 2500,
});

let shipTypingEffect = null;

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function startShipTypingEffect() {
  if (shipTypingEffect) return;
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#ship-type");
  if (!el) return;

  shipTypingEffect = new Typed("#ship-type", {
    strings: ["that ship", "that scale", "that convert"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1400,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  });
}

function stopShipTypingEffect() {
  if (!shipTypingEffect) return;
  shipTypingEffect.destroy();
  shipTypingEffect = null;

  const el = document.querySelector("#ship-type");
  if (el) el.textContent = "that ship";
}

let aboutTypingEffect = null;

function startAboutTypingEffect() {
  if (aboutTypingEffect) return;
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#about-type");
  if (!el) return;

  aboutTypingEffect = new Typed("#about-type", {
    strings: ["Vision", "Optimization", "People", "Passion"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1600,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  });
}

function stopAboutTypingEffect() {
  if (!aboutTypingEffect) return;
  aboutTypingEffect.destroy();
  aboutTypingEffect = null;

  const el = document.querySelector("#about-type");
  if (el) el.textContent = "motion";
}

let projectsTypingEffect = null;

function startProjectsTypingEffect() {
  if (projectsTypingEffect) return;
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#projects-type");
  if (!el) return;

  projectsTypingEffect = new Typed("#projects-type", {
    strings: ["Built", "Developed", "Launched"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1400,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  });
}

function stopProjectsTypingEffect() {
  if (!projectsTypingEffect) return;
  projectsTypingEffect.destroy();
  projectsTypingEffect = null;

  const el = document.querySelector("#projects-type");
  if (el) el.textContent = "Develped";
}

// Lenis smooth scroll (must run before GSAP so ScrollTrigger uses Lenis scroll)
let lenis = null;

function initLenis() {
  if (typeof Lenis === "undefined") return;
  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// GSAP Animations
function initGSAPAnimations() {
  // Banner content fade-in animation on page load
  const bannerContent = document.querySelector(".banner .content");
  if (bannerContent) {
    gsap.from(bannerContent, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });

    // Animate the starter text
    const starter = document.querySelector(".starter");
    if (starter) {
      gsap.from(starter, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Animate buttons with stagger
    const buttons = document.querySelectorAll(".banner .content button");
    if (buttons.length > 0) {
      gsap.from(buttons, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }

  // Animate floating tech logos
  const techLogos = document.querySelectorAll("[class$='-logo']");
  if (techLogos.length > 0) {
    gsap.from(techLogos, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.8,
    });

    // Add floating animation to logos
    techLogos.forEach((logo, index) => {
      gsap.to(logo, {
        y: "+=20",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1,
      });
    });
  }

  // Animate social icons
  const socialIcons = document.querySelectorAll(".sci li");
  if (socialIcons.length > 0) {
    gsap.from(socialIcons, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 1,
    });
  }

  // Animate day/night toggle button
  const dayNightBtn = document.querySelector(".dayNight");
  if (dayNightBtn) {
    gsap.from(dayNightBtn, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2,
    });
  }

  // About section scroll-triggered animation
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    gsap.from("#about .bg-word", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to("#about .bg-word", {
      xPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from("#about .reveal-word", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.from("#about .reveal", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 26,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });

    gsap.from("#about .about-underline", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      scaleX: 0,
      duration: 0.9,
      ease: "power3.out",
      transformOrigin: "left center",
    });

    gsap.from("#about-type", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 10,
      duration: 0.7,
      ease: "power2.out",
    });

    const aboutTypingSr = ScrollTrigger.create({
      trigger: "#about",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startAboutTypingEffect,
      onEnterBack: startAboutTypingEffect,
      onLeave: stopAboutTypingEffect,
      onLeaveBack: stopAboutTypingEffect,
    });

    // If the page loads with About already in view, start immediately.
    if (aboutTypingSr && aboutTypingSr.isActive) startAboutTypingEffect();

    gsap.from("#about .stat-card", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
    });
  }

  // Services section scroll-triggered animation
  const servicesSection = document.querySelector("#services");
  if (servicesSection) {
    gsap.from("#services .bg-word", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 60,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to("#services .bg-word", {
      xPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from("#services .reveal-word", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.from("#services .reveal", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 26,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });

    gsap.from("#services .ship-underline", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      scaleX: 0,
      duration: 0.9,
      ease: "power3.out",
      transformOrigin: "left center",
    });

    gsap.from("#ship-type", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 10,
      duration: 0.7,
      ease: "power2.out",
    });

    ScrollTrigger.create({
      trigger: "#services",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startShipTypingEffect,
      onEnterBack: startShipTypingEffect,
      onLeave: stopShipTypingEffect,
      onLeaveBack: stopShipTypingEffect,
    });

    gsap.from("#services .service-card", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 65%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 36,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
    });

    gsap.from("#services .service-icon", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 65%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.7,
      rotation: -12,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.7)",
    });
  }

  // Projects section scroll-triggered animation
  const projectsSection = document.querySelector("#portfolio");
  if (projectsSection) {
    gsap.from("#portfolio .bg-word", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to("#portfolio .bg-word", {
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from("#portfolio .reveal-word", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    gsap.from("#portfolio .projects-underline", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      scaleX: 0,
      duration: 0.9,
      ease: "power3.out",
      transformOrigin: "left center",
    });

    gsap.from("#portfolio .reveal", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 26,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });

    gsap.from("#projects-type", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 10,
      duration: 0.7,
      ease: "power2.out",
    });

    ScrollTrigger.create({
      trigger: "#portfolio",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startProjectsTypingEffect,
      onEnterBack: startProjectsTypingEffect,
      onLeave: stopProjectsTypingEffect,
      onLeaveBack: stopProjectsTypingEffect,
    });

    gsap.from("#portfolio .project-card", {
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 65%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  // Header animation on scroll
  const header = document.querySelector(".header-top");
  if (header) {
    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      toggleClass: { className: "scrolled", targets: header },
    });

    // Animate header on load
    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }

  // Anchor links: use Lenis if available, else GSAP
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const headerHeight =
    document.querySelector(".header-top")?.offsetHeight || 80;
  const scrollOffset = headerHeight + 20;

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;
      e.preventDefault();
      if (href === "#home") {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else
          gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: 0 },
            ease: "power2.out",
          });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        if (lenis)
          lenis.scrollTo(target, { offset: scrollOffset, duration: 1.2 });
        else {
          gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: target, offsetY: headerHeight + 20 },
            ease: "power2.out",
          });
        }
      }
    });
  });
}

// Fallback smooth scroll only when Lenis is not loaded (wheel/keyboard)
function initSmoothScrollBehavior() {
  if (lenis) return;
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener(
    "wheel",
    function (e) {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const currentScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetScroll = currentScroll + e.deltaY * 1.5;
        isScrolling = true;
        gsap.to(window, {
          duration: 0.15,
          scrollTo: { y: targetScroll },
          ease: "power2.out",
          onComplete: () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => (isScrolling = false), 100);
          },
        });
        e.preventDefault();
      }
    },
    { passive: false },
  );

  window.addEventListener("keydown", function (e) {
    const keys = ["PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    let targetScroll = currentScroll;
    switch (e.key) {
      case "PageDown":
      case "ArrowDown":
        targetScroll = currentScroll + viewportHeight * 0.8;
        break;
      case "PageUp":
      case "ArrowUp":
        targetScroll = currentScroll - viewportHeight * 0.8;
        break;
      case "Home":
        targetScroll = 0;
        break;
      case "End":
        targetScroll = document.documentElement.scrollHeight;
        break;
    }
    if (targetScroll !== currentScroll) {
      e.preventDefault();
      gsap.to(window, {
        duration: 0.4,
        scrollTo: { y: targetScroll },
        ease: "power2.out",
      });
    }
  });
}

// Add hover animations to buttons
function initButtonAnimations() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// Add hover animations to social icons
function initSocialIconAnimations() {
  const socialLinks = document.querySelectorAll(".sci li a");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    });

    link.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    });
  });
}

function normalizeTech(tech) {
  if (!tech) return "";
  return String(tech).trim().toLowerCase();
}

function techIconFor(tech) {
  const t = normalizeTech(tech);
  if (t === "html" || t === "html5") return "./images/html5.svg";
  if (t === "css" || t === "css3") return "./images/css3.svg";
  if (t === "js" || t === "javascript") return "./images/js.svg";
  if (t === "react" || t === "reactjs") return "./images/react.svg";
  if (t === "vue" || t === "vuejs") return "./images/vue.svg";
  return null;
}

function formatTechLabel(tech) {
  const t = normalizeTech(tech);
  if (t === "html5") return "HTML5";
  if (t === "css") return "CSS";
  if (t === "css3") return "CSS";
  if (t === "js") return "JavaScript";
  if (t === "vue") return "Vue";
  if (t === "react") return "React";
  if (!t) return "";
  return tech;
}

function buildTechIconList(technologyList) {
  // Rule:
  // - Use technology[] to show icons
  // - Skip entries with no icon mapping
  // - If technology[] missing/empty OR none of the entries map to an icon => default HTML/CSS/JS
  const defaultTech = ["html5", "css", "js"];

  if (!Array.isArray(technologyList) || technologyList.length === 0) {
    return defaultTech;
  }

  const normalized = technologyList.map(normalizeTech);
  const uniq = [];
  const seen = new Set();
  for (const t of normalized) {
    if (!t || seen.has(t)) continue;
    seen.add(t);
    if (techIconFor(t)) uniq.push(t);
  }

  return uniq.length > 0 ? uniq : defaultTech;
}

function projectImageSrc(project) {
  const type = normalizeTech(project?.type) || "web";
  const first = project?.images?.[0]?.src;
  if (!first) return "";
  return `./images/${type}/${first}`;
}

function projectImageAlt(project) {
  const comment = project?.images?.[0]?.comment;
  if (comment) return comment;
  if (project?.name) return `${project.name} preview`;
  return "Project preview";
}

let activeModalTl = null;

const modalEls = {
  root: null,
  overlay: null,
  dialog: null,
  img: null,
  title: null,
  link: null,
  meta: null,
  tech: null,
  closeBtn: null,
  hero: null,
  body: null,
};

function getModalEls() {
  if (modalEls.root) return modalEls;
  modalEls.root = document.querySelector("#project-modal");
  modalEls.overlay = document.querySelector("#project-modal .modal-overlay");
  modalEls.dialog = document.querySelector("#project-modal .modal-dialog");
  modalEls.img = document.querySelector("#project-modal-image");
  modalEls.title = document.querySelector("#project-modal-title");
  modalEls.link = document.querySelector("#project-modal-link");
  modalEls.meta = document.querySelector("#project-modal-meta");
  modalEls.tech = document.querySelector("#project-modal-tech");
  modalEls.closeBtn = document.querySelector(
    "#project-modal [data-modal-close]",
  );
  modalEls.hero = document.querySelector("#project-modal .modal-hero");
  modalEls.body = document.querySelector("#project-modal .modal-body");
  return modalEls;
}

function openProjectModal(project) {
  const els = getModalEls();
  if (!els.root || !els.dialog) return;

  // Fill content
  const imgSrc = projectImageSrc(project);
  els.img.src = imgSrc;
  els.img.alt = projectImageAlt(project);
  els.img.decoding = "async";

  els.title.textContent = project?.name || "Project";
  els.link.href = project?.url || "#";
  els.link.style.display = project?.url ? "inline-flex" : "none";

  const company = project?.company ? project.company : "";
  const type = project?.type ? String(project.type).toUpperCase() : "";
  els.meta.textContent = [company, type].filter(Boolean).join(" • ");

  const techList = buildTechIconList(project?.technology);
  els.tech.innerHTML = techList
    .map((t) => {
      const icon = techIconFor(t);
      if (!icon) return "";
      return `<span class="tech-pill"><img src="${icon}" alt="" aria-hidden="true" loading="lazy" decoding="async" />${formatTechLabel(t)}</span>`;
    })
    .join("");

  els.root.classList.add("is-open");
  els.root.setAttribute("aria-hidden", "false");

  if (lenis) lenis.stop();

  // Kill any existing timeline
  if (activeModalTl) activeModalTl.kill();

  // Squish-into-line then expand
  gsap.set(els.overlay, { autoAlpha: 0 });
  gsap.set(els.dialog, { autoAlpha: 1, y: 0, scaleY: 0.04, scaleX: 0.98 });
  gsap.set([els.hero, els.body].filter(Boolean), { autoAlpha: 1, y: 0 });

  activeModalTl = gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .to(els.overlay, { autoAlpha: 1, duration: 0.25 }, 0)
    .to(
      els.dialog,
      {
        scaleY: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      0,
    )
    .fromTo(
      [els.hero, els.body].filter(Boolean),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" },
      0.15,
    );

  // Focus close button for keyboard users
  if (els.closeBtn) els.closeBtn.focus();
}

function closeProjectModal() {
  const els = getModalEls();
  if (!els.root || !els.dialog) return;
  if (!els.root.classList.contains("is-open")) return;

  const finish = () => {
    els.root.classList.remove("is-open");
    els.root.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
  };

  if (activeModalTl) activeModalTl.kill();

  activeModalTl = gsap
    .timeline({ onComplete: finish })
    .to(
      [els.hero, els.body].filter(Boolean),
      { autoAlpha: 0, y: -6, duration: 0.18, ease: "power1.in" },
      0,
    )
    .to(
      els.dialog,
      { scaleY: 0.04, scaleX: 0.98, duration: 0.26, ease: "power3.inOut" },
      0.04,
    )
    .to(
      els.overlay,
      { autoAlpha: 0, duration: 0.22, ease: "power2.inOut" },
      0.02,
    );
}

function fillUpPortfolio(portfolio, limit = null) {
  const grid = document.querySelector("#portfolio-grid");
  if (!grid) return;

  // If limit is null, show all projects that are currently loaded
  const projectsToShow =
    limit !== null
      ? portfolio.slice(0, limit)
      : portfolio.slice(0, projectsShown);

  grid.innerHTML = "";

  // Ensure modal elements are cached and close handlers are bound once
  const modalRoot = document.querySelector("#project-modal");
  if (modalRoot && !modalRoot.dataset.bound) {
    modalRoot.dataset.bound = "true";
    modalRoot.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.closest && target.closest("[data-modal-close]")) {
        closeProjectModal();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjectModal();
    });
  }

  projectsToShow.forEach((project, idx) => {
    const techList = buildTechIconList(project?.technology);
    const techHtml = techList
      .map((t) => {
        const icon = techIconFor(t);
        const label = formatTechLabel(t);
        if (!icon) return "";
        return `<span class="tech-pill"><img src="${icon}" alt="" aria-hidden="true" loading="lazy" decoding="async" />${label}</span>`;
      })
      .join("");

    const imgSrc = projectImageSrc(project);
    const imgAlt = projectImageAlt(project);
    const company = project?.company ? project.company : "";
    const type = project?.type ? String(project.type).toUpperCase() : "";
    const meta = [company, type].filter(Boolean).join(" • ");

    const card = document.createElement("div");
    card.className = "project-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Open project: ${project?.name || "Project"}`,
    );
    card.dataset.projectIndex = String(idx);

    card.innerHTML = `
      <div class="project-thumb">
        <img src="${imgSrc}" alt="${imgAlt}" loading="lazy" decoding="async" fetchpriority="low" />
      </div>
      <div class="project-info">
        <h3 class="project-title">${project?.name || "Project"}</h3>
        <div class="project-meta">${meta}</div>
        <div class="tech-row">${techHtml}</div>
      </div>
    `;

    const open = () => openProjectModal(project);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    grid.appendChild(card);
  });

  // Let ScrollTrigger recalc after DOM changes
  ScrollTrigger.refresh();
}

function updateLoadMoreButton() {
  const loadMoreBtn = document.querySelector("#load-more-btn");
  if (!loadMoreBtn) return;

  if (projectsShown >= allProjects.length) {
    loadMoreBtn.classList.add("hidden");
  } else {
    loadMoreBtn.classList.remove("hidden");
  }
}

function loadMoreProjects() {
  const remainingProjects = allProjects.length - projectsShown;
  const projectsToLoad = Math.min(projectsPerLoad, remainingProjects);

  if (projectsToLoad > 0) {
    projectsShown += projectsToLoad;
    fillUpPortfolio(allProjects);
    updateLoadMoreButton();
  }
}

async function fetchPortfolio() {
  const response = await fetch("js/projects.json");
  const portfolio = await response.json();
  return portfolio;
}

window.addEventListener("DOMContentLoaded", function (e) {
  initLenis();
  initGSAPAnimations();
  initButtonAnimations();
  initSocialIconAnimations();
  initSmoothScrollBehavior();

  fetchPortfolio()
    .then((json) => {
      allProjects = json;
      projectsShown = Math.min(projectsPerLoad, allProjects.length);
      fillUpPortfolio(allProjects, projectsShown);
      updateLoadMoreButton();

      // Add load more button event listener
      const loadMoreBtn = document.querySelector("#load-more-btn");
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", loadMoreProjects);
      }
    })
    .catch((error) => {
      console.error(
        'Error fetching portfolio. Please check if "js/projects.json" exists and is accessible. Detailed error:',
        error,
      );
    });
});
