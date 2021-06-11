import SilverGeneral from "../src/SilverGeneral";
import Square from "../src/square";
import GameState from "../src/game_state";

describe("SilverGeneral", () => {
  describe("destinations", () => {
    it("must return only valid destionations", () => {
      let SilverGeneral = new SilverGeneral({
        id: 17,
        player_number: 1,
        type: "SilverGeneral"
      });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: SilverGeneral });
      let forward = new Square({ id: "87", x: 1, y: 6, piece: null });
      let far = new Square({ id: "86", x: 1, y: 5, piece: null });
      let diagonalForward = new Square({ id: "77", x: 2, y: 6, piece: null });
      let side = new Square({ id: "78", x: 2, y: 7, piece: null });
      let diagonalBack = new Square({ id: "79", x: 2, y: 8, piece: null });
      let back = new Square({ id: "89", x: 1, y: 8, piece: null });
      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          far,
          diagonalForward,
          side,
          diagonalBack,
          back
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = SilverGeneral.destinations(origin, gameState);

      expect(result.squares).toContainEqual(forward);
      expect(result.squares).not.toContainEqual(far);
      expect(result.squares).toContainEqual(diagonalForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).toContainEqual(diagonalBack);
      expect(result.squares).not.toContainEqual(back);
    });

    it("must return occupied by opponent squares", () => {
      let SilverGeneral = new SilverGeneral({
        id: 17,
        player_number: 1,
        type: "SilverGeneral"
      });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: SilverGeneral });
      let forward = new Square({
        id: "87",
        x: 1,
        y: 6,
        piece: { id: 18, player_number: 2, type: "SilverGeneral" }
      });
      let far = new Square({
        id: "86",
        x: 1,
        y: 5,
        piece: { id: 19, player_number: 2, type: "SilverGeneral" }
      });
      let diagonalForward = new Square({
        id: "77",
        x: 2,
        y: 6,
        piece: { id: 20, player_number: 2, type: "SilverGeneral" }
      });
      let side = new Square({
        id: "78",
        x: 2,
        y: 7,
        piece: { id: 21, player_number: 2, type: "SilverGeneral" }
      });
      let diagonalBack = new Square({
        id: "79",
        x: 2,
        y: 8,
        piece: { id: 22, player_number: 2, type: "SilverGeneral" }
      });
      let back = new Square({
        id: "89",
        x: 1,
        y: 8,
        piece: { id: 23, player_number: 2, type: "SilverGeneral" }
      });
      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          far,
          diagonalForward,
          side,
          diagonalBack,
          back
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = SilverGeneral.destinations(origin, gameState);

      expect(result.squares).toContainEqual(forward);
      expect(result.squares).not.toContainEqual(far);
      expect(result.squares).toContainEqual(diagonalForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).toContainEqual(diagonalBack);
      expect(result.squares).not.toContainEqual(back);
    });

    it("must not return occupied by player squares", () => {
      let SilverGeneral = new SilverGeneral({
        id: 17,
        player_number: 1,
        type: "SilverGeneral"
      });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: SilverGeneral });
      let forward = new Square({
        id: "87",
        x: 1,
        y: 6,
        piece: { id: 18, player_number: 1, type: "SilverGeneral" }
      });
      let far = new Square({
        id: "86",
        x: 1,
        y: 5,
        piece: { id: 19, player_number: 1, type: "SilverGeneral" }
      });
      let diagonalForward = new Square({
        id: "77",
        x: 2,
        y: 6,
        piece: { id: 20, player_number: 1, type: "SilverGeneral" }
      });
      let side = new Square({
        id: "78",
        x: 2,
        y: 7,
        piece: { id: 21, player_number: 1, type: "SilverGeneral" }
      });
      let diagonalBack = new Square({
        id: "79",
        x: 2,
        y: 8,
        piece: { id: 22, player_number: 1, type: "SilverGeneral" }
      });
      let back = new Square({
        id: "89",
        x: 1,
        y: 8,
        piece: { id: 23, player_number: 1, type: "SilverGeneral" }
      });
      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          far,
          diagonalForward,
          side,
          diagonalBack,
          back
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = SilverGeneral.destinations(origin, gameState);

      expect(result.squares).not.toContainEqual(forward);
      expect(result.squares).not.toContainEqual(far);
      expect(result.squares).not.toContainEqual(diagonalForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).not.toContainEqual(diagonalBack);
      expect(result.squares).not.toContainEqual(back);
    });
  });
});
