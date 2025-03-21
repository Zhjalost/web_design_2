const { body } = document;
const themeToggleButton = document.querySelector("#theme_toggle");
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

if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

themeToggleButton.addEventListener("click", toggleTheme);
