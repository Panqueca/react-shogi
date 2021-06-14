import decode from "../../decode";
import { transformLineUpToSquares } from "../pieces/filter";
import defaultLineup from "./defaultLineup";

const defaultPlayers = [
  { player_number: 1, name: "Jogador 1" },
  { player_number: 2, name: "Jogador 2" }
];

export const DEFAULT_GAME = {
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
};

export const getNormalizedGameData = gameData => {
  const updatedHands = [];

  const { game_state } = gameData;
  const { hands } = game_state;

  if (Array.isArray(hands))
    hands.forEach(handInfo => {
      const newPieces = [];
      if (handInfo.pieces)
        handInfo.pieces.forEach(pieceInfo => {
          const { pieceType } = decode.fromPieceDecl(pieceInfo.id);
          newPieces.push({ ...pieceInfo, type: pieceType });
        });

      updatedHands.push({ ...handInfo, pieces: newPieces });
    });

  return { ...gameData, game_state: { ...game_state, hands: updatedHands } };
};
