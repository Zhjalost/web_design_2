const { body } = document;
const themeToggleButton = document.querySelector("#theme_toggle");
const dropdownButton = document.querySelector("#dropdown_btn");
const dropdownMenu = document.querySelector("#dropdown_links");
const links = Array.from(dropdownMenu.querySelectorAll(".dropdown_link"));
const darkModeClass = "dark_mode";
const themeKey = "theme";
const savedTheme = localStorage.getItem(themeKey);

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add(darkModeClass);
  } else {
    body.classList.remove(darkModeClass);
  }

  localStorage.setItem(themeKey, theme);
}

function toggleTheme() {
  console.log("button clicked");
  body.classList.contains(darkModeClass) ? setTheme("light") : setTheme("dark");
}

function toggleDropdown() {
  dropdownButton.classList.toggle("active");
  dropdownMenu.classList.toggle("show");
  dropdownMenu.setAttribute(
    "aria-expanded",
    dropdownMenu.classList.contains("show")
  );
}

if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

themeToggleButton.addEventListener("click", toggleTheme);
dropdownButton.addEventListener("click", toggleDropdown);
links.forEach((link) => link.addEventListener("click", toggleDropdown))