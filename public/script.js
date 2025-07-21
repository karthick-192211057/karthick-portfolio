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

// Scroll-based Header Visibility
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // scrolling down
    header.style.top = "-80px"; // hide
  } else {
    // scrolling up
    header.style.top = "0"; // show
  }

  lastScrollTop = scrollTop;
});
