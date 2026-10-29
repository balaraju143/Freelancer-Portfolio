/* =========================================
   STACKLY FREELANCER HERO ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    console.warn("GSAP could not be loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector(".freelancer-hero");

  if (!hero) return;

  const titleLines = gsap.utils.toArray(
    ".hero-title span",
    hero
  );

  const eyebrow = hero.querySelector(".hero-eyebrow");
  const divider = hero.querySelector(".hero-divider");
  const intro = hero.querySelector(".hero-intro");
  const proof = hero.querySelector(".hero-social-proof");
  const projectCard = hero.querySelector(".hero-project-card");
  const bottomNote = hero.querySelector(".hero-bottom-note");
  const scrollMark = hero.querySelector(".hero-scroll-mark");

  // Prevent animation flashes before the initial reveal.
  gsap.set(
    [eyebrow, ...titleLines, divider, intro, proof, projectCard, bottomNote],
    { willChange: "transform, opacity" }
  );

  gsap.set(eyebrow, { y: 20, autoAlpha: 0 });
  gsap.set(titleLines, { y: 65, autoAlpha: 0 });
  gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
  gsap.set([intro, proof, bottomNote], { y: 25, autoAlpha: 0 });

  if (projectCard) {
    gsap.set(projectCard, {
      x: 100,
      autoAlpha: 0,
      rotation: 2
    });
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(
      [
        eyebrow,
        ...titleLines,
        divider,
        intro,
        proof,
        projectCard,
        bottomNote,
        scrollMark
      ].filter(Boolean),
      {
        clearProps: "all",
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1
      }
    );

    return;
  }

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  heroTimeline
    .to(eyebrow, {
      y: 0,
      autoAlpha: 1,
      duration: 0.6
    })
    .to(
      titleLines,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        stagger: 0.17
      },
      "-=0.2"
    )
    .to(
      divider,
      {
        scaleX: 1,
        duration: 0.65
      },
      "-=0.3"
    )
    .to(
      intro,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7
      },
      "-=0.2"
    )
    .to(
      proof,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.65
      },
      "-=0.45"
    );

  // Card comes from the right.
  if (projectCard) {
    heroTimeline.to(
      projectCard,
      {
        x: 0,
        autoAlpha: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.65"
    );
  }

  if (bottomNote) {
    heroTimeline.to(
      bottomNote,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.5
      },
      "-=0.45"
    );
  }

  // Gentle movement for the project card after its entrance.
  if (projectCard && window.matchMedia("(min-width: 768px)").matches) {
    gsap.to(projectCard, {
      y: -8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8
    });
  }

  // Optional scroll animation if the hero is revisited.
  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        gsap.to(".hero-background-video", {
          y: self.progress * 35,
          duration: 0.2,
          overwrite: "auto"
        });
      }
    }
  });
});


/* =========================================
   ABOUT SECTION GSAP ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".freelancer-about");

  if (!section || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const tallImage = section.querySelector(".about-image-tall");
  const topImage = section.querySelector(".about-image-top");
  const bottomImage = section.querySelector(".about-image-bottom");

  const contentItems = [
    section.querySelector(".about-eyebrow"),
    section.querySelector(".about-heading"),
    section.querySelector(".about-description"),
    section.querySelector(".about-benefits"),
    section.querySelector(".about-bottom-cards")
  ].filter(Boolean);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  // Images reveal from their respective sides.
  [tallImage, topImage, bottomImage].forEach((image) => {
    if (!image) return;

    gsap.set(image, {
      clipPath: "inset(0 0 0 0)",
      willChange: "clip-path, transform",
      transformOrigin: "center"
    });
  });

  gsap.set(tallImage, {
    x: -85,
    autoAlpha: 0
  });

  gsap.set(topImage, {
    x: 70,
    y: -20,
    autoAlpha: 0
  });

  gsap.set(bottomImage, {
    x: 70,
    y: 20,
    autoAlpha: 0
  });

  gsap.set(contentItems, {
    x: 55,
    autoAlpha: 0
  });

  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 72%",
      once: true
    },
    defaults: {
      ease: "power3.out"
    }
  });

  aboutTimeline
    .to(tallImage, {
      x: 0,
      autoAlpha: 1,
      duration: 1
    })
    .to(
      topImage,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 0.8
      },
      "-=0.55"
    )
    .to(
      bottomImage,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 0.8
      },
      "-=0.55"
    )
    .to(
      contentItems,
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.14
      },
      "-=0.65"
    );

  // Subtle decorative movement.
  const orbit = section.querySelector(".about-orbit");

  if (orbit) {
    gsap.to(orbit, {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
});


/* =========================================
   WHY WORK WITH ME - GSAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".freelancer-why");

  if (!section || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const mainImage = section.querySelector(".why-image-main");
  const overlayImage = section.querySelector(".why-image-overlay");

  const content = [
    section.querySelector(".why-eyebrow"),
    section.querySelector(".why-heading"),
    section.querySelector(".why-description"),
    ...section.querySelectorAll(".why-process-item"),
    section.querySelector(".why-contact-link")
  ].filter(Boolean);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  // Left image enters from the left.
  gsap.set(mainImage, {
    x: -85,
    autoAlpha: 0
  });

  // Foreground image enters from the right.
  gsap.set(overlayImage, {
    x: 75,
    y: 15,
    autoAlpha: 0
  });

  // All content enters from the right.
  gsap.set(content, {
    x: 45,
    autoAlpha: 0
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 72%",
      once: true
    },
    defaults: {
      ease: "power3.out"
    }
  });

  timeline
    .to(mainImage, {
      x: 0,
      autoAlpha: 1,
      duration: 0.9
    })
    .to(
      overlayImage,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 0.85
      },
      "-=0.45"
    )
    .to(
      content,
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.13
      },
      "-=0.5"
    );
});


/* =========================================
   STACKLY WORKFLOW GSAP ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#workflow");

  if (!section || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".workflow-header");
  const steps = gsap.utils.toArray(
    section.querySelectorAll(".workflow-step")
  );

  const images = gsap.utils.toArray(
    section.querySelectorAll(".workflow-image img")
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  // Initial reveal states
  gsap.set(header, {
    y: 35,
    autoAlpha: 0
  });

  gsap.set(steps, {
    y: 45,
    autoAlpha: 0
  });

  // Images begin at zero rotation
  gsap.set(images, {
    rotation: 0,
    transformOrigin: "50% 50%"
  });

  const workflowTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 72%",
      once: true
    },
    defaults: {
      ease: "power3.out"
    }
  });

  workflowTimeline
    .to(header, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8
    })
    .to(
      steps,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.2
      },
      "-=0.25"
    );

  // Each circular image rotates three full turns.
  // All rotations finish after the same duration.
  images.forEach((image) => {
    gsap.to(image, {
      rotation: 1080,
      duration: 2.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        once: true
      }
    });
  });

  // Highlight workflow steps progressively.
  steps.forEach((step, index) => {
    const number = step.querySelector(".workflow-number");

    if (!number) return;

    gsap.fromTo(
      number,
      {
        scale: 0.85
      },
      {
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.7)",
        delay: 0.8 + index * 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true
        }
      }
    );
  });

  // First step is highlighted initially.
  if (steps.length) {
    steps[0].classList.add("is-active");
  }
});


/* =========================================
   STACKLY RECENT WORKS - GSAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#recent-works");

  if (!section || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".projects-header");
  const cards = gsap.utils.toArray(
    section.querySelectorAll(".project-card")
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  // Reveal heading
  gsap.fromTo(
    header,
    {
      y: 35,
      autoAlpha: 0
    },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        once: true
      }
    }
  );

  // Reveal each card and its contents.
  cards.forEach((card, index) => {
    const copy = card.querySelector(".project-copy");
    const image = card.querySelector(".project-image-wrap");

    gsap.fromTo(
      [copy, image],
      {
        y: 45,
        autoAlpha: 0
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          once: true
        }
      }
    );

    // Slight image reveal on entry.
    gsap.fromTo(
      image,
      {
        clipPath: "inset(0 0 0 12%)"
      },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          once: true
        }
      }
    );
  });
});




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



/* =========================================
   STACKLY FREELANCER CTA - GSAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#freelancer-cta");

  if (!section) return;

  const content = section.querySelector(".freelancer-cta-content");
  const visual = section.querySelector(".freelancer-cta-visual");
  const image = section.querySelector(".freelancer-cta-image");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reduceMotion ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.set(content, {
    x: -55,
    autoAlpha: 0
  });

  gsap.set(visual, {
    x: 75,
    autoAlpha: 0
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 78%",
      once: true
    }
  });

  timeline
    .to(content, {
      x: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: "power3.out"
    })
    .to(
      visual,
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.55"
    );
});