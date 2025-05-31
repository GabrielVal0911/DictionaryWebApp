import { themeToggle } from "./themeToggle.js";

const switchTheme = document.getElementById("switchTheme");

document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const selectButton = customSelect.querySelector(".select-button");
    const dropdown = customSelect.querySelector(".select-dropdown");

    const options = dropdown.querySelectorAll("li");
    const selectedValue = selectButton.querySelector(".selected-value");

    const toggleDropdown = (expand = null) => {
      const isOpen =
        expand !== null ? expand : dropdown.classList.contains("hidden");
      dropdown.classList.toggle("hidden", !isOpen);
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
      console.log(option.textContent);
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
  themeToggle(switchTheme);
});
