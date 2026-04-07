// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

let body = document.body;

// Load more functionality variables
let allProjects = [];
let projectsShown = 0;
const projectsPerLoad = 6;

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
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#ship-type");
  if (!el) return;

  // Destroy existing instance to ensure fresh start
  if (shipTypingEffect) {
    shipTypingEffect.destroy();
    shipTypingEffect = null;
  }

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
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#about-type");
  if (!el) return;

  // Destroy existing instance to ensure fresh start
  if (aboutTypingEffect) {
    aboutTypingEffect.destroy();
    aboutTypingEffect = null;
  }

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
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#projects-type");
  if (!el) return;

  // Destroy existing instance to ensure fresh start
  if (projectsTypingEffect) {
    projectsTypingEffect.destroy();
    projectsTypingEffect = null;
  }

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
  if (el) el.textContent = "Shipped";
}

let contactTypingEffect = null;

function startContactTypingEffect() {
  if (prefersReducedMotion()) return;
  if (typeof Typed === "undefined") return;

  const el = document.querySelector("#contact-type");
  if (!el) return;

  // Destroy existing instance to ensure fresh start
  if (contactTypingEffect) {
    contactTypingEffect.destroy();
    contactTypingEffect = null;
  }

  contactTypingEffect = new Typed("#contact-type", {
    strings: ["talk", "chat", "connect"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1400,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  });
}

function stopContactTypingEffect() {
  if (!contactTypingEffect) return;
  contactTypingEffect.destroy();
  contactTypingEffect = null;

  const el = document.querySelector("#contact-type");
  if (el) el.textContent = "talk";
}

// Lenis smooth scroll (must run before GSAP so ScrollTrigger uses Lenis scroll)
let lenis = null;
let isFullscreenMenuOpen = false;
let menuToggleBtn = null;
let fullscreenMenuEl = null;
let lastScrollY = 0;
let isHeaderHidden = false;
let hasUserScrolled = false;

function setHeaderHidden(hidden, { force = false } = {}) {
  const header = document.querySelector(".header-top");
  if (!header) return;
  if (!force && hidden === isHeaderHidden) return;

  isHeaderHidden = hidden;

  if (typeof gsap !== "undefined" && typeof gsap.to === "function") {
    gsap.to(header, {
      yPercent: hidden ? -120 : 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    return;
  }

  header.style.transform = hidden
    ? "translate3d(0, -120%, 0)"
    : "translate3d(0, 0, 0)";
}

function updateHeaderAutoHide(currentY) {
  if (!Number.isFinite(currentY)) return;

  if (isFullscreenMenuOpen) {
    setHeaderHidden(false);
    lastScrollY = currentY;
    return;
  }

  // Keep header visible until the user actively scrolls.
  const initialDelta = Math.abs(currentY - lastScrollY);
  if (!hasUserScrolled) {
    if (initialDelta > 1) hasUserScrolled = true;
    setHeaderHidden(false);
    lastScrollY = currentY;
    return;
  }

  const delta = currentY - lastScrollY;
  const threshold = 6;

  if (currentY <= 20) {
    setHeaderHidden(false);
  } else if (delta > threshold) {
    setHeaderHidden(true);
  } else if (delta < -threshold) {
    setHeaderHidden(false);
  }

  lastScrollY = currentY;
}

function initAutoHideHeader() {
  const header = document.querySelector(".header-top");
  if (!header) return;

  lastScrollY = window.scrollY || window.pageYOffset || 0;
  hasUserScrolled = false;
  setHeaderHidden(false, { force: true });

  if (lenis) {
    lenis.on("scroll", (e) => {
      const currentY =
        typeof e === "number"
          ? e
          : typeof e?.animatedScroll === "number"
            ? e.animatedScroll
            : typeof e?.scroll === "number"
              ? e.scroll
              : window.scrollY || window.pageYOffset || 0;
      updateHeaderAutoHide(currentY);
    });
    return;
  }

  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      updateHeaderAutoHide(currentY);
    },
    { passive: true },
  );
}

function openFullscreenMenu() {
  if (!menuToggleBtn || !fullscreenMenuEl) return;
  if (isFullscreenMenuOpen) return;

  isFullscreenMenuOpen = true;
  setHeaderHidden(false);
  document.body.classList.add("menu-open");
  menuToggleBtn.setAttribute("aria-expanded", "true");
  fullscreenMenuEl.setAttribute("aria-hidden", "false");

  if (lenis) lenis.stop();
}

function closeFullscreenMenu(options = {}) {
  const { keepLenisStopped = false } = options;
  if (!menuToggleBtn || !fullscreenMenuEl) return;

  isFullscreenMenuOpen = false;
  document.body.classList.remove("menu-open");
  menuToggleBtn.setAttribute("aria-expanded", "false");
  fullscreenMenuEl.setAttribute("aria-hidden", "true");

  if (lenis && !keepLenisStopped) lenis.start();
}

function initFullscreenMenu() {
  menuToggleBtn = document.querySelector("#menu-toggle");
  fullscreenMenuEl = document.querySelector("#fullscreen-menu");

  if (!menuToggleBtn || !fullscreenMenuEl) return;

  menuToggleBtn.addEventListener("click", () => {
    if (isFullscreenMenuOpen) {
      closeFullscreenMenu();
    } else {
      openFullscreenMenu();
    }
  });

  fullscreenMenuEl.addEventListener("click", (e) => {
    if (e.target === fullscreenMenuEl) closeFullscreenMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFullscreenMenuOpen) {
      closeFullscreenMenu();
    }
  });
}

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

