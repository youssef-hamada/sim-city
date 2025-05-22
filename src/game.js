import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  let activeToolId = "";

  const scene = createScene();
  const city = createCity(12);

  scene.initialize(city);
  scene.onObjectSelected = (object) => {
    const x = Math.floor(object.x);
    const y = Math.floor(object.y);
    const tile = city.data[x][y];
    console.log(city);

    if (activeToolId === "bulldoze") {
      tile.buildingId = null;
      scene.update(city);
    } else if (!tile.buildingId) {
      tile.buildingId = activeToolId;
      scene.update(city);
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
    setActiveToolId(id) {
      activeToolId = id;
      console.log("activeToolId", activeToolId);
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();

  return game;
}
