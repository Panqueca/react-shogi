import { useEffect, useState } from "react";
import Match from "../@game_state/match";
import decode from "../decode";

const React = require("react");
const Chess = require("../react-shogi");

require("./demo.css");

const defaultLineUp = Chess.getDefaultLineup();
const defaultPlayers = [
  { player_number: 1, name: "Player 1" },
  { player_number: 2, name: "Player 2" }
];

function getMissingSquares(currentSquares) {
  const all = [];

  ["a", "b", "c", "d", "f", "g", "h", "i"].forEach(col => {
    for (let i = 1; i <= 9; i++) {
      const squareId = `${col}${i}`;
      const { x, y } = decode.fromPieceDecl(`Pawn@${squareId}`);
      all.push({ id: squareId, x, y, piece: null });
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
  if (gameState)
    return gameState.squares
      .filter(({ piece }) => piece)
      .map(
        ({ id, piece }) =>
          `${piece.type}${piece.player_number === 1 ? "A" : "B"}@${id}`
      );
  return Chess.getDefaultLineup();
}

const Demo = () => {
  const [pieces, setPieces] = useState(defaultLineUp);
  const [game, setGame] = useState({});

  useEffect(() => {
    if (!game.id) {
      setGame({
        id: 1,
        game_state: {
          current_player_number: 1,
          squares: transformLineUpToSquares(defaultLineUp),
          hands: [
            { player_number: 1, pieces: [] },
            { player_number: 2, pieces: [] }
          ]
        },
        players: defaultPlayers,
        winner: null
      });
    }
  }, [game]);

  function handleMovePiece(piece, fromSquare, toSquare) {
    const newPieces = [...pieces]
      .map((curr, index) => {
        if (piece && piece.index === index) {
          console.log({ piece, fromSquare, toSquare });
          return `${piece.name}@${toSquare}`;
        } else if (curr.indexOf(toSquare) === 2) {
          return false; // To be removed from the board
        }
        return curr;
      })
      .filter(Boolean);

    setPieces(newPieces);
  }

  function move() {
    const tempMatch = new Match(game);
    console.log({ tempMatch: tempMatch.asJson });
    tempMatch.touchSquare("a3", 1);
    console.log({ tempMatch: tempMatch.asJson });
    tempMatch.touchSquare("a4", 1);
    console.log({ tempMatch: tempMatch.asJson });
  }

  return (
    <div className="demo">
      <Chess
        pieces={transformGameStateToPieces(game.game_state)}
        onMovePiece={handleMovePiece}
        currentPlayer={game.current_player_number}
      />
      <button onClick={move}>test</button>
    </div>
  );
};

export default Demo;
