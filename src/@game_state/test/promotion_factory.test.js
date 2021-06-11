import PromotionFactory from "../src/promotion_factory";
import Pawn from "../src/Pawn";
import GoldGeneral from "../src/GoldGeneral";

describe("PromotionFactory", () => {
  describe("promotable", () => {
    describe("a piece that can promote", () => {
      it("must return true", () => {
        let piece = new Pawn({ id: 1, player_number: 1, type: "Pawn" });
        let promotionFactory = new PromotionFactory(piece);
        expect(promotionFactory.promotable).toBe(true);
      });
    });

    describe("a piece that cannot promote", () => {
      it("must return false", () => {
        let piece = new GoldGeneral({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });
        let promotionFactory = new PromotionFactory(piece);
        expect(promotionFactory.promotable).toBe(false);
      });
    });
  });

  describe("demotable", () => {
    describe("a piece that can demote", () => {
      it("must return true", () => {
        let piece = new GoldGeneral({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });
        let promotionFactory = new PromotionFactory(piece);
        expect(promotionFactory.demotable).toBe(true);
      });
    });

    describe("a piece that cannot demote", () => {
      it("must return false", () => {
        let piece = new Pawn({ id: 1, player_number: 1, type: "Pawn" });
        let promotionFactory = new PromotionFactory(piece);
        expect(promotionFactory.demotable).toBe(false);
      });
    });
  });

  describe("promote", () => {
    describe("a piece that can promote", () => {
      it("must return the promoted piece", () => {
        let piece = new Pawn({ id: 1, player_number: 1, type: "Pawn" });
        let promotionFactory = new PromotionFactory(piece);
        let result = promotionFactory.promote();
        expect(result.constructor).toBe(GoldGeneral);
      });
    });

    describe("a piece that cannot promote", () => {
      it("must raise error", () => {
        let piece = new GoldGeneral({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });
        let promotionFactory = new PromotionFactory(piece);
        expect(() => promotionFactory.promote()).toThrow(
          "Piece cannot be promoted"
        );
      });
    });
  });

  describe("demote", () => {
    describe("a piece that can demote", () => {
      it("must return the demoted piece", () => {
        let piece = new GoldGeneral({
          id: 1,
          player_number: 1,
          type: "GoldGeneral"
        });
        let promotionFactory = new PromotionFactory(piece);
        let result = promotionFactory.demote();
        expect(result.constructor).toBe(Pawn);
      });
    });

    describe("a piece that cannot demote", () => {
      it("must raise error", () => {
        let piece = new Pawn({ id: 1, player_number: 1, type: "Pawn" });
        let promotionFactory = new PromotionFactory(piece);
        expect(() => promotionFactory.demote()).toThrow(
          "Piece cannot be promoted"
        );
      });
    });
  });
});