// Enforce minimum opacity of 0.5 for all typed elements
function enforceMinimumOpacity() {
  const typedElements = [
    document.querySelector("#about-type"),
    document.querySelector("#ship-type"),
    document.querySelector("#projects-type"),
    document.querySelector("#contact-type"),
  ];

  typedElements.forEach((el) => {
    if (el) {
      const currentOpacity = parseFloat(window.getComputedStyle(el).opacity);
      if (currentOpacity < 0.5) {
        gsap.set(el, { opacity: 0.5 });
      }
    }
  });
}

// Run opacity enforcement on every frame
gsap.ticker.add(enforceMinimumOpacity);

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

    // Animate buttons with stagger (exclude hero button so it stays visible immediately)
    const buttons = document.querySelectorAll(
      ".banner .content button:not(.hero-hire)",
    );
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

    const heroHireBtn = document.querySelector(".banner .content .hero-hire");
    if (heroHireBtn) {
      heroHireBtn.style.opacity = "1";
      heroHireBtn.style.visibility = "visible";
      heroHireBtn.style.transform = "translateY(0)";
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

  // About section scroll-triggered animation
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    gsap.from("#about .bg-word", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
      y: 10,
      duration: 0.7,
      ease: "power2.out",
    });

    const shipTypingSr = ScrollTrigger.create({
      trigger: "#services",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startShipTypingEffect,
      onEnterBack: startShipTypingEffect,
      onLeave: stopShipTypingEffect,
      onLeaveBack: stopShipTypingEffect,
    });

    if (shipTypingSr && shipTypingSr.isActive) startShipTypingEffect();

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
      opacity: 0.5,
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
      opacity: 0.5,
      y: 10,
      duration: 0.7,
      ease: "power2.out",
    });

    const projectsTypingSr = ScrollTrigger.create({
      trigger: "#portfolio",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startProjectsTypingEffect,
      onEnterBack: startProjectsTypingEffect,
      onLeave: stopProjectsTypingEffect,
      onLeaveBack: stopProjectsTypingEffect,
    });

    if (projectsTypingSr && projectsTypingSr.isActive)
      startProjectsTypingEffect();

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

  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    gsap.from("#contact .bg-word", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      duration: 0.85,
      ease: "power2.out",
    });

    gsap.from("#contact .reveal", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
    });

    const contactTypingTrigger = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 60%",
      end: "bottom 40%",
      onEnter: startContactTypingEffect,
      onEnterBack: startContactTypingEffect,
      onLeave: stopContactTypingEffect,
      onLeaveBack: stopContactTypingEffect,
    });

    if (contactTypingTrigger && contactTypingTrigger.isActive)
      startContactTypingEffect();
  }

  // Ensure bg-word motion works for all sections
  const sectionBgWords = document.querySelectorAll(".section .bg-word");
  if (sectionBgWords.length) {
    gsap.set(sectionBgWords, { opacity: 0.5 });
  }

  sectionBgWords.forEach((bgWord, idx) => {
    const direction = idx % 2 === 0 ? "-16%" : "16%";
    gsap.fromTo(
      bgWord,
      { x: "0%", opacity: 0.5, scale: 1 },
      {
        x: direction,
        opacity: 0.5,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: bgWord.closest(".section"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

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
      const isMenuLink = !!this.closest(".fullscreen-menu");

      if (href === "#" || href === "") {
        if (isFullscreenMenuOpen) {
          e.preventDefault();
          closeFullscreenMenu();
        }
        return;
      }

      e.preventDefault();

      if (isMenuLink && isFullscreenMenuOpen) {
        closeFullscreenMenu();
      }

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
  if (t === "scss" || t === "sass") return "./images/scss.svg";
  if (t === "jquery") return "./images/jquery.svg";
  if (t === "bootstrap") return "./images/bootstrap.svg";
  if (t === "fancybox") return "./images/fancybox.svg";
  if (t === "swiper" || t === "swiper slider") return "./images/swiper.svg";
  if (t === "purecss" || t === "purecss.io") return "./images/purecss.svg";
  if (t === "node" || t === "nodejs") return "./images/node.svg";
  if (t === "typescript" || t === "ts") return "./images/typescript.svg";
  // fallback: custom path by technology name (try to match existing images)
  const candidate = `./images/${t.replace(/\s+/g, "-")}.svg`;
  return candidate;
}

function formatTechLabel(tech) {
  const t = normalizeTech(tech);
  if (t === "html5") return "HTML5";
  if (t === "css" || t === "css3") return "CSS";
  if (t === "js" || t === "javascript") return "JavaScript";
  if (t === "jquery" || t === "j-query") return "jQuery";
  if (t === "scss") return "SCSS";
  if (t === "sass") return "Sass";
  if (t === "vue") return "Vue";
  if (t === "react") return "React";
  if (t === "node" || t === "nodejs" || t === "node.js") return "Node.js";
  if (t === "typescript" || t === "ts") return "TypeScript";
  if (t === "bootstrap") return "Bootstrap";
  if (t === "next" || t === "nextjs" || t === "next.js") return "Next.js";
  if (t === "nuxt" || t === "nuxtjs" || t === "nuxt.js") return "Nuxt.js";
  if (t === "angular") return "Angular";
  if (t === "reactnative" || t === "react-native") return "React Native";
  if (t === "tailwind") return "Tailwind CSS";
  if (t === "graphql") return "GraphQL";
  if (t === "prismic") return "Prismic";
  if (t === "fancybox") return "Fancybox";
  if (t === "swiper") return "Swiper";
  if (!t) return "";
  // capital case words using spaces / hyphen split if needed
  return t
    .split(/[-\s]+/)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

function getTechItems(technologyList) {
  if (!Array.isArray(technologyList) || technologyList.length === 0) {
    return [];
  }

  const items = [];
  const seen = new Set();
  for (let tech of technologyList) {
    if (!tech || typeof tech !== "string") continue;
    tech = tech.trim();
    if (!tech) continue;
    const normalized = normalizeTech(tech);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    items.push({
      raw: tech,
      key: normalized,
      icon: techIconFor(normalized),
    });
  }
  return items;
}

function buildTechHtml(techItems) {
  if (!Array.isArray(techItems) || techItems.length === 0) {
    return "";
  }

  return techItems
    .map(({ raw, key, icon }) => {
      const label = formatTechLabel(key || raw);
      const iconHtml = icon
        ? `<img src="${icon}" alt="${label}" aria-hidden="true" loading="lazy" decoding="async" />`
        : "";
      return `<span class="tech-pill">${iconHtml}${label}</span>`;
    })
    .join("");
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
  carouselContainer: null,
  carouselImages: null,
  carouselTitle: null,
  carouselPrev: null,
  carouselNext: null,
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
  modalEls.carouselContainer = document.querySelector("#carousel-container");
  modalEls.carouselImages = document.querySelector("#carousel-images");
  modalEls.carouselTitle = document.querySelector("#carousel-title");
  modalEls.carouselPrev = document.querySelector("#carousel-prev");
  modalEls.carouselNext = document.querySelector("#carousel-next");
  return modalEls;
}

function openProjectModal(project) {
  const els = getModalEls();
  if (!els.root || !els.dialog) return;

  // Check if project has multiple images
  const hasMultipleImages = project?.images && project.images.length > 1;

  if (hasMultipleImages) {
    // Setup carousel
    setupCarousel(project);
    els.carouselContainer.style.display = "flex";
    els.img.style.display = "none";
  } else {
    // Show single image
    const imgSrc = projectImageSrc(project);
    els.img.src = imgSrc;
    els.img.alt = projectImageAlt(project);
    els.img.decoding = "async";
    els.img.style.display = "block";
    els.carouselContainer.style.display = "none";
  }

  els.title.textContent = project?.name || "Project";
  els.link.href = project?.url || "#";
  els.link.style.display = project?.url ? "inline-flex" : "none";

  const company = project?.company ? project.company : "";
  const type = project?.type ? String(project.type).toUpperCase() : "";
  els.meta.textContent = [company, type].filter(Boolean).join(" • ");

  const techItems = getTechItems(project?.technology);
  els.tech.innerHTML = buildTechHtml(techItems);

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

let currentCarouselIndex = 0;
let carouselImages = [];
let carouselPrevHandler, carouselNextHandler;

function setupCarousel(project) {
  const els = getModalEls();
  const type = normalizeTech(project?.type) || "web";
  carouselImages = project.images || [];
  currentCarouselIndex = 0;

  // Clear existing images
  els.carouselImages.innerHTML = "";

  // Remove existing event listeners
  if (carouselPrevHandler) {
    els.carouselPrev.removeEventListener("click", carouselPrevHandler);
  }
  if (carouselNextHandler) {
    els.carouselNext.removeEventListener("click", carouselNextHandler);
  }

  // Add images to carousel
  carouselImages.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = `./images/${type}/${image.src}`;
    img.alt = image.comment || `${project.name} image ${index + 1}`;
    img.loading = "lazy";
    img.decoding = "async";
    els.carouselImages.appendChild(img);
  });

  // Set initial position
  gsap.set(els.carouselImages, { x: 0 });

  // Set initial title
  updateCarouselTitle(true);

  // Make sure title is visible initially
  gsap.set(els.carouselTitle, { opacity: 1, y: 0 });

  // Setup navigation
  carouselPrevHandler = () => navigateCarousel(-1);
  carouselNextHandler = () => navigateCarousel(1);
  els.carouselPrev.addEventListener("click", carouselPrevHandler);
  els.carouselNext.addEventListener("click", carouselNextHandler);

  // Update button states
  updateCarouselButtons();
}

function navigateCarousel(direction) {
  const els = getModalEls();
  const maxIndex = carouselImages.length - 1;
  const newIndex = Math.max(
    0,
    Math.min(maxIndex, currentCarouselIndex + direction),
  );

  if (newIndex === currentCarouselIndex) return;

  // Animate title out
  gsap.to(els.carouselTitle, {
    opacity: 0,
    y: 20,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      currentCarouselIndex = newIndex;
      updateCarouselTitle();
      // Animate carousel
      gsap.to(els.carouselImages, {
        x: `-${currentCarouselIndex * 100}%`,
        duration: 0.3,
        ease: "power2.out",
      });
      updateCarouselButtons();
    },
  });
}

function toTitleCase(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function updateCarouselTitle(immediate = false) {
  const els = getModalEls();
  const currentImage = carouselImages[currentCarouselIndex];
  els.carouselTitle.textContent = toTitleCase(currentImage?.comment || "");

  if (immediate) {
    gsap.set(els.carouselTitle, { opacity: 1, y: 0 });
  } else {
    // Animate title in
    gsap.set(els.carouselTitle, { opacity: 0, y: 20 });
    gsap.to(els.carouselTitle, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

function updateCarouselButtons() {
  const els = getModalEls();
  const maxIndex = carouselImages.length - 1;

  els.carouselPrev.disabled = currentCarouselIndex === 0;
  els.carouselNext.disabled = currentCarouselIndex === maxIndex;
}

function closeProjectModal() {
  const els = getModalEls();
  if (!els.root || !els.dialog) return;
  if (!els.root.classList.contains("is-open")) return;

  // Reset carousel
  currentCarouselIndex = 0;
  carouselImages = [];
  if (els.carouselImages) {
    gsap.set(els.carouselImages, { x: 0 });
  }

  const finish = () => {
    els.root.classList.remove("is-open");
    els.root.setAttribute("aria-hidden", "true");
    if (lenis && !isFullscreenMenuOpen) lenis.start();
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

  if (!projectsToShow || projectsToShow.length === 0) {
    grid.innerHTML =
      "<p class='no-projects'>No projects available right now. Please check back soon.</p>";
    const loadMoreBtn = document.querySelector("#load-more-btn");
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    return;
  }

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
    const techItems = getTechItems(project?.technology);
    const techHtml = buildTechHtml(techItems);

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
  if (window.location.protocol === "file:") {
    throw new Error(
      "Blocked by browser CORS on file:// origin. Serve via Live Server/http(s) instead.",
    );
  }

  const scriptSrc = document
    .querySelector('script[src*="js/script.js"]')
    ?.getAttribute("src");
  const scriptBasedUrl = scriptSrc
    ? new URL(
        "projects.json",
        new URL(scriptSrc, window.location.href),
      ).toString()
    : null;

  const candidateUrls = [
    scriptBasedUrl,
    new URL("js/projects.json", window.location.href).toString(),
    `${window.location.origin}/js/projects.json`,
    "./js/projects.json",
    "js/projects.json",
  ].filter(Boolean);

  const uniqueCandidates = [...new Set(candidateUrls)];
  let lastError = null;

  for (const url of uniqueCandidates) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const portfolio = await response.json();
      if (!Array.isArray(portfolio)) {
        throw new Error("Invalid projects.json format (expected an array)");
      }

      return portfolio;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to load projects.json from known paths. Last error: ${lastError?.message || "unknown"}`,
  );
}

window.addEventListener("DOMContentLoaded", function (e) {
  initLenis();
  initFullscreenMenu();
  initAutoHideHeader();
  initGSAPAnimations();
  initButtonAnimations();
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
      const grid = document.querySelector("#portfolio-grid");
      if (grid) {
        grid.innerHTML =
          "<p class='no-projects'>Unable to load projects right now. Please refresh or verify server path to <code>js/projects.json</code>.</p>";
      }

      console.error(
        'Error fetching portfolio. Please check if "js/projects.json" exists and is accessible. Detailed error:',
        error,
      );
    });
});
