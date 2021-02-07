import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Game } from "./game/game";

const game = new Game();
window.g = game;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App game={game} />
  </StrictMode>,
  rootElement
);
