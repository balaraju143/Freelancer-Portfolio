/* ===== BLOG HERO GSAP ANIMATION ===== */

if (typeof gsap !== "undefined") {
  const blogHero = document.querySelector(".fp-blog-hero");

  if (blogHero) {
    const blogTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    blogTimeline
      .to(".fp-blog-hero-bg", {
        scale: 1,
        duration: 1.4
      })
      .to(
        ".fp-blog-hero-title",
        {
          y: 0,
          opacity: 1,
          duration: 0.9
        },
        "-=0.9"
      )
      .to(
        ".fp-blog-breadcrumb",
        {
          y: 0,
          opacity: 1,
          duration: 0.7
        },
        "-=0.5"
      );
  }
}


/* ===== FREELANCER BLOG GSAP REVEALS ===== */

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const blogSection = document.querySelector("#fp-latest-blog");

  if (blogSection) {
    // Heading reveals from the left
    gsap.from(".fp-blog-heading-reveal", {
      x: -90,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: blogSection,
        start: "top 80%",
        once: true
      }
    });

    // Description and button reveal from the right
    gsap.from(".fp-blog-intro-reveal", {
      x: 90,
      opacity: 0,
      duration: 1,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: blogSection,
        start: "top 80%",
        once: true
      }
    });

    // Cards alternate from left and right
    gsap.from(".fp-blog-card-left", {
      x: -85,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-blog-grid",
        start: "top 85%",
        once: true
      }
    });

    gsap.from(".fp-blog-card-right", {
      x: 85,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-blog-grid",
        start: "top 85%",
        once: true
      }
    });
  }
}


/* ===== EDITORIAL SECTION GSAP ANIMATIONS ===== */

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const editorialSection = document.querySelector("#fp-editorial");

  if (editorialSection) {
    const editorialLeft = editorialSection.querySelector(
      ".fp-editorial-left"
    );

    const editorialRight = editorialSection.querySelector(
      ".fp-editorial-right"
    );

    // All left-side content reveals from the left
    gsap.from(editorialLeft, {
      x: -90,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: editorialSection,
        start: "top 78%",
        once: true
      }
    });

    // Flower-shaped image reveals from the right
    gsap.from(editorialRight, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: editorialSection,
        start: "top 78%",
        once: true
      }
    });
  }
}

/* ===== INSIGHTS SECTION GSAP ===== */

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const insightsSection = document.querySelector("#fp-insights");

  if (insightsSection) {
    const heading = insightsSection.querySelector(
      ".fp-insights-heading-reveal"
    );

    const leftCards = insightsSection.querySelectorAll(
      ".fp-insight-left"
    );

    const rightCards = insightsSection.querySelectorAll(
      ".fp-insight-right"
    );

    gsap.from(heading, {
      y: 45,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: insightsSection,
        start: "top 80%",
        once: true
      }
    });

    gsap.from(leftCards, {
      x: -80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-insights-grid",
        start: "top 85%",
        once: true
      }
    });

    gsap.from(rightCards, {
      x: 80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-insights-grid",
        start: "top 85%",
        once: true
      }
    });

    /* Mobile tap support */
    insightsSection.querySelectorAll(".fp-insight-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;

        if (window.matchMedia("(max-width: 600px)").matches) {
          card.classList.toggle("is-flipped");
        }
      });

      card.addEventListener("keydown", (event) => {
        if (
          window.matchMedia("(max-width: 600px)").matches &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          card.classList.toggle("is-flipped");
        }
      });
    });
  }
}





/* =========================================
   STACKLY TEAM - GSAP + RESPONSIVE SOCIALS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#our-team");

  if (!section) return;

  const headingBlock = section.querySelector(".team-heading-block");
  const intro = section.querySelector(".team-intro");
  const cards = Array.from(section.querySelectorAll(".team-card"));

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================
     GSAP ANIMATIONS
  ========================================= */

  if (
    !reduceMotion &&
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
  ) {
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    if (headingBlock && intro) {
      gsap.set(headingBlock, {
        x: -45,
        autoAlpha: 0
      });

      gsap.set(intro, {
        x: 45,
        autoAlpha: 0
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true
        }
      })
      .to(headingBlock, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(intro, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.45");
    }

    // Alternate card reveal directions
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          x: index % 2 === 0 ? -45 : 45,
          y: 18,
          autoAlpha: 0
        },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: (index % 2) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true
          }
        }
      );
    });
  }

  /* =========================================
     SOCIAL ICONS - DESKTOP + MOBILE
  ========================================= */

  const isMobile = () =>
    window.matchMedia("(max-width: 600px)").matches;

  function closeCard(card) {
    card.classList.remove("is-social-open");

    const toggle = card.querySelector(".team-social-toggle");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  function closeOtherCards(currentCard) {
    cards.forEach((card) => {
      if (card !== currentCard) closeCard(card);
    });
  }

  function toggleSocials(card) {
    if (!card) return;

    const willOpen = !card.classList.contains("is-social-open");

    closeOtherCards(card);

    if (willOpen) {
      card.classList.add("is-social-open");

      const toggle = card.querySelector(".team-social-toggle");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
      }
    } else {
      closeCard(card);
    }
  }

  cards.forEach((card) => {
    const photo = card.querySelector(".team-photo");
    const toggle = card.querySelector(".team-social-toggle");
    const socials = card.querySelector(".team-socials");

    // Ensure the toggle starts in the closed state
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        toggleSocials(card);
      });
    }

    // On mobile, tapping the image toggles social icons
    if (photo) {
      photo.addEventListener("click", (event) => {
        if (!isMobile()) return;

        // Do not interfere with social links or the share button
        if (
          event.target.closest(".team-socials a") ||
          event.target.closest(".team-social-toggle")
        ) {
          return;
        }

        event.stopPropagation();
        toggleSocials(card);
      });
    }

    // Keep clicks on social links working normally
    if (socials) {
      socials.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }
  });

  // Outside click closes the mobile social panel
  document.addEventListener("click", (event) => {
    if (!section.contains(event.target)) {
      cards.forEach(closeCard);
      return;
    }

    if (
      event.target.closest(".team-social-toggle") ||
      event.target.closest(".team-socials")
    ) {
      return;
    }

    if (isMobile() && !event.target.closest(".team-photo")) {
      cards.forEach(closeCard);
    }
  });

  // Escape key closes open social panels
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cards.forEach(closeCard);
    }
  });

  // Reset the tap state when switching back to desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      cards.forEach(closeCard);
    }
  });
});


