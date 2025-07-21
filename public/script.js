// Dark Mode Toggle Script
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Apply theme on load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
