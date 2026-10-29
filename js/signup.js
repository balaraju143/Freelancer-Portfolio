
/* ==========================================
   STACKLY FREELANCER SIGNUP
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#fp-signup");
  if (!section) return;

  const form = section.querySelector("#fpSignupForm");
  const nameInput = section.querySelector("#fpSignupName");
  const emailInput = section.querySelector("#fpSignupEmail");
  const passwordInput = section.querySelector("#fpSignupPassword");
  const confirmInput = section.querySelector("#fpSignupConfirmPassword");
  const submitButton = section.querySelector("#fpSignupSubmit");
  const message = section.querySelector("#fpSignupMessage");
  const roleButtons = section.querySelectorAll(".fp-signup-role-btn");

  const nameError = section.querySelector("#fpSignupNameError");
  const emailError = section.querySelector("#fpSignupEmailError");
  const passwordError = section.querySelector("#fpSignupPasswordError");
  const confirmError = section.querySelector("#fpSignupConfirmError");

  const timers = new WeakMap();
  let selectedRole = "client";

  // Role selection.
  function selectRole(role) {
    selectedRole = role;

    roleButtons.forEach((button) => {
      const selected = button.dataset.role === role;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectRole(button.dataset.role);
    });
  });

  // Validation message helpers: errors disappear after 3 seconds.
  function clearError(element) {
    if (!element) return;

    const timer = timers.get(element);
    if (timer) clearTimeout(timer);

    element.textContent = "";
    element.classList.remove("show");

    const field = element.closest(".fp-signup-field");

    if (field) {
      field.classList.remove("has-error");
      field
        .querySelector(".fp-signup-input-wrap")
        ?.classList.remove("fp-invalid");
    }
  }

  function showError(element, text) {
    clearError(element);

    element.textContent = text;
    element.classList.add("show");

    const field = element.closest(".fp-signup-field");

    if (field) {
      field.classList.add("has-error");
      field
        .querySelector(".fp-signup-input-wrap")
        ?.classList.add("fp-invalid");
    }

    const timer = setTimeout(() => {
      clearError(element);
    }, 3000);

    timers.set(element, timer);
  }

  function clearMessage() {
    const timer = timers.get(message);
    if (timer) clearTimeout(timer);

    message.textContent = "";
    message.className = "fp-signup-message";
  }

  function showMessage(text, type = "error") {
    clearMessage();

    message.textContent = text;
    message.classList.add("show", type);

    const timer = setTimeout(() => {
      message.textContent = "";
      message.className = "fp-signup-message";
    }, 3000);

    timers.set(message, timer);
  }

  function clearAllErrors() {
    [nameError, emailError, passwordError, confirmError].forEach(clearError);
    clearMessage();
  }

  // Name: letters and spaces only.
  // Invalid characters are removed as the user types or pastes.
  nameInput.addEventListener("input", () => {
    const cleaned = nameInput.value.replace(/[^a-zA-Z ]/g, "");

    if (nameInput.value !== cleaned) {
      nameInput.value = cleaned;
    }

    clearError(nameError);
    clearMessage();
  });

  emailInput.addEventListener("input", () => {
    clearError(emailError);
    clearMessage();
  });

  passwordInput.addEventListener("input", () => {
    clearError(passwordError);
    clearError(confirmError);
    clearMessage();
  });

  confirmInput.addEventListener("input", () => {
    clearError(confirmError);
    clearMessage();
  });

  // Show/hide password for both password fields.
  section.querySelectorAll(".fp-signup-password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = section.querySelector(
        `#${button.dataset.target}`
      );

      if (!input) return;

      const showPassword = input.type === "password";

      input.type = showPassword ? "text" : "password";

      button.setAttribute("aria-pressed", String(showPassword));
      button.setAttribute(
        "aria-label",
        showPassword ? "Hide password" : "Show password"
      );

      button.querySelector(".material-symbols-outlined").textContent =
        showPassword ? "visibility" : "visibility_off";
    });
  });

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  // Form submission and validation.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAllErrors();

    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let valid = true;

    // Full name validation.
    if (!fullName) {
      showError(nameError, "Please enter your full name.");
      valid = false;
    } else if (!/^[A-Za-z]+(?: +[A-Za-z]+)*$/.test(fullName)) {
      showError(nameError, "Name can contain only letters and spaces.");
      valid = false;
    } else if (fullName.replace(/\s/g, "").length < 2) {
      showError(nameError, "Please enter at least 2 letters.");
      valid = false;
    }

    // Email validation.
    if (!email) {
      showError(emailError, "Please enter your email address.");
      valid = false;
    } else if (!validEmail(email)) {
      showError(emailError, "Please enter a valid email address.");
      valid = false;
    }

    // Password validation.
    if (!password) {
      showError(passwordError, "Please create a password.");
      valid = false;
    } else if (password.length < 8) {
      showError(passwordError, "Password must contain at least 8 characters.");
      valid = false;
    }

    // Confirm password validation.
    if (!confirmPassword) {
      showError(confirmError, "Please confirm your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      showError(confirmError, "Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    /*
      Front-end demo only.
      Connect your backend/API here to create the account,
      save the selected role, and handle duplicate email errors.
      Do not store raw passwords in browser storage.
    */

    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Creating Account...";

    showMessage(
      `Details validated for the ${selectedRole} role. Redirecting to sign in...`,
      "success"
    );

    setTimeout(() => {
      window.location.href = "login.html";
    }, 700);
  });

  // Reset fields and role when returning to this page.
  function resetSignupForm() {
    form.reset();
    selectedRole = "client";
    selectRole("client");

    [nameError, emailError, passwordError, confirmError].forEach(clearError);
    clearMessage();

    section.querySelectorAll(".fp-signup-password-toggle").forEach((button) => {
      const input = section.querySelector(`#${button.dataset.target}`);

      if (input) input.type = "password";

      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Show password");
      button.querySelector(".material-symbols-outlined").textContent =
        "visibility_off";
    });

    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Create Account";
  }

  window.addEventListener("pageshow", resetSignupForm);

  // GSAP reveal: image from left, form from right.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      section.querySelector(".fp-signup-visual"),
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
      section.querySelector(".fp-signup-form-panel"),
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
