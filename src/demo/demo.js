import { useState } from "react";
import Match from "../@game_state/match";
import decode from "../decode";
import defaultLineup from "../defaultLineup";
import Board from "../components/Board";

const React = require("react");

require("./demo.css");

const defaultPlayers = [
  { player_number: 1, name: "Player 1" },
  { player_number: 2, name: "Player 2" }
];

function getMissingSquares(currentSquares) {
  const all = [];

  ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach(col => {
    for (let i = 1; i <= 9; i++) {
      const squareId = `${col}${i}`;
      const { x, y } = decode.fromPieceDecl(`Pawn@${squareId}`);
      all.push({ id: squareId, x, y });
    }
  });

  return all.filter(
    square => [...currentSquares].map(({ id }) => id).indexOf(square.id) === -1
  );
}

function transformLineUpToSquares(lineUp) {
  const squares = [];

  lineUp.forEach(info => {
    const { x, y, piece, square } = decode.fromPieceDecl(info);
    const side = piece.substr(piece.length - 1);
    const player_number = side === "A" ? 1 : 2;
    const pieceType = piece.substr(0, piece.length - 1);

    squares.push({
      id: square,
      x,
      y,
      piece: {
        id: info,
        type: pieceType,
        player_number
      }
    });
  });

  return [...squares, ...getMissingSquares(squares)];
}

function transformGameStateToPieces(gameState) {
  if (gameState) {
    return gameState.squares.map(({ id, piece }) => {
      if (!piece)
        return {
          pieceAtLocation: `Empty@${id}`,
          piece: null,
          player_number: null
        };
      return {
        pieceAtLocation: `${piece.type}${
          piece.player_number === 1 ? "A" : "B"
        }@${id}`,
        piece,
        player_number: piece.player_number
      };
    });
  }

  return [];
}

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

  function addHistoryAction(newAction) {
    if (newAction) setHistoryActions([...historyActions, newAction]);
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

    addHistoryAction(tempMatch.lastAction);

    if (tempMatch.promotion) {
      tempMatch.touchPromotionOption(true, current_player_number);
      addHistoryAction(tempMatch.lastAction);
    }

    setGame(tempMatch.asJson);
  }

  console.log({ game, historyActions });

  return (
    <div className="demo">
      <Board
        pieces={transformGameStateToPieces(game.game_state)}
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
