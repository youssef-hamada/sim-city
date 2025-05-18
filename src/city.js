export function createCity(size) {
  const data = [];

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          building: null,
          update() {
            const x = Math.random();
            if (x < 0.01) {
              if (this.building == null) {
                this.building = "building-1";
              } else if (this.building == "building-1") {
                this.building = "building-2";
              } else if (this.building == "building-2") {
                this.building = "building-3";
              }
            }
          },
        };

        if (Math.random() > 0.7) {
          tile.building = "building";
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
