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
  function initialize(city) {
    scene.clear();
    meshes = [];
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

        //building geometry
        const tile = city.data[x][y];
        console.log(tile);
        if (tile.building == "building") {
          const bulidingGeo = new THREE.BoxGeometry(1, 1, 1);
          const bulidingMat = new THREE.MeshLambertMaterial({
            color: 0x777777,
            //   wireframe: true,
          });
          const bulidingMesh = new THREE.Mesh(bulidingGeo, bulidingMat);
          bulidingMesh.position.set(x, 0, y);
          scene.add(bulidingMesh);
          column.push(bulidingMesh);
        }
      }
      meshes.push(column);
    }

    setupLights();
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
    initialize,
    start,
    stop,
    mouseUp,
    mouseDown,
    mouseMove,
  };
}
