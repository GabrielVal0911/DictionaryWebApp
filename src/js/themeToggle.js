export function themeToggle(input) {
  // refactor this
  if (input.checked) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document
      .querySelector(".select-dropdown")
      .classList.add("box-shadow-purple");
    document.querySelector(".fa-moon").style.color = "hsl(274deg, 82%, 60%)";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document
      .querySelector(".select-dropdown")
      .classList.remove("box-shadow-purple");
    document.querySelector(".fa-moon").style.color = "gray";
  }
}
