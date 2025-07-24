// Theme toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Header scroll hide/show
  let lastScroll = 0;
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      let currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.top = "-80px";
      } else {
        header.style.top = "0";
      }
      lastScroll = currentScroll;
    });
  }

  // Sidebar toggle
  const menuBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("mobile-sidebar");
  const closeBtn = document.getElementById("sidebar-close");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  }

  // Close sidebar on navigation
  document.querySelectorAll("#mobile-sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  });
});
