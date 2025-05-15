import * as THREE from "https://unpkg.com/three@0.152.0/build/three.module.js";

export function createCamera(gameWindow) {
  const LEFT_MOUSE_BUTTON = 0;
  const RIGHT_MOUSE_BUTTON = 2;
  const MIDDLE_MOUSE_BUTTON = 1;

  const MIN_CAM_RADIUS = 2;
  const MAX_CAM_RADIUS = 20;

  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.clientWidth / gameWindow.clientHeight,
    0.1,
    1000
  );

  let cameraRadius = 5;
  let CameraAzimuth = 0;
  let cameraElevation = 0;
  let isMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;
  updateCameraPosition();

  function mouseUp(e) {
    console.log("Mouse up");
    if (e.button == LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }
    if (e.button == RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
    if (e.button == MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }
  }

  function mouseDown(e) {
    console.log("Mouse down");

    if (e.button == LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }
    if (e.button == RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
    if (e.button == MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }
  }

  function mouseMove(e) {
    console.log("Mouse move");

    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;

    if (isLeftMouseDown) {
      CameraAzimuth += -(deltaY * 0.5);
      cameraElevation += -(deltaY * 0.5);
      cameraElevation = Math.max(-90, Math.min(90, cameraElevation));

      updateCameraPosition();
    }

    if (isRightMouseDown) {
      cameraRadius += deltaY * 0.01;
      cameraRadius = Math.min(
        MAX_CAM_RADIUS,
        Math.max(MIN_CAM_RADIUS, cameraRadius)
      );
      updateCameraPosition();
    }

    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        (CameraAzimuth * Math.PI) / 180
      );
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        (CameraAzimuth * Math.PI) / 180
      );
      const up = new THREE.Vector3(0, 1, 0).applyAxisAngle(
        Y_AXIS,
        (CameraAzimuth * Math.PI) / 180
      );
      const moveX = right.multiplyScalar(deltaX * 0.01);
      const moveY = up.multiplyScalar(deltaY * 0.01);
      camera.position.add(moveX);
      camera.position.add(moveY);
    }

    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  }

  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.cos(THREE.MathUtils.degToRad(CameraAzimuth)) *
      Math.cos(THREE.MathUtils.degToRad(cameraElevation));
    camera.position.y =
      cameraRadius * Math.sin(THREE.MathUtils.degToRad(cameraElevation));
    camera.position.z =
      cameraRadius *
      Math.sin(THREE.MathUtils.degToRad(CameraAzimuth)) *
      Math.cos(THREE.MathUtils.degToRad(cameraElevation));
    camera.position.add(new THREE.Vector3(0, 0, 0));
    camera.lookAt(0, 0, 0);
    camera.updateMatrix();
  }

  return {
    mouseDown,
    mouseUp,
    mouseMove,
    camera,
  };
}
