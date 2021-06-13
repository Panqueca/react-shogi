import { useState } from "react";
import Match from "../@game_state/match";
import defaultLineup from "../defaultLineup";
import Board from "../components/Board";
import {
  transformGameStateToBoard,
  transformLineUpToSquares
} from "../utils/pieces/filter";

const React = require("react");

require("./demo.css");

const defaultPlayers = [
  { player_number: 1, name: "Player 1" },
  { player_number: 2, name: "Player 2" }
];

const Demo = ({ pieceComponents }) => {
  const [game, setGame] = useState({
    id: 1,
    game_state: {
      current_player_number: 1,
      squares: transformLineUpToSquares(defaultLineup),
      hands: [
        { player_number: 1, pieces: [] },
        { player_number: 2, pieces: [] }
      ]
    },
    players: defaultPlayers,
    winner: null
  });
  const [historyActions, setHistoryActions] = useState([]);

  function addHistoryAction(newAction, playerNumber) {
    if (newAction)
      setHistoryActions([
        ...historyActions,
        { ...newAction, playerSide: playerNumber === 2 ? "GOTE" : "SENTE" }
      ]);
  }

  function getLastAction() {
    const lastAction = historyActions[historyActions.length - 1] || {};
    const { data = {} } = lastAction;
    return { ...lastAction, ...data };
  }

  function handleMovePiece({ move }) {
    const tempMatch = new Match(game);
    const { current_player_number } = game.game_state;

    tempMatch.touchSquare(move, current_player_number);
    addHistoryAction(tempMatch.lastAction, current_player_number);

    if (tempMatch.promotion) {
      tempMatch.touchPromotionOption(true, current_player_number);
      addHistoryAction(tempMatch.lastAction, current_player_number);
    }

    setGame(tempMatch.asJson);
  }

  const GAME_STATE = transformGameStateToBoard(game.game_state);
  console.log({ GAME_STATE });

  return (
    <div className="demo">
      <Board
        pieces={GAME_STATE.pieces}
        hands={GAME_STATE.hands}
        historyActions={historyActions}
        onMovePiece={handleMovePiece}
        currentPlayer={game.current_player_number}
        pieceComponents={pieceComponents}
        handleMovePiece={handleMovePiece}
        notification={game.notification}
        lastAction={getLastAction()}
      />
    </div>
  );
};

export default Demo;
