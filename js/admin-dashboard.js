
/* ==========================================
   STACKLY ADMIN DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("#adSidebar");
  const overlay = document.querySelector("#adSidebarOverlay");
  const menuToggle = document.querySelector("#adMenuToggle");
  const content = document.querySelector("#adContent");
  const pageTitle = document.querySelector("#adPageTitle");
  const pageSubtitle = document.querySelector("#adPageSubtitle");

  const validPages = [
    "overview",
    "projects",
    "portfolio",
    "clients",
    "messages",
    "reports",
    "profile"
  ];

  const pageInfo = {
    overview: {
      title: "Admin Overview",
      subtitle: "Manage your creative workspace."
    },
    projects: {
      title: "Projects Management",
      subtitle: "Review project progress and creative delivery."
    },
    portfolio: {
      title: "Portfolio Management",
      subtitle: "Organize portfolio categories and content."
    },
    clients: {
      title: "Client Accounts",
      subtitle: "Review client accounts and project relationships."
    },
    messages: {
      title: "Messages & Requests",
      subtitle: "Review communication and project enquiries."
    },
    reports: {
      title: "Reports & Insights",
      subtitle: "Explore workspace performance and sample metrics."
    },
    profile: {
      title: "Administrator Profile",
      subtitle: "Review your admin account identity."
    }
  };

  // Read the email saved by the login page.
  function getAdminEmail() {
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

  // Display the email and its first letter dynamically.
  function updateAdminIdentity() {
    const email = getAdminEmail();
    const initial = email ? email.charAt(0).toUpperCase() : "A";

    document.querySelectorAll("[data-admin-initial]").forEach((element) => {
      element.textContent = initial;
      element.setAttribute(
        "aria-label",
        email ? `Administrator account: ${email}` : "Admin account"
      );
      element.title = email || "Admin account";
    });

    document.querySelectorAll("[data-admin-email]").forEach((element) => {
      element.textContent = email || "Admin Workspace";
      element.title = email || "";
    });

    document.querySelectorAll("[data-admin-email-full]").forEach((element) => {
      element.textContent = email || "Sign in to view your account";
      element.title = email || "";
    });
  }

  // Mobile sidebar.
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("show");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close admin menu");
    menuToggle.querySelector(".material-symbols-outlined").textContent = "close";

    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open admin menu");
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

  // Render a page inside this same HTML document.
  function renderAdminPage() {
    const requestedPage = window.location.hash.slice(1);
    const page = validPages.includes(requestedPage)
      ? requestedPage
      : "overview";

    document.querySelectorAll("[data-admin-page]").forEach((section) => {
      const active = section.dataset.adminPage === page;

      section.classList.toggle("active", active);
      section.setAttribute("aria-hidden", String(!active));
    });

    document.querySelectorAll("[data-admin-view]").forEach((link) => {
      const active = link.dataset.adminView === page;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    pageTitle.textContent = pageInfo[page].title;
    pageSubtitle.textContent = pageInfo[page].subtitle;

    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (content) content.scrollTop = 0;

    // Reveal the newly selected page when GSAP is available.
    const activeSection = document.querySelector(
      `[data-admin-page="${page}"]`
    );

    if (activeSection && window.gsap) {
      gsap.killTweensOf(activeSection.children);

      gsap.fromTo(
        activeSection.children,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.045,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    }
  }

  // Handle navigation through #overview, #projects, etc.
  document.querySelectorAll("[data-admin-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = link.dataset.adminView;

      if (!validPages.includes(page)) return;

      event.preventDefault();

      if (window.location.hash === `#${page}`) {
        renderAdminPage();
      } else {
        window.location.hash = page;
      }
    });
  });

  window.addEventListener("hashchange", renderAdminPage);

  // Unavailable pages redirect to 404.
  document.querySelector("#adSearchButton").addEventListener("click", () => {
    window.location.href = "404.html";
  });

  document.querySelector("#adNotificationsButton").addEventListener("click", () => {
    window.location.href = "404.html";
  });

  // Avatar opens the available admin profile view.
  document.querySelector("#adProfileButton").addEventListener("click", () => {
    window.location.hash = "profile";
  });

  // Current year.
  document.querySelector("#adCurrentYear").textContent =
    new Date().getFullYear();

  // Initial page.
  if (!validPages.includes(window.location.hash.slice(1))) {
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#overview`
    );
  }

  updateAdminIdentity();
  renderAdminPage();
});
