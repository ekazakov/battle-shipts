import { BOARD_SIZE, Direction, ShipType } from "../utils/constnats";
import { Cell } from "./cell";
import { Ship } from "./ship";

const layout = [
  {
    direction: Direction.HORIZONTAL,
    x: 6,
    y: 0
  },
  {
    direction: Direction.VERTICAL,
    x: 3,
    y: 0
  },
  {
    direction: Direction.VERTICAL,
    x: 1,
    y: 4
  },
  {
    direction: Direction.HORIZONTAL,
    x: 0,
    y: 0
  },
  {
    direction: Direction.VERTICAL,
    x: 9,
    y: 2
  },
  {
    direction: Direction.VERTICAL,
    x: 8,
    y: 8
  },
  {
    direction: Direction.VERTICAL,
    x: 6,
    y: 5
  },
  {
    direction: Direction.VERTICAL,
    x: 3,
    y: 8
  },
  {
    direction: Direction.VERTICAL,
    x: 5,
    y: 8
  },
  {
    direction: Direction.VERTICAL,
    x: 0,
    y: 9
  }
];

function createCells(size) {
  const cells = new Array(size);

  for (let i = 0; i < size; i++) {
    cells[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      cells[i][j] = new Cell({ x: j, y: i });
    }
  }

  return cells;
}

function createShips() {
  return [
    new Ship({ size: ShipType.BATTLE_SHIP }),
    new Ship({ size: ShipType.DESTROYER }),
    new Ship({ size: ShipType.DESTROYER }),
    new Ship({ size: ShipType.FRIGATE }),
    new Ship({ size: ShipType.FRIGATE }),
    new Ship({ size: ShipType.FRIGATE }),
    new Ship({ size: ShipType.BOAT }),
    new Ship({ size: ShipType.BOAT }),
    new Ship({ size: ShipType.BOAT }),
    new Ship({ size: ShipType.BOAT })
  ];
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(size) {
  return {
    x: getRandomInteger(0, size),
    y: getRandomInteger(0, size)
  };
}

function getRandomDirection() {
  if (getRandomInteger(0, 1) === 0) {
    return Direction.VERTICAL;
  }

  return Direction.HORIZONTAL;
}

function testPostion(position, direction, ship, cells) {}

export class Board {
  constructor({ size } = { size: BOARD_SIZE }) {
    this._size = size;
    this._cells = createCells(size);
    this._ships = createShips();
    this._placeShips();
  }

  _placeShips() {
    this._ships.forEach((ship, index) => {
      const { x, y, direction } = layout[index];
      const position = { x, y };
      ship.setPosition(position, direction);
      this._markOccupaedCells(position, direction, ship);
    });
  }

  _markOccupaedCells(position, direction, ship) {
    let x = position.x;
    let y = position.y;
    for (let i = 0; i < ship.getSize(); i++) {
      this._cells[y][x].addShip(ship);
      if (direction === Direction.HORIZONTAL) {
        x++;
      } else {
        y++;
      }
    }
  }

  isAllShipsDestroyed() {
    return this._ships.every((ship) => ship.isDestroyed());
  }

  getSnapshoot() {
    const snapshoot = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      let row = new Array(this._size);
      for (let j = 0; j < this._size; j++) {
        const cell = this._cells[i][j];
        if (cell.getShip() && cell.isHit()) {
          row[j] = "x";
        } else if (cell.getShip()) {
          row[j] = "+";
        } else if (cell.isHit()) {
          row[j] = "o";
        } else {
          row[j] = "";
        }
      }
      snapshoot[i] = row;
    }

    return snapshoot;
  }

  getPublicSnapshoot() {
    const snapshoot = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      let row = new Array(this._size);
      for (let j = 0; j < this._size; j++) {
        const cell = this._cells[i][j];
        if (cell.getShip() && cell.isHit()) {
          row[j] = "x";
        } else if (cell.getShip()) {
          row[j] = "";
        } else if (cell.isHit()) {
          row[j] = "o";
        } else {
          row[j] = "";
        }
      }
      snapshoot[i] = row;
    }

    return snapshoot;
  }

  _getCell(positon) {
    return this._cells[positon.y][positon.x];
  }

  processShoot(positon) {
    this._getCell(positon).processShoot();
  }

  isHit(positon) {
    return this._getCell(positon).isHit();
  }

  isEmptyCell(positon) {
    return this._getCell(positon).isEmpty();
  }

  isShipDestroyed(positon) {
    const cell = this._getCell(positon);
    const ship = cell.getShip();

    // if (cell.isHitBefore(positon)) {
    //   return false;
    // }

    return ship != null && ship.isDestroyed();
  }
}
