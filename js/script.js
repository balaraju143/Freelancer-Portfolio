/* =====================================
   STACKLY RESPONSIVE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

function openMobileMenu() {
  mobileNavigation.classList.add("is-open");
  menuToggle.classList.add("is-active");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");

  mobileNavigation.setAttribute("aria-hidden", "false");
  mobileNavigation.removeAttribute("inert");

  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileNavigation.classList.remove("is-open");
  menuToggle.classList.remove("is-active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  mobileNavigation.setAttribute("aria-hidden", "true");
  mobileNavigation.setAttribute("inert", "");

  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

// Close the menu after selecting a page.
mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close with Escape.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMobileMenu();
    menuToggle.focus();
  }
});

// Close if the viewport changes back to desktop.
const desktopBreakpoint = window.matchMedia("(min-width: 851px)");

desktopBreakpoint.addEventListener("change", (event) => {
  if (event.matches) {
    closeMobileMenu();
  }
});

// Highlight the current page automatically.
const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});




/* =========================================
   STACKLY FOOTER - NEWSLETTER VALIDATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("footerSubscribeForm");
  const emailInput = document.getElementById("footerEmail");
  const errorElement = document.getElementById("footerEmailError");
  const yearElement = document.getElementById("footerYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (!form || !emailInput || !errorElement) return;

  let errorTimeout;

  function clearError() {
    window.clearTimeout(errorTimeout);
    errorElement.textContent = "";
    emailInput.removeAttribute("aria-invalid");
  }

  function showError(message) {
    window.clearTimeout(errorTimeout);

    errorElement.textContent = message;
    emailInput.setAttribute("aria-invalid", "true");

    errorTimeout = window.setTimeout(() => {
      errorElement.textContent = "";
      emailInput.removeAttribute("aria-invalid");
    }, 3000);
  }

  emailInput.addEventListener("input", clearError);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    const email = emailInput.value.trim();

    if (!email) {
      showError("Please enter your email address.");
      emailInput.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
      showError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    // Reset before navigating so the form is empty when revisited.
    form.reset();
    clearError();

    window.location.href = "404.html";
  });

  // Reset form when returning through browser back/forward navigation.
  window.addEventListener("pageshow", () => {
    form.reset();
    clearError();
  });
});
