import "./styles.css";
import { Board } from "./ui/board";
import { useGame } from "./ui/use-game";
import styled from "@emotion/styled";

const Layout = styled.div`
  /* display: grid; */
  grid-template-columns: repeat(2, minmax(330px, 500px));
  justify-content: center;
  justify-items: center;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  grid-column: span 2;
`;

export default function App({ game }) {
  const [gameState, makeShot] = useGame(game);
  const { ownBoard, enemyBoard, currentPlayer, waitingPlayer } = gameState;

  return (
    <Layout>
      <Header>Turn of the player: {currentPlayer.name}</Header>
      <div>
        {/* <h3>Player 1</h3> */}
        <div>
          <div>You</div>
          <Board data={ownBoard} onClick={() => {}} />
          <div>Other player({waitingPlayer.name})</div>
          <Board data={enemyBoard} onClick={makeShot} />
        </div>
      </div>
      {/* <div>
        <h3>Player 2</h3>
        <div>
          <div>You</div>
          <Board data={gameState.player2.ownBoard} onClick={makeShot} />
          <div>Other player</div>
          <Board data={gameState.player2.enemyBoard} onClick={makeShot} />
        </div>
      </div> */}
    </Layout>
  );
}
