/* ===== CONTACT HERO GSAP ANIMATION ===== */

if (typeof gsap !== "undefined") {
  const contactHero = document.querySelector(".fp-contact-hero");

  if (contactHero) {
    const contactTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    contactTimeline
      .to(".fp-contact-hero-bg", {
        scale: 1,
        duration: 1.4
      })
      .to(
        ".fp-contact-hero-title",
        {
          y: 0,
          opacity: 1,
          duration: 0.9
        },
        "-=0.8"
      )
      .to(
        ".fp-contact-breadcrumb",
        {
          y: 0,
          opacity: 1,
          duration: 0.7
        },
        "-=0.45"
      );
  }
}


/* ===== CONTACT FORM VALIDATION ===== */

(() => {
  const form = document.querySelector("#fpContactForm");

  if (!form) return;

  const fields = {
    name: document.querySelector("#fpContactName"),
    email: document.querySelector("#fpContactEmail"),
    phone: document.querySelector("#fpContactPhone"),
    message: document.querySelector("#fpContactMessage")
  };

  const errors = {
    name: document.querySelector("#fpNameError"),
    email: document.querySelector("#fpEmailError"),
    phone: document.querySelector("#fpPhoneError"),
    message: document.querySelector("#fpMessageError")
  };

  const errorTimers = {};

  function clearError(key) {
    clearTimeout(errorTimers[key]);
    errors[key].textContent = "";
    fields[key].classList.remove("fp-contact-invalid");
    fields[key].removeAttribute("aria-invalid");
  }

  function showError(key, message) {
    clearTimeout(errorTimers[key]);

    errors[key].textContent = message;
    fields[key].classList.add("fp-contact-invalid");
    fields[key].setAttribute("aria-invalid", "true");

    errorTimers[key] = setTimeout(() => {
      errors[key].textContent = "";
      fields[key].classList.remove("fp-contact-invalid");
      fields[key].removeAttribute("aria-invalid");
    }, 3000);
  }

  // Name: allow letters and spaces only.
  fields.name.addEventListener("input", () => {
    fields.name.value = fields.name.value.replace(/[^a-zA-Z\s]/g, "");
    clearError("name");
  });

  Object.keys(fields).forEach((key) => {
    if (key !== "name") {
      fields[key].addEventListener("input", () => clearError(key));
    }
  });

  function validateForm() {
    let valid = true;

    Object.keys(fields).forEach(clearError);

    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const phone = fields.phone.value.trim();
    const message = fields.message.value.trim();

    if (!name) {
      showError("name", "Please enter your name.");
      valid = false;
    } else if (!/^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/.test(name)) {
      showError("name", "Use letters only for your name.");
      valid = false;
    }

    if (!email) {
      showError("email", "Please enter your email address.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }

    const digits = phone.replace(/\D/g, "");

    if (!phone) {
      showError("phone", "Please enter your phone number.");
      valid = false;
    } else if (!/^[+\d\s().-]+$/.test(phone) ||
               digits.length < 7 ||
               digits.length > 15) {
      showError("phone", "Enter a valid phone number.");
      valid = false;
    }

    if (!message) {
      showError("message", "Please describe your project.");
      valid = false;
    } else if (message.length < 10) {
      showError("message", "Please enter at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
    }

    return valid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Reset the form when the visitor returns with Back.
    sessionStorage.setItem("fpContactResetOnReturn", "true");

    window.location.href = "404.html";
  });

  // Restore a clean form when navigating back from 404.html.
  window.addEventListener("pageshow", () => {
    if (sessionStorage.getItem("fpContactResetOnReturn") === "true") {
      form.reset();
      Object.keys(fields).forEach(clearError);
      sessionStorage.removeItem("fpContactResetOnReturn");
    }
  });
})();

/* ===== CONTACT SECTION GSAP ===== */

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const contactSection = document.querySelector("#fp-contact-form");

  if (contactSection) {
    const scrollOptions = {
      trigger: contactSection,
      start: "top 78%",
      once: true
    };

    gsap.from(contactSection.querySelector(".fp-contact-heading"), {
      x: -70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: scrollOptions
    });

    gsap.from(contactSection.querySelector(".fp-contact-intro"), {
      x: 70,
      opacity: 0,
      duration: 0.9,
      delay: 0.12,
      ease: "power3.out",
      scrollTrigger: scrollOptions
    });

    gsap.from(contactSection.querySelector(".fp-contact-visual"), {
      x: -90,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactSection.querySelector(".fp-contact-layout"),
        start: "top 82%",
        once: true
      }
    });

    gsap.from(contactSection.querySelector(".fp-contact-form-card"), {
      x: 90,
      opacity: 0,
      duration: 1,
      delay: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactSection.querySelector(".fp-contact-layout"),
        start: "top 82%",
        once: true
      }
    });
  }
}

