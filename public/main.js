const { body } = document;
const themeToggleButton = document.querySelector("#theme_toggle");
const dropdownBtn = document.querySelector("#dropdown_btn");
const dropdownMenu = document.querySelector("#dropdown_links");
const links = Array.from(dropdownMenu.querySelectorAll(".dropdown_link"));
const darkModeClass = "dark_mode";
const themeKey = "theme";
const savedTheme = localStorage.getItem(themeKey);
const images = document.querySelectorAll(".gallery_img");
const galleryOverlay = document.querySelector("#gallery_overlay");
const overlayImg = document.querySelector("#overlay_img");
const closeOverlayBtn = document.querySelector("#close_overlay");
const nextImgBtn = document.querySelector("#next_img");
const prevImgBtn = document.querySelector("#prev_img");
const date = new Date();

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add(darkModeClass);
  } else {
    body.classList.remove(darkModeClass);
  }

  localStorage.setItem(themeKey, theme);
}

function toggleTheme() {
  body.classList.contains(darkModeClass) ? setTheme("light") : setTheme("dark");
}

function toggleDropdown() {
  dropdownBtn.classList.toggle("active");
  dropdownMenu.classList.toggle("show");
  dropdownMenu.setAttribute(
    "aria-expanded",
    dropdownMenu.classList.contains("show")
  );
}

/**
 * Open the image overlay when an image is clicked.
 */
function openOverlay() {
  const imageSrc = this.getAttribute("src");
  overlayImg.setAttribute("src", imageSrc);
  galleryOverlay.classList.add("show");
  body.classList.add("no_scroll");
}

function laodNextImage() {
  const src = overlayImg.src;
  let nextIndex = 0;
  let img = undefined;

  images.forEach((image, index) => {
    if (image.src === src) {
      nextIndex = index + 1;
      return;
    }
  });

  img = images[nextIndex];
  img ? (overlayImg.src = img.src) : (overlayImg.src = images[0].src);
}

function loadPrevImage() {
  const src = overlayImg.src;
  let nextIndex = 0;
  let img = undefined;

  images.forEach((image, index) => {
    if (image.src === src) {
      nextIndex = index - 1;
      return;
    }
  });

  img = images[nextIndex];
  img
    ? (overlayImg.src = img.src)
    : (overlayImg.src = images[images.length - 1].src);
}

/**
 * Function to close the gallery overlay.
 * This function is called when the close button is clicked or when the overlay is closed.
 */
function closeOverlay() {
  overlayImg.setAttribute("src", "");
  galleryOverlay.classList.remove("show");
  body.classList.remove("no_scroll");
}

// Always darkmdoe after 6pm
// Set initial theme based on saved preference or system preference
if (date.getHours() >= 18) {
  setTheme("dark");
} else if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

// Add event listeners

// Toggle theme on button click
themeToggleButton.addEventListener("click", toggleTheme);

// Toggle dropdown menu on button click and link click
dropdownBtn.addEventListener("click", toggleDropdown);
links.forEach((link) => link.addEventListener("click", toggleDropdown));

// Closer overlay when clicking the close button
closeOverlayBtn.addEventListener("click", closeOverlay);
images.forEach((image) => image.addEventListener("click", openOverlay));

// Event Listeners for loading next and prev images
nextImgBtn.addEventListener("click", laodNextImage);
prevImgBtn.addEventListener("click", loadPrevImage);

// CLose overlay when pressing Escape or clicking outside the overlay
window.addEventListener("click", (e) => {
  if (e.target === galleryOverlay) {
    closeOverlay();
  }
});

window.addEventListener("keydown", (e) => {
  // Check if the overlay is open before handling key events
  // This prevents the event from being handled when the overlay is closed
  if (galleryOverlay.classList.contains("show")) {
    switch (e.key) {
      case "Escape":
        closeOverlay();
        break;
      case "ArrowLeft":
        loadPrevImage();
        break;
      case "ArrowRight":
        laodNextImage();
        break;
    }
  }
});
