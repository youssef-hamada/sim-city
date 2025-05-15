import { createScene } from "./src/scene.js";

window.onload = () => {
  window.scene = createScene();
  window.addEventListener("mouseup", window.scene.mouseUp);
  window.addEventListener("mousedown", window.scene.mouseDown);
  window.addEventListener("mousemove", window.scene.mouseMove);
  window.scene.start();
};
