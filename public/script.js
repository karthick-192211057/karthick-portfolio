// 🌗 Toggle theme
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// 📱 Toggle sidebar menu (mobile only)
function toggleSidebar() {
  const sidebar = document.getElementById("mobile-sidebar");
  sidebar.classList.toggle("show");
}

// Optional: For older layout
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// 🌍 Apply theme and header behavior on load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // 🔽 Auto-hide header on scroll down
  let lastScroll = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.top = "-80px";
    } else {
      header.style.top = "0";
    }

    if (currentScroll > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
});
