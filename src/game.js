import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  const scene = createScene();
  const city = createCity(12);

  scene.initialize(city);
  window.scene = scene;
  window.addEventListener("mouseup", window.scene.mouseUp);
  window.addEventListener("mousedown", window.scene.mouseDown);
  window.addEventListener("mousemove", window.scene.mouseMove);

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();

  return game;
}
