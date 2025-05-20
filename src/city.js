export function createCity(size) {
  const data = [];

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = createTile(x, y);

        if (Math.random() > 0.7) {
          tile.buildingId = "building-1";
          tile.height = 1;
        }

        column.push(tile);
      }
      data.push(column);
    }
  }

  initialize();

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return {
    update,
    size,
    data,
  };
}

function createTile(x, y) {
  return {
    x,
    y,
    terrianId: "grass",
    buildingId: null,
    height: 1,
    update() {
      const rand = Math.random();

      if (rand < 0.01) {
        if (this.buildingId === null) {
          this.buildingId = "building-1";
          this.height = 1;
        } else if (this.buildingId === "building-1") {
          this.buildingId = "building-2";
          this.height += 1;
        } else if (this.buildingId === "building-2") {
          this.buildingId = "building-3";
          this.height += 1;
        } else if (this.buildingId === "building-3") {
          this.height += 1;
        }
      }
    },
  };
}
