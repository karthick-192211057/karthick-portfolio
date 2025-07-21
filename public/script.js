// Dark Mode Toggle
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Scroll header hide/show
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll down
      header.style.top = "-100px";
    } else {
      // Scroll up
      header.style.top = "0";
    }

    // Add shadow if scrolled
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });
});
