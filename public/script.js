// Theme toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("mobile-sidebar");
  sidebar.classList.toggle("show");
}

// Auto-hide/show header on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll) {
    header.style.top = "-70px"; // Hide on scroll down
  } else {
    header.style.top = "0"; // Show on scroll up
  }
  lastScroll = currentScroll;
});

// Load saved theme and close sidebar on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  // Hide sidebar in every page on load
  const sidebar = document.getElementById("mobile-sidebar");
  if (sidebar) sidebar.classList.remove("show");
};
