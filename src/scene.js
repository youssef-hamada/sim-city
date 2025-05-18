import * as THREE from "https://unpkg.com/three@0.152.0/build/three.module.js";
import { createCamera } from "./camera.js";

export function createScene() {
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight);
  gameWindow.appendChild(renderer.domElement);

  let meshes = [];
  let building = [];
  function initialize(city) {
    scene.clear();
    meshes = [];
    building = [];
    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        //grass geometry
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshLambertMaterial({
          color: 0x00aa00,
          //   wireframe: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, -0.5, y);
        scene.add(mesh);
        column.push(mesh);
      }
      meshes.push(column);
      building.push([...Array(city.size).fill(null)]);
    }

    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y];

        if (tile.building && tile.building.startsWith("building")) {
          let height = tile.building.slice(-1);
          height = parseInt(height);
          height = isNaN(height) || height < 1 ? 1 : height;

          const buildingGeo = new THREE.BoxGeometry(1, height, 1);
          const buildingMat = new THREE.MeshLambertMaterial({
            color: 0x555555,
          });

          const buildingMesh = new THREE.Mesh(buildingGeo, buildingMat);
          buildingMesh.position.set(x, height / 2, y);

          if (building[x][y]) {
            scene.remove(building[x][y]);
          }
          scene.add(buildingMesh);
          building[x][y] = buildingMesh;
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
  }

  function mouseMove(e) {
    camera.mouseMove(e);
  }

  return {
    update,
    initialize,
    start,
    stop,
    mouseUp,
    mouseDown,
    mouseMove,
  };
}
