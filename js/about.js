
/* =========================================
   ABOUT HERO - GSAP ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#aboutPageHero");

  if (!hero || typeof gsap === "undefined") return;

  const background = hero.querySelector(".about-hero-bg");
  const title = hero.querySelector(".about-hero-title");
  const breadcrumb = hero.querySelector(".about-breadcrumb");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  gsap.set([title, breadcrumb], {
    autoAlpha: 0,
    y: 28
  });

  gsap.set(background, {
    scale: 1.1
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  timeline
    .to(background, {
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(title, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85
    }, "-=1.0")
    .to(breadcrumb, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7
    }, "-=0.45");
});




/* =========================================
   STACKLY ABOUT INTRO - GSAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#aboutIntro");

  if (!section || typeof gsap === "undefined") return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const tallImage = section.querySelector(".about-visual-tall");
  const topImage = section.querySelector(".about-visual-top");
  const profileCard = section.querySelector(".about-profile-card");
  const content = section.querySelector(".about-intro-content");
  const featureCards = gsap.utils.toArray(
    section.querySelectorAll(".about-feature")
  );
  const experienceCard = section.querySelector(".about-experience-card");

  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

  const scrollSettings = hasScrollTrigger
    ? {
        trigger: section,
        start: "top 78%",
        once: true
      }
    : {};

  gsap.set(tallImage, { x: -65, autoAlpha: 0 });
  gsap.set(topImage, { y: -55, autoAlpha: 0 });
  gsap.set(profileCard, { y: 55, autoAlpha: 0 });
  gsap.set(content, { x: 65, autoAlpha: 0 });
  gsap.set(experienceCard, { x: 50, autoAlpha: 0 });

  gsap.set(featureCards, {
    x: 25,
    autoAlpha: 0
  });

  const timeline = gsap.timeline({
    scrollTrigger: scrollSettings,
    defaults: {
      duration: 0.85,
      ease: "power3.out"
    }
  });

  timeline
    .to(tallImage, {
      x: 0,
      autoAlpha: 1
    }, 0)
    .to(topImage, {
      y: 0,
      autoAlpha: 1
    }, 0.12)
    .to(profileCard, {
      y: 0,
      autoAlpha: 1
    }, 0.24)
    .to(content, {
      x: 0,
      autoAlpha: 1
    }, 0.1)
    .to(featureCards, {
      x: 0,
      autoAlpha: 1,
      stagger: 0.15,
      duration: 0.7
    }, 0.45)
    .to(experienceCard, {
      x: 0,
      autoAlpha: 1,
      duration: 0.8
    }, 0.4);
});



/* =========================================
   STACKLY SERVICES - GSAP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#creativeServices");

  if (!section) return;

  const cards = Array.from(
    section.querySelectorAll(".creative-service-card")
  );

  // Touch interaction: first tap highlights the card;
  // second tap navigates to the card's destination.
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const isTouch = window.matchMedia(
        "(hover: none), (pointer: coarse)"
      ).matches;

      if (!isTouch) return;

      if (!card.classList.contains("is-highlighted")) {
        event.preventDefault();

        cards.forEach((item) => {
          item.classList.remove("is-highlighted");
        });

        card.classList.add("is-highlighted");
      }
    });
  });

  if (typeof gsap === "undefined") return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const heading = section.querySelector(".creative-services-heading");
  const intro = section.querySelector(".creative-services-intro");

  const canScrollTrigger = typeof ScrollTrigger !== "undefined";

  const settings = canScrollTrigger
    ? {
        trigger: section,
        start: "top 80%",
        once: true
      }
    : {};

  gsap.set(heading, {
    x: -45,
    autoAlpha: 0
  });

  gsap.set(intro, {
    x: 45,
    autoAlpha: 0
  });

  cards.forEach((card, index) => {
    gsap.set(card, {
      x: index % 2 === 0 ? -45 : 45,
      y: 20,
      autoAlpha: 0
    });
  });

  const timeline = gsap.timeline({
    scrollTrigger: settings,
    defaults: {
      ease: "power3.out"
    }
  });

  timeline
    .to(heading, {
      x: 0,
      autoAlpha: 1,
      duration: 0.8
    })
    .to(intro, {
      x: 0,
      autoAlpha: 1,
      duration: 0.8
    }, "-=0.5")
    .to(cards, {
      x: 0,
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      stagger: 0.14
    }, "-=0.3");
});


  gsap.registerPlugin(ScrollTrigger);

  // Image reveals from the left
  gsap.from(".gsap-image-reveal", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".portfolio-process",
      start: "top 78%",
      once: true
    }
  });


  gsap.from(".gsap-process-item", {
    x: 75,
    opacity: 0,
    duration: 0.85,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".process-content",
      start: "top 78%",
      once: true
    }
  });



document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".fp-testimonials");

  if (!section) return;

  const track = section.querySelector(".fp-testimonials-track");
  const cards = Array.from(
    section.querySelectorAll(".fp-testimonial-card")
  );
  const prevBtn = section.querySelector(".fp-prev");
  const nextBtn = section.querySelector(".fp-next");
  const pagination = section.querySelector(".fp-carousel-pagination");

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  let visibleCards = 3;
  let maxIndex = 0;
  let autoplayId;
  let resizeTimeout;

  const getVisibleCards = () =>
    window.matchMedia("(max-width: 700px)").matches ? 1 : 3;

  function getMaxIndex() {
    return Math.max(0, cards.length - visibleCards);
  }

  function updatePagination() {
    pagination.innerHTML = "";

    const pageCount = maxIndex + 1;

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "fp-carousel-dot";
      dot.setAttribute("aria-label", `Go to testimonial position ${i + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
        restartAutoplay();
      });

      pagination.appendChild(dot);
    }
  }

  function updateSlider() {
    const firstCard = cards[0];

    if (!firstCard) return;

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translate3d(-${offset}px, 0, 0)`;

    const dots = pagination.querySelectorAll(".fp-carousel-dot");

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);

      if (i === currentIndex) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = maxIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = maxIndex === 0;
    }
  }

  function refreshSlider() {
    const previousVisibleCards = visibleCards;

    visibleCards = getVisibleCards();
    maxIndex = getMaxIndex();

    // Keep the carousel position valid when the viewport changes.
    if (previousVisibleCards !== visibleCards) {
      currentIndex = 0;
      updatePagination();
    } else {
      currentIndex = Math.min(currentIndex, maxIndex);
    }

    updateSlider();
  }

  function nextSlide() {
    currentIndex = currentIndex >= maxIndex
      ? 0
      : currentIndex + 1;

    updateSlider();
  }

  function previousSlide() {
    currentIndex = currentIndex <= 0
      ? maxIndex
      : currentIndex - 1;

    updateSlider();
  }

  function stopAutoplay() {
    clearInterval(autoplayId);
  }

  function startAutoplay() {
    stopAutoplay();

    if (maxIndex === 0) return;

    autoplayId = setInterval(nextSlide, 3500);
  }

  function restartAutoplay() {
    startAutoplay();
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn?.addEventListener("click", () => {
    previousSlide();
    restartAutoplay();
  });

  // Pause the carousel while the visitor reads a testimonial.
  section.addEventListener("mouseenter", stopAutoplay);
  section.addEventListener("mouseleave", startAutoplay);

  section.addEventListener("focusin", stopAutoplay);
  section.addEventListener("focusout", (event) => {
    if (!section.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });

  // Swipe support for mobile.
  let touchStartX = 0;
  let touchEndX = 0;

  const swipeArea = section.querySelector(".fp-testimonials-window");

  swipeArea?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  swipeArea?.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 45) return;

    if (difference > 0) {
      nextSlide();
    } else {
      previousSlide();
    }

    restartAutoplay();
  }, { passive: true });

  // Recalculate card dimensions after resizing.
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      refreshSlider();
      restartAutoplay();
    }, 120);
  });

  // GSAP: heading and cards reveal on scroll.
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.fromTo(
      section.querySelectorAll(".fp-reveal"),
      {
        y: 35,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true
        }
      }
    );

    gsap.fromTo(
      cards,
      {
        y: -45,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".fp-testimonials-window"),
          start: "top 85%",
          once: true
        }
      }
    );
  }

  // Initialize the carousel.
  refreshSlider();
  startAutoplay();
});
