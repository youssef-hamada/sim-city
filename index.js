import { createGame } from "./src/game.js";

let selectedControl = document.getElementById("button-bulldoze");
window.onload = () => {
  window.game = createGame();
};

window.setActiveTool = (e, id) => {
  if (selectedControl) {
    selectedControl.classList.remove("selected");
  }
  selectedControl = e.target;
  selectedControl.classList.add("selected");
  window.game.setActiveToolId(id);
};
