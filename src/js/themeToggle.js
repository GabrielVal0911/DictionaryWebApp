export function themeToggle(input, body, selectMenu, moonIcon) {
  if (input.checked) {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    selectMenu.classList.add("box-shadow-purple");
    moonIcon.style.color = "hsl(274deg, 82%, 60%)";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    selectMenu.classList.remove("box-shadow-purple");
    moonIcon.style.color = "gray";
  }
}
