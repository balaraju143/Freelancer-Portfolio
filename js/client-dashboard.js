
/* ==========================================
   STACKLY CLIENT DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("#cdSidebar");
  const overlay = document.querySelector("#cdSidebarOverlay");
  const menuToggle = document.querySelector("#cdMenuToggle");
  const content = document.querySelector("#cdContent");

  const pageTitle = document.querySelector("#cdPageTitle");
  const pageSubtitle = document.querySelector("#cdPageSubtitle");

  const searchButton = document.querySelector("#cdSearchButton");
  const notificationsButton = document.querySelector("#cdNotificationsButton");
  const profileButton = document.querySelector("#cdProfileButton");

  const validViews = [
    "overview",
    "projects",
    "portfolio",
    "messages",
    "profile"
  ];

  const pageInfo = {
    overview: {
      title: "Overview",
      subtitle: "Your creative workspace at a glance."
    },
    projects: {
      title: "My Projects",
      subtitle: "Manage your creative work and project progress."
    },
    portfolio: {
      title: "Creative Portfolio",
      subtitle: "Explore digital design and creative inspiration."
    },
    messages: {
      title: "Messages",
      subtitle: "Stay connected with your creative workspace."
    },
    profile: {
      title: "My Profile",
      subtitle: "Your account information and workspace details."
    }
  };

  // Email is saved during login, then displayed in the dashboard.
  function getEmail() {
    try {
      return (
        sessionStorage.getItem("fpLoggedInEmail") ||
        localStorage.getItem("fpLoggedInEmail") ||
        ""
      ).trim();
    } catch (error) {
      return "";
    }
  }

  function updateUserDetails() {
    const email = getEmail();

    // Use the first character of the email.
    const initial = email ? email.charAt(0).toUpperCase() : "U";

    document.querySelectorAll("[data-user-initial]").forEach((element) => {
      element.textContent = initial;
      element.setAttribute(
        "aria-label",
        email ? `Account for ${email}` : "User account"
      );
    });

    document.querySelectorAll("[data-user-email]").forEach((element) => {
      element.textContent = email || "Client Workspace";
      element.title = email || "";
    });

    document.querySelectorAll("[data-user-email-full]").forEach((element) => {
      element.textContent = email || "Sign in to view your account";
      element.title = email || "";
    });
  }

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close dashboard menu");
    menuToggle.querySelector(".material-symbols-outlined").textContent = "close";
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open dashboard menu");
    menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar();
  });

  // Change the visible dashboard view using the URL hash.
  function renderView() {
    const requestedView = window.location.hash.replace("#", "");
    const view = validViews.includes(requestedView)
      ? requestedView
      : "overview";

    document.querySelectorAll(".cd-view").forEach((element) => {
      const isActive = element.dataset.page === view;

      element.classList.toggle("active", isActive);
      element.setAttribute("aria-hidden", String(!isActive));
    });

    document.querySelectorAll(".cd-nav-link").forEach((link) => {
      const isActive = link.dataset.view === view;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    pageTitle.textContent = pageInfo[view].title;
    pageSubtitle.textContent = pageInfo[view].subtitle;

    closeSidebar();

    // Always show the beginning of the selected dashboard view.
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (content) {
      content.scrollTop = 0;
    }
  }

  // Sidebar links use hash navigation, not separate HTML pages.
  document.querySelectorAll("[data-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const view = link.dataset.view;

      if (!validViews.includes(view)) return;

      event.preventDefault();

      if (window.location.hash === `#${view}`) {
        renderView();
      } else {
        window.location.hash = view;
      }
    });
  });

  window.addEventListener("hashchange", renderView);

  // Search, notifications, and logout are unavailable destinations.
  searchButton.addEventListener("click", () => {
    window.location.href = "404.html";
  });

  notificationsButton.addEventListener("click", () => {
    window.location.href = "404.html";
  });

  // The avatar opens the available profile view.
  profileButton.addEventListener("click", () => {
    window.location.hash = "profile";
  });

  // Footer year.
  document.querySelector("#cdCurrentYear").textContent =
    new Date().getFullYear();

  // Initialize the dashboard.
  updateUserDetails();

  if (!validViews.includes(window.location.hash.slice(1))) {
    history.replaceState(null, "", `${location.pathname}${location.search}#overview`);
  }

  renderView();

  // Optional GSAP reveal for visible dashboard content.
  if (window.gsap) {
    const activeView = document.querySelector(".cd-view.active");

    if (activeView) {
      gsap.fromTo(
        activeView.children,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    }
  }
});
