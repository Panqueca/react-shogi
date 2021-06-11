import { useEffect, useState } from "react";
import Match from "../@game_state/match";

const React = require("react");
const Chess = require("../react-shogi");

require("./demo.css");

const Demo = () => {
  const [pieces, setPieces] = useState(Chess.getDefaultLineup());
  const [game, setGame] = useState(
    new Match({
      id: 1,
      game_state: {
        current_player_number: 1,
        squares: [
          {
            id: "a8",
            x: 0,
            y: 0,
            piece: {
              id: 1,
              player_number: 1,
              type: "Pawn"
            }
          },
          {
            id: "a6",
            x: 0,
            y: 0,
            piece: {
              id: 1,
              player_number: 1,
              type: "KingSente"
            }
          },
          {
            id: "a3",
            x: 0,
            y: 0,
            piece: {
              id: 1,
              player_number: 2,
              type: "KingGote"
            }
          }
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      },
      players: [
        { player_number: 1, name: "aaa" },
        { player_number: 2, name: "bbb" }
      ],
      winner: null
    })
  );

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
    console.log({ a: game.asJson });
    const tempMatch = new Match(game.asJson);
  }

  return (
    <div className="demo">
      <Chess pieces={pieces} onMovePiece={handleMovePiece} />
      <button onClick={move}>test</button>
    </div>
  );
};

export default Demo;
