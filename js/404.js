
/* ==========================================
   STACKLY 404 PAGE INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector("#fp404Back");

  backButton.addEventListener("click", () => {
    if (window.history.length > 1 && document.referrer) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });

  if (!window.gsap) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  timeline
    .from(".fp404-card", {
      opacity: 0,
      y: 24,
      duration: 0.65
    })
    .from(".fp404-logo", {
      opacity: 0,
      y: -12,
      duration: 0.4
    }, "-=0.3")
    .from(".fp404-number > span", {
      opacity: 0,
      y: 22,
      stagger: 0.12,
      duration: 0.45
    }, "-=0.1")
    .from(".fp404-icon-circle", {
      opacity: 0,
      scale: 0.65,
      rotation: -15,
      duration: 0.55
    }, "-=0.3")
    .from(".fp404-label, .fp404-title, .fp404-description", {
      opacity: 0,
      y: 16,
      stagger: 0.12,
      duration: 0.42
    }, "-=0.15")
    .from(".fp404-actions", {
      opacity: 0,
      y: 12,
      duration: 0.4
    }, "-=0.12")
    .from(".fp404-error-code, .fp404-bottom-line, .fp404-footer", {
      opacity: 0,
      y: 8,
      stagger: 0.1,
      duration: 0.35
    }, "-=0.1");

  gsap.to(".fp404-icon-circle", {
    y: -5,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});
