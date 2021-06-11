import Knight from "../src/Knight";
import Square from "../src/square";
import GameState from "../src/game_state";

describe("Knight", () => {
  describe("destinations", () => {
    it("must return only valid destinations", () => {
      let Knight = new Knight({ id: 17, player_number: 1, type: "Knight" });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: Knight });
      let forward = new Square({ id: "87", x: 1, y: 6, piece: null });
      let farForward = new Square({ id: "86", x: 1, y: 5, piece: null });
      let side = new Square({ id: "78", x: 2, y: 7, piece: null });
      let diagonal = new Square({ id: "77", x: 2, y: 6, piece: null });
      let lForward = new Square({ id: "76", x: 2, y: 5, piece: null });
      let farSide = new Square({ id: "68", x: 3, y: 7, piece: null });
      let lSide = new Square({ id: "67", x: 3, y: 6, piece: null });
      let farDiagonal = new Square({ id: "66", x: 3, y: 5, piece: null });
      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          farForward,
          side,
          diagonal,
          lForward,
          farSide,
          lSide,
          farDiagonal
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = Knight.destinations(origin, gameState);

      expect(result.squares).not.toContainEqual(forward);
      expect(result.squares).not.toContainEqual(farForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).not.toContainEqual(diagonal);
      expect(result.squares).toContainEqual(lForward);
      expect(result.squares).not.toContainEqual(farSide);
      expect(result.squares).not.toContainEqual(lSide);
      expect(result.squares).not.toContainEqual(farDiagonal);
    });

    it("must return occupied by opponent squares", () => {
      let Knight = new Knight({ id: 17, player_number: 1, type: "Knight" });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: Knight });
      let forward = new Square({
        id: "87",
        x: 1,
        y: 6,
        piece: { id: 1, player_number: 2, type: "Pawn" }
      });
      let farForward = new Square({
        id: "86",
        x: 1,
        y: 5,
        piece: { id: 2, player_number: 2, type: "Pawn" }
      });
      let side = new Square({
        id: "78",
        x: 2,
        y: 7,
        piece: { id: 3, player_number: 2, type: "Pawn" }
      });
      let diagonal = new Square({
        id: "77",
        x: 2,
        y: 6,
        piece: { id: 4, player_number: 2, type: "Pawn" }
      });
      let lForward = new Square({
        id: "76",
        x: 2,
        y: 5,
        piece: { id: 5, player_number: 2, type: "Pawn" }
      });
      let farSide = new Square({
        id: "68",
        x: 3,
        y: 7,
        piece: { id: 6, player_number: 2, type: "Pawn" }
      });
      let lSide = new Square({
        id: "67",
        x: 3,
        y: 6,
        piece: { id: 7, player_number: 2, type: "Pawn" }
      });
      let farDiagonal = new Square({
        id: "66",
        x: 3,
        y: 5,
        piece: { id: 8, player_number: 2, type: "Pawn" }
      });

      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          farForward,
          side,
          diagonal,
          lForward,
          farSide,
          lSide,
          farDiagonal
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = Knight.destinations(origin, gameState);

      expect(result.squares).not.toContainEqual(forward);
      expect(result.squares).not.toContainEqual(farForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).not.toContainEqual(diagonal);
      expect(result.squares).toContainEqual(lForward);
      expect(result.squares).not.toContainEqual(farSide);
      expect(result.squares).not.toContainEqual(lSide);
      expect(result.squares).not.toContainEqual(farDiagonal);
    });

    it("must not return occupied by player squares", () => {
      let Knight = new Knight({ id: 17, player_number: 1, type: "Knight" });
      let origin = new Square({ id: "88", x: 1, y: 7, piece: Knight });
      let forward = new Square({
        id: "87",
        x: 1,
        y: 6,
        piece: { id: 1, player_number: 1, type: "Pawn" }
      });
      let farForward = new Square({
        id: "86",
        x: 1,
        y: 5,
        piece: { id: 2, player_number: 1, type: "Pawn" }
      });
      let side = new Square({
        id: "78",
        x: 2,
        y: 7,
        piece: { id: 3, player_number: 1, type: "Pawn" }
      });
      let diagonal = new Square({
        id: "77",
        x: 2,
        y: 6,
        piece: { id: 4, player_number: 1, type: "Pawn" }
      });
      let lForward = new Square({
        id: "76",
        x: 2,
        y: 5,
        piece: { id: 5, player_number: 1, type: "Pawn" }
      });
      let farSide = new Square({
        id: "68",
        x: 3,
        y: 7,
        piece: { id: 6, player_number: 1, type: "Pawn" }
      });
      let lSide = new Square({
        id: "67",
        x: 3,
        y: 6,
        piece: { id: 7, player_number: 1, type: "Pawn" }
      });
      let farDiagonal = new Square({
        id: "66",
        x: 3,
        y: 5,
        piece: { id: 8, player_number: 1, type: "Pawn" }
      });

      let gameState = new GameState({
        current_player_number: 1,
        squares: [
          origin,
          forward,
          farForward,
          side,
          diagonal,
          lForward,
          farSide,
          lSide,
          farDiagonal
        ],
        hands: [
          { player_number: 1, pieces: [] },
          { player_number: 2, pieces: [] }
        ]
      });

      let result = Knight.destinations(origin, gameState);

      expect(result.squares).not.toContainEqual(forward);
      expect(result.squares).not.toContainEqual(farForward);
      expect(result.squares).not.toContainEqual(side);
      expect(result.squares).not.toContainEqual(diagonal);
      expect(result.squares).not.toContainEqual(lForward);
      expect(result.squares).not.toContainEqual(farSide);
      expect(result.squares).not.toContainEqual(lSide);
    });
  });

  describe("hasLegalMovesOnSquare", () => {
    describe("when player 1", () => {
      describe("when rank is 1 (y is 0)", () => {
        it("must return false", () => {
          let Knight = new Knight({ id: 18, player_number: 1, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(0)).toBe(false);
        });
      });

      describe("when rank is 2 (y is 1)", () => {
        it("must return true", () => {
          let Knight = new Knight({ id: 18, player_number: 1, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(1)).toBe(false);
        });
      });

      describe("when rank is not 1 or 2 (y is not 0 or 1)", () => {
        it("must return true", () => {
          let Knight = new Knight({ id: 18, player_number: 1, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(3)).toBe(true);
        });
      });
    });

    describe("when player 2", () => {
      describe("when rank is 9 (y is 8)", () => {
        it("must return false", () => {
          let Knight = new Knight({ id: 18, player_number: 2, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(8)).toBe(false);
        });
      });

      describe("when rank is 8 (y is 7)", () => {
        it("must return true", () => {
          let Knight = new Knight({ id: 18, player_number: 2, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(7)).toBe(false);
        });
      });

      describe("when rank is not 9 or 8 (y is not 8 or 7)", () => {
        it("must return true", () => {
          let Knight = new Knight({ id: 18, player_number: 2, type: "Knight" });

          expect(Knight.hasLegalMovesFromY(6)).toBe(true);
        });
      });
    });
  });
});
