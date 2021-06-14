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
