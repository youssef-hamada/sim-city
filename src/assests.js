import * as THREE from "https://unpkg.com/three@0.152.0/build/three.module.js";

const geo = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  grass: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { buildingId: "grass", height, x, y };
    mesh.position.set(x, -0.5, y); // grass always fixed
    return mesh;
  },

  residential: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, 0.5, y); // important
    mesh.userData = { buildingId: "residential", x, y };
    return mesh;
  },

  commercial: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, 0.5, y); // important
    mesh.userData = { buildingId: "commercial", x, y };
    return mesh;
  },

  industrial: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.y = height;
    mesh.position.set(x, 0.5, y); // important
    mesh.userData = { buildingId: "industrial", x, y };
    return mesh;
  },
  road: (x, y, height = 1) => {
    const mat = new THREE.MeshLambertMaterial({ color: 0x4444440 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.set(1, 0.1, 1);
    mesh.position.set(x, 0.05, y); // important
    mesh.userData = { buildingId: "road", x, y };
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
