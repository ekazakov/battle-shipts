import { Player } from "./player";
import { Observer } from "../utils/observer";
import { ShootResult } from "../utils/constnats";

const messages = {
  [ShootResult.MISS]: "You missed",
  [ShootResult.HIT]: "Ship is hit",
  [ShootResult.KILL]: "Ship is destroyed",
  [ShootResult.REPEAT]: "You already shoot this cell"
};

export class Game extends Observer {
  constructor() {
    super();
    this._players = {
      player1: new Player("Player 1", 1),
      player2: new Player("Player 2", 2)
    };
    this._currentPlayer = this._players.player1;
    this._waitingPlayer = this._players.player2;
  }

  changeCurrentPlayer() {
    console.log(`Pass turn to player: ${this.getWaitingPlayer().getId()}`);

    [this._currentPlayer, this._waitingPlayer] = [
      this._waitingPlayer,
      this._currentPlayer
    ];
  }

  makeShot(row, column) {
    const current = this.getCurrentPlayer();
    const waiting = this.getWaitingPlayer();
    const position = { x: column, y: row };

    const result = waiting.processShoot(position);
    const message = messages[result];
    console.log(`Player #${current.getId()} shot result: ${message}`);

    if (waiting.isAllShipsDestroyed()) {
      console.log(`Game Over. Player #${current.getId()} wins!`);
    }

    if (result === ShootResult.MISS) {
      this.changeCurrentPlayer();
    }
    this._notify("update", this.getGameState());
  }

  getCurrentPlayer() {
    return this._currentPlayer;
  }

  getWaitingPlayer() {
    return this._waitingPlayer;
  }

  getGameState() {
    const current = this.getCurrentPlayer();
    const waiting = this.getWaitingPlayer();
    const winnerId = waiting.isAllShipsDestroyed() ? current.getId() : null;

    return {
      winnerId,
      currentPlayer: current.getInfo(),
      waitingPlayer: waiting.getInfo(),
      ownBoard: current.getBoard().getSnapshoot(),
      enemyBoard: waiting.getBoard().getPublicSnapshoot()
      //   player1: {
      //     ownBoard: this._players.player1.getBoard().getSnapshoot(),
      //     enemyBoard: this._players.player2.getBoard().getPublicSnapshoot()
      //   },
      //   player2: {
      //     ownBoard: this._players.player2.getBoard().getSnapshoot(),
      //     enemyBoard: this._players.player1.getBoard().getPublicSnapshoot()
      //   }
    };
  }
}
