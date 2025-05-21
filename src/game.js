import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  const scene = createScene();
  const city = createCity(12);

  scene.initialize(city);
  scene.onObjectSelected = (object) => {
    if (object.userData.id === "grass") {
      const x = Math.floor(object.position.x);
      const y = Math.floor(object.position.z);
      const tile = city.data[x][y];

      if (tile.buildingId === null) {
        tile.buildingId = "building-1";
        tile.height = 1;
      } else if (tile.buildingId === "building-1") {
        tile.buildingId = "building-2";
        tile.height += 1;
      } else if (tile.buildingId === "building-2") {
        tile.buildingId = "building-3";
        tile.height += 1;
      } else if (tile.buildingId === "building-3") {
        tile.height += 1;
      }
    }
  };
  window.scene = scene;
  window.addEventListener("mouseup", window.scene.mouseUp.bind(scene));
  window.addEventListener("mousedown", window.scene.mouseDown.bind(scene));
  window.addEventListener("mousemove", window.scene.mouseMove.bind(scene));

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