/* ===== CONTACT OPTIONS GSAP — OVERLAP FIX ===== */

(() => {
  const section = document.querySelector("#fp-contact-options");

  if (!section || typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Prevent duplicate initialization
  if (section.dataset.gsapInitialized === "true") return;
  section.dataset.gsapInitialized = "true";

  const heading = section.querySelector(".fp-contact-options-heading");
  const intro = section.querySelector(".fp-contact-options-intro");
  const cards = Array.from(
    section.querySelectorAll(".fp-contact-option-card")
  );

  // Set initial states before animation
  gsap.set([heading, intro, ...cards].filter(Boolean), {
    opacity: 0
  });

  gsap.set(heading, { x: -55 });
  gsap.set(intro, { x: 55 });

  cards.forEach((card, index) => {
    gsap.set(card, {
      x: index % 2 === 0 ? -45 : 45,
      y: 0
    });
  });

  const playAnimation = () => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.65,
        ease: "power3.out"
      }
    });

    timeline
      .to(heading, {
        x: 0,
        opacity: 1
      })
      .to(
        intro,
        {
          x: 0,
          opacity: 1
        },
        "-=0.3"
      );

    // Reveal cards one by one in DOM order.
    // Alternating directions avoids simultaneous card movement.
    cards.forEach((card, index) => {
      timeline.to(
        card,
        {
          x: 0,
          opacity: 1,
          duration: 0.6
        },
        index === 0 ? "-=0.05" : "-=0.25"
      );
    });

    return timeline;
  };

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      once: true,
      onEnter: playAnimation
    });
  } else {
    playAnimation();
  }
})();


/* ===== OFFICE MAP GSAP ANIMATION ===== */

(() => {
  const section = document.querySelector("#fp-office-map");

  if (!section || typeof gsap === "undefined") return;
  if (section.dataset.mapAnimated === "true") return;

  section.dataset.mapAnimated = "true";

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const heading = section.querySelector(".fp-office-map-heading");
  const map = section.querySelector(".fp-office-map-frame");
  const button = section.querySelector(".fp-office-map-directions");

  const headingTitle = heading.querySelector("h2");
  const description = heading.querySelector("p");
  const label = heading.querySelector(".fp-office-map-label");

  gsap.set([label, headingTitle, description, map, button], {
    opacity: 0
  });

  gsap.set(label, { y: 15 });
  gsap.set(headingTitle, { x: -45 });
  gsap.set(description, { x: 45 });
  gsap.set(map, { y: 35 });
  gsap.set(button, { y: 15 });

  const animateMapSection = () => {
    gsap.timeline({
      defaults: { ease: "power3.out" }
    })
    .to(label, {
      y: 0,
      opacity: 1,
      duration: 0.45
    })
    .to(headingTitle, {
      x: 0,
      opacity: 1,
      duration: 0.7
    }, "-=0.15")
    .to(description, {
      x: 0,
      opacity: 1,
      duration: 0.65
    }, "-=0.25")
    .to(map, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.1")
    .to(button, {
      y: 0,
      opacity: 1,
      duration: 0.45
    }, "-=0.2");
  };

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      once: true,
      onEnter: animateMapSection
    });
  } else {
    animateMapSection();
  }
})();


/* ========================================
   STACKLY FAQ - GSAP + ACCORDION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector("#fp-faq");

  if (!faqSection) return;

  // Reveal image from left and content from right.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const faqImage = faqSection.querySelector(".fp-faq-visual");
    const faqContent = faqSection.querySelector(".fp-faq-content");

    gsap.set(faqImage, {
      x: -75,
      opacity: 0
    });

    gsap.set(faqContent, {
      x: 75,
      opacity: 0
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: faqSection,
        start: "top 78%",
        once: true
      }
    })
      .to(faqImage, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      })
      .to(faqContent, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.65");

    // Reveal FAQ rows in sequence.
    gsap.from(faqSection.querySelectorAll(".fp-faq-item"), {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: faqSection.querySelector(".fp-faq-list"),
        start: "top 88%",
        once: true
      }
    });

    gsap.from(faqSection.querySelector(".fp-faq-contact-btn"), {
      y: 15,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
      scrollTrigger: {
        trigger: faqSection.querySelector(".fp-faq-contact-btn"),
        start: "top 95%",
        once: true
      }
    });
  }

  // Accessible accordion: one question open at a time.
  const faqItems = faqSection.querySelectorAll(".fp-faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".fp-faq-question");
    const icon = item.querySelector(".fp-faq-toggle");

    button.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");

        const otherButton = otherItem.querySelector(".fp-faq-question");
        const otherIcon = otherItem.querySelector(".fp-faq-toggle");

        otherButton.setAttribute("aria-expanded", "false");
        otherIcon.textContent = "add";
      });

      if (shouldOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        icon.textContent = "remove";
      }
    });
  });
});
