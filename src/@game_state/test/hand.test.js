import Hand from "../src/hand";
import Pawn from "../src/Pawn";
import GoldGeneral from "../src/GoldGeneral";

describe("Hand", () => {
  describe("asJson", () => {
    it("must return the hand serialized as a simple object", () => {
      let hand = new Hand({
        player_number: 1,
        pieces: [{ id: 1, player_number: 1, type: "Pawn" }]
      });

      let expected = {
        player_number: 1,
        pieces: [{ id: 1, player_number: 1, selected: false, type: "Pawn" }]
      };

      let result = hand.asJson;

      expect(result).toEqual(expected);
    });
  });

  describe("hasPiece", () => {
    describe("piece exists in hand", () => {
      it("must return true", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn" }]
        });

        let result = hand.hasPiece(1);

        expect(result).toBe(true);
      });
    });

    describe("piece does not exist in hand", () => {
      it("must return false", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn" }]
        });

        let result = hand.hasPiece(2);

        expect(result).toBe(false);
      });
    });
  });

  describe("findById", () => {
    describe("piece exists", () => {
      it("returns the piece", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn" }]
        });

        let result = hand.findById(1);

        expect(result.id).toEqual(1);
      });
    });

    describe("piece does no texist", () => {
      it("returns undefined", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn" }]
        });

        let result = hand.findById(2);

        expect(result).toBe(undefined);
      });
    });
  });

  describe("selectedPiece", () => {
    describe("with piece selected", () => {
      it("must return the piece", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn", selected: true }]
        });

        let result = hand.selectedPiece;

        expect(result.constructor).toBe(Pawn);
        expect(result.id).toEqual(1);
      });
    });

    describe("with no piece selected", () => {
      it("must return undefined", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [{ id: 1, player_number: 1, type: "Pawn", selected: false }]
        });

        let result = hand.selectedPiece;

        expect(result).toBe(undefined);
      });
    });
  });

  describe("pushPiece", () => {
    describe("any piece", () => {
      it("must add the piece to the hand", () => {
        let hand = new Hand({ player_number: 1, pieces: [] });
        let Pawn = new Pawn({ id: 1, player_number: 1, type: "Pawn" });

        hand.pushPiece(Pawn);

        let handPiece = hand.pieces[0];

        expect(handPiece.id).toEqual(1);
      });

      it("must switch the player", () => {
        let hand = new Hand({ player_number: 1, pieces: [] });
        let Pawn = new Pawn({ id: 1, player_number: 1, type: "Pawn" });

        hand.pushPiece(Pawn);

        let handPiece = hand.pieces[0];

        expect(handPiece.playerNumber).toEqual(2);
      });
    });

    describe("a promoted piece", () => {
      it("must demote the piece", () => {
        let hand = new Hand({ player_number: 1, pieces: [] });
        let GoldGeneral = new GoldGeneral({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });

        hand.pushPiece(GoldGeneral);

        let handPiece = hand.pieces[0];

        expect(handPiece.id).toEqual(1);
        expect(handPiece.constructor).toEqual(Pawn);
      });
    });

    describe("a non promoted piece", () => {
      it("must leave the piece klass as is", () => {
        let hand = new Hand({ player_number: 1, pieces: [] });
        let Pawn = new Pawn({ id: 1, player_number: 1, type: "Pawn" });

        hand.pushPiece(Pawn);

        let handPiece = hand.pieces[0];

        expect(handPiece.constructor).toEqual(Pawn);
      });
    });
  });

  describe("popPiece", () => {
    describe("with the piece existing", () => {
      it("returns the piece and removes it from the array", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn" },
            { id: 2, player_number: 1, type: "Lance" }
          ]
        });

        let result = hand.popPiece(1);

        expect(hand.pieces.length).toEqual(1);
        expect(result.id).toEqual(1);
      });
    });

    describe("with the piece not existing", () => {
      it("returns null and does not affect the array", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn" },
            { id: 2, player_number: 1, type: "Lance" }
          ]
        });

        let result = hand.popPiece(3);

        expect(hand.pieces.length).toEqual(2);
        expect(result).toBe(null);
      });
    });
  });

  describe("selectPiece", () => {
    describe("when piece exists", () => {
      it("must select the piece", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn", selected: false },
            { id: 2, player_number: 1, type: "Lance", selected: false }
          ]
        });

        let result = hand.selectPiece(1);
        let piece = hand.findById(1);

        expect(piece.selected).toBe(true);
        expect(result).toBe(true);
      });
    });

    describe("when piece does not exist", () => {
      it("must return false", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn", selected: false },
            { id: 2, player_number: 1, type: "Lance", selected: false }
          ]
        });

        let result = hand.selectPiece(3);

        expect(result).toBe(false);
      });
    });
  });

  describe("deselectPiece", () => {
    describe("when piece exists", () => {
      it("must deselect the piece", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn", selected: true },
            { id: 2, player_number: 1, type: "Lance", selected: false }
          ]
        });

        let result = hand.deselectPiece(1);
        let piece = hand.findById(1);

        expect(piece.selected).toBe(false);
        expect(result).toBe(true);
      });
    });

    describe("when piece does not exist", () => {
      it("must return false", () => {
        let hand = new Hand({
          player_number: 1,
          pieces: [
            { id: 1, player_number: 1, type: "Pawn", selected: true },
            { id: 2, player_number: 1, type: "Lance", selected: false }
          ]
        });

        let result = hand.deselectPiece(3);

        expect(result).toBe(false);
      });
    });
  });
});
