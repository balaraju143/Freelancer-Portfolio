
/* ==========================================
   STACKLY FREELANCER LOGIN
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#fp-login");
  if (!section) return;

  const form = section.querySelector("#fpLoginForm");
  const emailInput = section.querySelector("#fpLoginEmail");
  const passwordInput = section.querySelector("#fpLoginPassword");
  const passwordToggle = section.querySelector("#fpPasswordToggle");
  const submitButton = section.querySelector("#fpLoginSubmit");
  const loginMessage = section.querySelector("#fpLoginMessage");
  const rememberMe = section.querySelector("#fpRememberMe");
  const roleButtons = section.querySelectorAll(".fp-role-btn");

  const emailError = section.querySelector("#fpEmailError");
  const passwordError = section.querySelector("#fpPasswordError");

  let selectedRole = "client";
  const messageTimers = new WeakMap();

  // Update the selected account role.
  function selectRole(role) {
    selectedRole = role;

    roleButtons.forEach((button) => {
      const selected = button.dataset.role === role;

      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    submitButton.querySelector("span").textContent =
      role === "admin" ? "Sign In as Admin" : "Sign In as Client";

    clearMessage(section.querySelector("#fpRoleError"));
  }

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectRole(button.dataset.role);
    });
  });

  // Show a field-level error for 3 seconds.
  function showError(element, message) {
    clearMessage(element);
    element.textContent = message;
    element.classList.add("show");

    const field = element.closest(".fp-login-field");
    if (field) field.classList.add("has-error");

    const inputWrap = field?.querySelector(".fp-input-wrap");
    if (inputWrap) inputWrap.classList.add("fp-invalid");

    const timer = setTimeout(() => {
      clearMessage(element);
    }, 3000);

    messageTimers.set(element, timer);
  }

  function clearMessage(element) {
    if (!element) return;

    const timer = messageTimers.get(element);
    if (timer) clearTimeout(timer);

    element.textContent = "";
    element.classList.remove("show");

    const field = element.closest(".fp-login-field");
    if (field) {
      field.classList.remove("has-error");
      field.querySelector(".fp-input-wrap")?.classList.remove("fp-invalid");
    }
  }

  function showLoginMessage(message, type = "error") {
    loginMessage.textContent = message;
    loginMessage.className = `fp-login-message show ${type}`;

    const existingTimer = messageTimers.get(loginMessage);
    if (existingTimer) clearTimeout(existingTimer);

    const timer = setTimeout(() => {
      loginMessage.textContent = "";
      loginMessage.className = "fp-login-message";
    }, 3000);

    messageTimers.set(loginMessage, timer);
  }

  function clearLoginMessage() {
    const timer = messageTimers.get(loginMessage);
    if (timer) clearTimeout(timer);

    loginMessage.textContent = "";
    loginMessage.className = "fp-login-message";
  }

  // Validate email format.
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  // Password visibility toggle.
  passwordToggle.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(isHidden));
    passwordToggle.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );

    passwordToggle.querySelector(".material-symbols-outlined").textContent =
      isHidden ? "visibility" : "visibility_off";
  });

  // Remove field errors when the user starts correcting them.
  emailInput.addEventListener("input", () => {
    clearMessage(emailError);
    clearLoginMessage();
  });

  passwordInput.addEventListener("input", () => {
    clearMessage(passwordError);
    clearLoginMessage();
  });

  // Submit and validate.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearMessage(emailError);
    clearMessage(passwordError);
    clearLoginMessage();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;

    if (!email) {
      showError(emailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError(emailError, "Enter a valid email, such as name@example.com.");
      isValid = false;
    }

    if (!password.trim()) {
      showError(passwordError, "Please enter your password.");
      isValid = false;
    } else if (password.length < 8) {
      showError(passwordError, "Password must contain at least 8 characters.");
      isValid = false;
    }

    if (!isValid) return;

    /*
      DEMO FRONT-END REDIRECT:
      Replace these destinations with your real dashboard pages.
      A real application must verify the user's credentials and role
      through a secure backend before allowing dashboard access.
    */

    const dashboardRoutes = {
      client: "client-dashboard.html",
      admin: "admin-dashboard.html"
    };

    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Please wait...";

    showLoginMessage(
      `Details validated. Opening the ${selectedRole} workspace...`,
      "success"
    );

    // Small delay lets the feedback be visible before navigation.
    setTimeout(() => {
      if (rememberMe.checked) {
        // This is only a demo preference; it does not authenticate a user.
        try {
          sessionStorage.setItem("fpLoginRememberChoice", "true");
        } catch (error) {
          // Continue if browser storage is unavailable.
        }
      }
     
      sessionStorage.setItem("fpLoggedInEmail", email);
      window.location.href = dashboardRoutes[selectedRole];
    }, 650);
  });

  // Reset on page load, including browser back/forward cache restoration.
  function resetLoginForm() {
    form.reset();

    selectedRole = "client";
    selectRole("client");

    emailInput.value = "";
    passwordInput.value = "";
    passwordInput.type = "password";

    passwordToggle.setAttribute("aria-pressed", "false");
    passwordToggle.setAttribute("aria-label", "Show password");
    passwordToggle.querySelector(".material-symbols-outlined").textContent =
      "visibility_off";

    clearMessage(emailError);
    clearMessage(passwordError);
    clearMessage(section.querySelector("#fpRoleError"));
    clearLoginMessage();

    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Sign In as Client";
  }

  window.addEventListener("pageshow", () => {
    resetLoginForm();
  });

  // GSAP reveal animations.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      section.querySelector(".fp-login-visual"),
      { x: -45, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        }
      }
    );

    gsap.fromTo(
      section.querySelector(".fp-login-form-panel"),
      { x: 45, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        }
      }
    );
  }
});
