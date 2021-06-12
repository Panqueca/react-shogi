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
    console.log({ piece, fromSquare, toSquare });
  }

  function move() {
    const tempMatch = new Match(game);
    tempMatch.touchSquare("g7", 1);
    tempMatch.touchSquare("f7", 1);
    tempMatch.touchSquare("c3", 2);
    tempMatch.touchSquare("d3", 2);
    tempMatch.touchSquare("h8", 1);
    console.log(tempMatch.asJson);
    tempMatch.touchSquare("b2", 1);
    console.log(tempMatch.asJson.promotion);
    tempMatch.touchPromotionOption(tempMatch.asJson.promotion, 1);
    console.log(tempMatch.asJson);
    setGame(tempMatch.asJson);
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
