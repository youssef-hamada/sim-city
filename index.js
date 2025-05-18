import { createScene } from "./src/scene.js";
import { createCity } from "./src/city.js";

window.onload = () => {
  const scene = createScene();
  const city = createCity(8);

  scene.initialize(city);
  window.scene = scene;
  window.addEventListener("mouseup", window.scene.mouseUp);
  window.addEventListener("mousedown", window.scene.mouseDown);
  window.addEventListener("mousemove", window.scene.mouseMove);
  window.scene.start();
};
