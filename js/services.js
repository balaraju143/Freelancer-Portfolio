
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".services-page-hero");

  if (!hero || typeof gsap === "undefined") return;

  const background = hero.querySelector(".services-hero-bg");
  const title = hero.querySelector(".services-hero-title");
  const breadcrumb = hero.querySelector(".services-breadcrumb");

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  if (background) {
    tl.fromTo(
      background,
      { scale: 1.12, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 1.4 },
      0
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85 },
      0.2
    );
  }

  if (breadcrumb) {
    tl.fromTo(
      breadcrumb,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.5
    );
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#freelancer-services");
  if (!section) return;

  const options = [
    {
      title: "UI/UX Design",
      image: "assets/team-1.webp",
      alt: "Designer creating a user interface",
      icon: "design_services",
      description:
        "Intuitive interfaces and thoughtful user journeys designed around real people."
    },
    {
      title: "Website Development",
      image: "assets/team2.webp",
      alt: "Developer building a responsive website",
      icon: "code",
      description:
        "Responsive, fast and reliable websites built to bring your ideas to life on every screen."
    },
    {
      title: "Creative Branding",
      image: "assets/team3.webp",
      alt: "Creative brand identity and visual design work",
      icon: "palette",
      description:
        "Distinctive visual identities, consistent design systems and creative direction that help your brand stand out."
    },
    {
      title: "Motion & Interaction",
      image: "assets/creative-agency.webp",
      alt: "Designer working on interactive digital experiences",
      icon: "animation",
      description:
        "Smooth animations, meaningful transitions and interactive details that make digital experiences memorable."
    },
    {
      title: "Website Optimization",
      image: "assets/offiice-work.webp",
      alt: "Website performance analysis and optimization",
      icon: "speed",
      description:
        "Performance improvements, responsive refinements and usability enhancements for a better website experience."
    }
  ];

  const buttons = section.querySelectorAll(".fp-service-option");
  const image = section.querySelector(".fp-service-image");
  const title = section.querySelector(".fp-service-detail-title");
  const description = section.querySelector(
    ".fp-service-detail-description"
  );
  const icon = section.querySelector(
    ".fp-service-icon .material-symbols-outlined"
  );
  const detail = section.querySelector(".fp-service-detail");

  let activeIndex = 0;
  let isAnimating = false;

  function changeService(index) {
    if (
      index === activeIndex ||
      index < 0 ||
      index >= options.length ||
      isAnimating
    ) return;

    activeIndex = index;

    buttons.forEach((button, i) => {
      const isActive = i === index;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    const service = options[index];

    if (typeof gsap === "undefined") {
      image.src = service.image;
      image.alt = service.alt;
      title.textContent = service.title;
      description.textContent = service.description;
      icon.textContent = service.icon;
      return;
    }

    isAnimating = true;

    gsap.to(detail, {
      opacity: 0,
      x: 24,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        image.src = service.image;
        image.alt = service.alt;
        title.textContent = service.title;
        description.textContent = service.description;
        icon.textContent = service.icon;

        gsap.fromTo(
          detail,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
            onComplete: () => {
              isAnimating = false;
            }
          }
        );
      }
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      changeService(Number(button.dataset.service));
    });
  });

  // Reveal the left service list from the left.
  // Reveal the right detail panel from the right.
  if (typeof gsap !== "undefined") {
    const canUseScrollTrigger =
      typeof ScrollTrigger !== "undefined";

    if (canUseScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const revealSettings = canUseScrollTrigger
      ? {
          trigger: section,
          start: "top 78%",
          once: true
        }
      : undefined;

    gsap.fromTo(
      section.querySelectorAll(".fp-service-reveal-left"),
      { x: -65, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        ...(revealSettings ? { scrollTrigger: revealSettings } : {})
      }
    );

    gsap.fromTo(
      section.querySelectorAll(".fp-service-reveal-right"),
      { x: 65, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        ...(revealSettings ? { scrollTrigger: revealSettings } : {})
      }
    );
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#creative-journey");

  if (!section || typeof gsap === "undefined") return;

  const headingItems = section.querySelectorAll(
    ".fp-timeline-heading-reveal"
  );

  const timelineItems = section.querySelectorAll(
    ".fp-timeline-item"
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const useScrollTrigger =
    typeof ScrollTrigger !== "undefined";

  // Heading and introduction reveal.
  gsap.fromTo(
    headingItems,
    {
      y: 35,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.16,
      ease: "power3.out",
      ...(useScrollTrigger
        ? {
            scrollTrigger: {
              trigger: section.querySelector(".fp-timeline-header"),
              start: "top 82%",
              once: true
            }
          }
        : {})
    }
  );

  // Alternating card reveals.
  timelineItems.forEach((item) => {
    const isLeft = item.classList.contains("fp-timeline-left");

    gsap.fromTo(
      item,
      {
        x: isLeft ? -65 : 65,
        y: 18,
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        ...(useScrollTrigger
          ? {
              scrollTrigger: {
                trigger: item,
                start: "top 87%",
                once: true
              }
            }
          : {})
      }
    );
  });

  // Reveal the bottom call-to-action.
  const footer = section.querySelector(".fp-timeline-footer");

  if (footer) {
    gsap.fromTo(
      footer,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        ...(useScrollTrigger
          ? {
              scrollTrigger: {
                trigger: footer,
                start: "top 92%",
                once: true
              }
            }
          : {})
      }
    );
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#freelancer-pricing");

  if (!section || typeof gsap === "undefined") return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Heading and supporting content.
  const headingItems = section.querySelectorAll(".fp-price-reveal");

  gsap.fromTo(
    headingItems,
    {
      y: 35,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.16,
      ease: "power3.out",
      ...(hasScrollTrigger
        ? {
            scrollTrigger: {
              trigger: section.querySelector(".fp-pricing-header"),
              start: "top 82%",
              once: true
            }
          }
        : {})
    }
  );

  // Alternate the cards' entrance direction.
  const cards = section.querySelectorAll(".fp-price-card");

  cards.forEach((card, index) => {
    const fromLeft = index % 2 === 0;

    gsap.fromTo(
      card,
      {
        x: fromLeft ? -65 : 65,
        y: 20,
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: index * 0.08,
        ease: "power3.out",
        ...(hasScrollTrigger
          ? {
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true
              }
            }
          : {})
      }
    );
  });
});


/* ===== FREELANCER FAQ ACCORDION ===== */

document.querySelectorAll(".fp-faq-item").forEach((item) => {
  const button = item.querySelector(".fp-faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".fp-faq-item").forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".fp-faq-question")
        .setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});


/* ===== GSAP FAQ REVEAL ANIMATIONS ===== */

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.from(".fp-faq-image-reveal", {
    x: -100,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".fp-faq-section",
      start: "top 80%",
      once: true
    }
  });

  gsap.from(".fp-faq-reveal", {
    x: 90,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".fp-faq-content",
      start: "top 82%",
      once: true
    }
  });
}