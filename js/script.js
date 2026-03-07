// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)

let body = document.body
let dayNight = document.querySelector(".dayNight")

dayNight.onclick = function () {
  body.classList.toggle("night")
  // Also toggle banner class for night mode
  const banner = document.querySelector(".banner")
  if (banner) {
    banner.classList.toggle("night")
  }
}

let typingEffect = new Typed("#text", {
  strings: ["Waleed", "a Developer", "a Coder", "a Lead"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 2500,
})

let shipTypingEffect = null

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function startShipTypingEffect() {
  if (shipTypingEffect) return
  if (prefersReducedMotion()) return
  if (typeof Typed === "undefined") return

  const el = document.querySelector("#ship-type")
  if (!el) return

  shipTypingEffect = new Typed("#ship-type", {
    strings: ["that ship", "that scale", "that convert"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1400,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  })
}

function stopShipTypingEffect() {
  if (!shipTypingEffect) return
  shipTypingEffect.destroy()
  shipTypingEffect = null

  const el = document.querySelector("#ship-type")
  if (el) el.textContent = "that ship"
}

let aboutTypingEffect = null

function startAboutTypingEffect() {
  if (aboutTypingEffect) return
  if (prefersReducedMotion()) return
  if (typeof Typed === "undefined") return

  const el = document.querySelector("#about-type")
  if (!el) return

  aboutTypingEffect = new Typed("#about-type", {
    strings: ["with vision", "with optimization", "with motion", "with passion"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 32,
    backDelay: 1600,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  })
}

function stopAboutTypingEffect() {
  if (!aboutTypingEffect) return
  aboutTypingEffect.destroy()
  aboutTypingEffect = null

  const el = document.querySelector("#about-type")
  if (el) el.textContent = "with motion"
}

// Lenis smooth scroll (must run before GSAP so ScrollTrigger uses Lenis scroll)
let lenis = null

function initLenis() {
  if (typeof Lenis === "undefined") return
  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

// GSAP Animations
function initGSAPAnimations() {
  // Banner content fade-in animation on page load
  const bannerContent = document.querySelector(".banner .content")
  if (bannerContent) {
    gsap.from(bannerContent, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    })

    // Animate the starter text
    const starter = document.querySelector(".starter")
    if (starter) {
      gsap.from(starter, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power2.out",
      })
    }

    // Animate buttons with stagger
    const buttons = document.querySelectorAll(".banner .content button")
    if (buttons.length > 0) {
      gsap.from(buttons, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5,
      })
    }
  }

  // Animate floating tech logos
  const techLogos = document.querySelectorAll("[class$='-logo']")
  if (techLogos.length > 0) {
    gsap.from(techLogos, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.8,
    })

    // Add floating animation to logos
    techLogos.forEach((logo, index) => {
      gsap.to(logo, {
        y: "+=20",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1,
      })
    })
  }

  // Animate social icons
  const socialIcons = document.querySelectorAll(".sci li")
  if (socialIcons.length > 0) {
    gsap.from(socialIcons, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 1,
    })
  }

  // Animate day/night toggle button
  const dayNightBtn = document.querySelector(".dayNight")
  if (dayNightBtn) {
    gsap.from(dayNightBtn, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2,
    })
  }

  // About section scroll-triggered animation
  const aboutSection = document.querySelector("#about")
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
    })

    gsap.to("#about .bg-word", {
      xPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

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
    })

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
    })

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
    })

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
    })

    ScrollTrigger.create({
      trigger: "#about",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startAboutTypingEffect,
      onEnterBack: startAboutTypingEffect,
      onLeave: stopAboutTypingEffect,
      onLeaveBack: stopAboutTypingEffect,
    })

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
    })
  }

  // Services section scroll-triggered animation
  const servicesSection = document.querySelector("#services")
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
    })

    gsap.to("#services .bg-word", {
      xPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

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
    })

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
    })

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
    })

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
    })

    ScrollTrigger.create({
      trigger: "#services",
      start: "top 75%",
      end: "bottom 20%",
      onEnter: startShipTypingEffect,
      onEnterBack: startShipTypingEffect,
      onLeave: stopShipTypingEffect,
      onLeaveBack: stopShipTypingEffect,
    })

    gsap.from("#services .service-card", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 36,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
    })

    gsap.from("#services .service-icon", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.7,
      rotation: -12,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.7)",
    })
  }

  // Header animation on scroll
  const header = document.querySelector(".header-top")
  if (header) {
    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      toggleClass: { className: "scrolled", targets: header },
    })

    // Animate header on load
    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  // Anchor links: use Lenis if available, else GSAP
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  const headerHeight = document.querySelector(".header-top")?.offsetHeight || 80
  const scrollOffset = headerHeight + 20

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#" || href === "") return
      e.preventDefault()
      if (href === "#home") {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 })
        else gsap.to(window, { duration: 0.6, scrollTo: { y: 0 }, ease: "power2.out" })
        return
      }
      const target = document.querySelector(href)
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: scrollOffset, duration: 1.2 })
        else {
          gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: target, offsetY: headerHeight + 20 },
            ease: "power2.out",
          })
        }
      }
    })
  })
}

// Fallback smooth scroll only when Lenis is not loaded (wheel/keyboard)
function initSmoothScrollBehavior() {
  if (lenis) return
  let isScrolling = false
  let scrollTimeout

  window.addEventListener(
    "wheel",
    function (e) {
      if (isScrolling) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop
        const targetScroll = currentScroll + e.deltaY * 1.5
        isScrolling = true
        gsap.to(window, {
          duration: 0.15,
          scrollTo: { y: targetScroll },
          ease: "power2.out",
          onComplete: () => {
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => (isScrolling = false), 100)
          },
        })
        e.preventDefault()
      }
    },
    { passive: false }
  )

  window.addEventListener("keydown", function (e) {
    const keys = ["PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]
    if (!keys.includes(e.key)) return
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
    const viewportHeight = window.innerHeight
    let targetScroll = currentScroll
    switch (e.key) {
      case "PageDown":
      case "ArrowDown":
        targetScroll = currentScroll + viewportHeight * 0.8
        break
      case "PageUp":
      case "ArrowUp":
        targetScroll = currentScroll - viewportHeight * 0.8
        break
      case "Home":
        targetScroll = 0
        break
      case "End":
        targetScroll = document.documentElement.scrollHeight
        break
    }
    if (targetScroll !== currentScroll) {
      e.preventDefault()
      gsap.to(window, { duration: 0.4, scrollTo: { y: targetScroll }, ease: "power2.out" })
    }
  })
}

// Add hover animations to buttons
function initButtonAnimations() {
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })
}

// Add hover animations to social icons
function initSocialIconAnimations() {
  const socialLinks = document.querySelectorAll(".sci li a")
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    })

    link.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    })
  })
}

function fillUpPortfolio(portfolio) {
  console.log("portfolio", portfolio)
}

async function fetchPortfolio() {
  const response = await fetch("js/projects.json")
  const portfolio = await response.json()
  return portfolio
}

window.addEventListener("DOMContentLoaded", function (e) {
  initLenis()
  initGSAPAnimations()
  initButtonAnimations()
  initSocialIconAnimations()
  initSmoothScrollBehavior()

  fetchPortfolio()
    .then((json) => {
      fillUpPortfolio(json)
    })
    .catch((error) => {
      console.error(
        'Error fetching portfolio. Please check if "js/projects.json" exists and is accessible. Detailed error:',
        error
      )
    })
})
