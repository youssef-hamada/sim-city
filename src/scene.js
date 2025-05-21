import * as THREE from "https://unpkg.com/three@0.152.0/build/three.module.js";
import { createCamera } from "./camera.js";
import { createAssetsInstance } from "./assests.js";

export function createScene() {
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight);
  gameWindow.appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject = null;

  let terrian = [];
  let meshes = [];
  let building = [];

  let onObjectSelected = null;

  function initialize(city) {
    scene.clear();
    meshes = [];
    building = [];
    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        //grass geometry
        const terrianId = city.data[x][y].terrianId;
        const mesh = createAssetsInstance(terrianId, x, y);
        if (mesh) {
          scene.add(mesh);
          column.push(mesh);
        }
      }
      meshes.push(column);
      building.push([...Array(city.size).fill(null)]);
    }

    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const oldMesh = building[x][y];
        const newData = city.data[x][y];
        const newId = newData.buildingId;
        const newHeight = newData.height || 1;

        const oldId = oldMesh?.userData?.id;
        const oldHeight = oldMesh?.userData?.height;

        const needsUpdate = newId !== oldId || newHeight !== oldHeight;

        if (oldMesh && needsUpdate) {
          scene.remove(oldMesh);
          building[x][y] = null;
        }

        if (needsUpdate && newId) {
          const newMesh = createAssetsInstance(newId, x, y, newHeight);
          scene.add(newMesh);
          building[x][y] = newMesh;
        }
      }
    }
  }

  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0x404040, 2), // soft white light
      new THREE.DirectionalLight(0xffffff, 1), // white directional light
      new THREE.DirectionalLight(0xffffff, 1), // white directional light
      new THREE.DirectionalLight(0xffffff, 1), // white directional light
    ];

    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    scene.add(...lights);
  }

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function mouseUp(e) {
    camera.mouseUp(e);
  }

  function mouseDown(e) {
    camera.mouseDown(e);

    mouse.x = (e.clientX / gameWindow.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / gameWindow.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera.camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      if (selectedObject) selectedObject.material.emissive.setHex(0x000000);

      selectedObject = intersects[0].object;
      selectedObject.material.emissive.setHex(0x555555);

      console.log(selectedObject.userData);

      if (this.onObjectSelected) {
        this.onObjectSelected(selectedObject.userData);
      }
    }
  }

  function mouseMove(e) {
    camera.mouseMove(e);
  }

  return {
    onObjectSelected,
    update,
    initialize,
    start,
    stop,
    mouseUp,
    mouseDown,
    mouseMove,
  };
}
