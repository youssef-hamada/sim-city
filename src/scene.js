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

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

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
    start,
    stop,
    mouseUp,
    mouseDown,
    mouseMove,
  };
}
