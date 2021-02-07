import { ShootResult } from "../utils/constnats";
import { Board } from "./board";

export class Player {
  constructor(name, id) {
    this._name = name;
    this._id = id;
    this._ownBoard = new Board();
  }

  getInfo() {
    return { name: this._name, id: this._id };
  }

  getId() {
    return this._id;
  }

  isAllShipsDestroyed() {
    return this._ownBoard.isAllShipsDestroyed();
  }

  getBoard() {
    return this._ownBoard;
  }

  processShoot(positon) {
    const board = this.getBoard();
    if (board.isHit(positon)) {
      return ShootResult.REPEAT;
    }

    board.processShoot(positon);

    if (board.isEmptyCell(positon)) {
      return ShootResult.MISS;
    }

    if (board.isShipDestroyed(positon)) {
      return ShootResult.KILL;
    }

    return ShootResult.HIT;
  }
}
