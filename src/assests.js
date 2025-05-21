import * as THREE from "https://unpkg.com/three@0.152.0/build/three.module.js";

const geo = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  grass: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { id: "grass", height, x, y };
    mesh.position.set(x, -0.5, y); // grass always fixed
    return mesh;
  },

  "building-1": (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, height / 2, y); // important
    mesh.userData = { id: "building-1", height, x, y };
    return mesh;
  },

  "building-2": (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, height / 2, y); // important
    mesh.userData = { id: "building-2", height, x, y };
    return mesh;
  },

  "building-3": (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x999999 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, height / 2, y); // important
    mesh.userData = { id: "building-3", height, x, y };
    return mesh;
  },
};

export function createAssetsInstance(assetId, x, y, height) {
  if (assetId in assets) {
    return assets[assetId](x, y, height);
  } else {
    console.error(`Asset ${assetId} not found`);
    return null;
  }
}
