import { themeToggle } from "./themeToggle.js";

const switchTheme = document.getElementById("switchTheme");
const body = document.body;
const selectMenu = document.querySelector(".select-dropdown");
const moonIcon = document.querySelector(".fa-moon");
const btnGetStarted = document.getElementById("button-getStarted");

document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const selectButton = customSelect.querySelector(".select-button");

    const options = selectMenu.querySelectorAll("li");
    const selectedValue = selectButton.querySelector(".selected-value");

    const toggleDropdown = (expand = null) => {
      const isOpen =
        expand !== null ? expand : selectMenu.classList.contains("hidden");
      selectMenu.classList.toggle("hidden", !isOpen);
      selectButton.setAttribute("aria-expanded", isOpen);
    };

    selectButton.addEventListener("click", () => {
      toggleDropdown();
    });

    const handleOptionSelect = (option) => {
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      selectedValue.textContent = option.textContent.trim(); // Update selected value
      if (option.textContent === "Serif") {
        document.body.style.fontFamily = "DMSans-Regular";
      } else {
        document.body.style.fontFamily = option.textContent;
      }
    };
    options.forEach((option) => {
      option.addEventListener("click", () => {
        handleOptionSelect(option);
        toggleDropdown(false);
      });
    });
  });
});

// toggle theme
document.getElementById("toggle-switch").addEventListener("click", function () {
  themeToggle(switchTheme, body, selectMenu, moonIcon);
});

if (btnGetStarted) {
  btnGetStarted.addEventListener("click", function () {
    window.location.href = "main-page.html";
  });
}
