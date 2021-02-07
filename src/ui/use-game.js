import { useState, useMemo, useEffect } from "react";

export function useGame(game) {
  const [state, setState] = useState(game.getGameState());

  useEffect(() => {
    const changeHandler = (event, gameState) => {
      setState(gameState);
    };
    game.addObserver(changeHandler);

    return () => game.removeObserver(changeHandler);
  }, [game]);

  const maskShot = useMemo(
    () => (row, column) => {
      console.log("column", column, "row:", row);
      game.makeShot.call(game, row, column);
    },
    [game]
  );

  return [state, maskShot];
}
