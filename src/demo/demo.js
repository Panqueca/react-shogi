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
      if (!piece) return `Empty@${id}`;
      return `${piece.type}${piece.player_number === 1 ? "A" : "B"}@${id}`;
    });
  }

  return defaultLineup;
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

  function handleMovePiece({ move }) {
    const tempMatch = new Match(game);
    const { current_player_number } = game.game_state;
    console.log({ current_player_number });
    tempMatch.touchSquare(move, current_player_number);
    console.log({ match: tempMatch.asJson });
    if (tempMatch.promotion) {
      tempMatch.touchPromotionOption(true, current_player_number);
      console.log({ match: tempMatch.asJson });
    }
    setGame(tempMatch.asJson);
  }

  return (
    <div className="demo">
      <Board
        pieces={transformGameStateToPieces(game.game_state)}
        onMovePiece={handleMovePiece}
        currentPlayer={game.current_player_number}
        pieceComponents={pieceComponents}
        handleMovePiece={handleMovePiece}
      />
    </div>
  );
};

export default Demo;
