import PieceFactory from "../src/piece_factory";
import Pawn from "../src/Pawn";
import Bishop from "../src/Bishop";
import Rook from "../src/Rook";
import Lance from "../src/Lance";
import Knight from "../src/Knight";
import SilverGeneral from "../src/SilverGeneral";
import Kinshou from "../src/kinshou";
import KingSente from "../src/KingSente";
import KingGote from "../src/KingGote";
import GoldGeneral from "../src/GoldGeneral";
import PromotedLance from "../src/PromotedLance";
import PromotedKnight from "../src/PromotedKnight";
import PromotedSilverGeneral from "../src/PromotedSilverGeneral";
import DragonHorse from "../src/DragonHorse";
import DragonKing from "../src/DragonKing";

describe("PieceFactory", () => {
  describe("build", () => {
    describe("with null", () => {
      it("returns null", () => {
        let pieceFactory = new PieceFactory(null);
        let result = pieceFactory.build;
        expect(result).toBe(null);
      });
    });

    describe("with built piece", () => {
      it("returns the piece", () => {
        let piece = new Pawn({ id: 1, player_number: 2, type: "Pawn" });
        let pieceFactory = new PieceFactory(piece);
        let result = pieceFactory.build;
        expect(result).toBe(piece);
      });
    });

    describe("with Pawn", () => {
      it("builds a Pawn", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "Pawn"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Pawn);
        expect(result.id).toEqual(1);
      });
    });

    describe("with Bishop", () => {
      it("builds a Bishop", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "Bishop"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Bishop);
        expect(result.id).toEqual(1);
      });
    });

    describe("with Rook", () => {
      it("builds a Rook", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "Rook"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Rook);
        expect(result.id).toEqual(1);
      });
    });

    describe("with Lance", () => {
      it("builds a Lance", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "Lance"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Lance);
        expect(result.id).toEqual(1);
      });
    });

    describe("with Knight", () => {
      it("builds a Knight", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "Knight"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Knight);
        expect(result.id).toEqual(1);
      });
    });

    describe("with SilverGeneral", () => {
      it("builds a SilverGeneral", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "SilverGeneral"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(SilverGeneral);
        expect(result.id).toEqual(1);
      });
    });

    describe("with kinshou", () => {
      it("builds a kinshou", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "kinshou"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(Kinshou);
        expect(result.id).toEqual(1);
      });
    });

    describe("with KingSente", () => {
      it("builds an KingSente", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "KingSente"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(KingSente);
        expect(result.id).toEqual(1);
      });
    });

    describe("with KingGote", () => {
      it("builds a KingGote", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "KingGote"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(KingGote);
        expect(result.id).toEqual(1);
      });
    });

    describe("with GoldGeneral", () => {
      it("builds a GoldGeneral", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(GoldGeneral);
        expect(result.id).toEqual(1);
      });
    });

    describe("with PromotedLance", () => {
      it("builds a PromotedLance", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "PromotedLance"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(PromotedLance);
        expect(result.id).toEqual(1);
      });
    });

    describe("with PromotedKnight", () => {
      it("builds a PromotedKnight", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "PromotedKnight"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(PromotedKnight);
        expect(result.id).toEqual(1);
      });
    });

    describe("with PromotedSilverGeneral", () => {
      it("builds a PromotedSilverGeneral", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "PromotedSilverGeneral"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(PromotedSilverGeneral);
        expect(result.id).toEqual(1);
      });
    });

    describe("with DragonHorse", () => {
      it("builds a DragonHorse", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "DragonHorse"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(DragonHorse);
        expect(result.id).toEqual(1);
      });
    });

    describe("with DragonKing", () => {
      it("builds a DragonKing", () => {
        let pieceFactory = new PieceFactory({
          id: 1,
          player_number: 1,
          type: "DragonKing"
        });
        let result = pieceFactory.build;
        expect(result.constructor).toBe(DragonKing);
        expect(result.id).toEqual(1);
      });
    });
  });
});
