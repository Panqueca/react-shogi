import { exists } from "./utils";
import Pawn from "./Pawn";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Lance from "./Lance";
import Knight from "./Knight";
import SilverGeneral from "./SilverGeneral";
import Kinshou from "./kinshou";
import KingSente from "./KingSente";
import KingGote from "./KingGote";
import GoldGeneral from "./GoldGeneral";
import PromotedLance from "./PromotedLance";
import PromotedKnight from "./PromotedKnight";
import PromotedSilverGeneral from "./PromotedSilverGeneral";
import DragonHorse from "./DragonHorse";
import DragonKing from "./DragonKing";

/** A piece generator */
class PieceFactory {
  /**
   * Create a Piece Factory
   * @params {Object} args - The properties of the piece.
   * @param {String} args.type - The type of the piece.
   */
  constructor(args) {
    this.args = args;
  }

  /**
   * Build a piece based on the args type.
   * @return {(Piece|null)}
   */
  get build() {
    if (exists(this.args)) {
      if (this.args.constructorName === "Piece") {
        return this.args;
      } else {
        switch (this.args.type) {
          case "Pawn":
            return new Pawn(this.args);
          case "Bishop":
            return new Bishop(this.args);
          case "Rook":
            return new Rook(this.args);
          case "Lance":
            return new Lance(this.args);
          case "Knight":
            return new Knight(this.args);
          case "SilverGeneral":
            return new SilverGeneral(this.args);
          case "kinshou":
            return new Kinshou(this.args);
          case "KingSente":
            return new KingSente(this.args);
          case "KingGote":
            return new KingGote(this.args);
          case "GoldGeneral":
            return new GoldGeneral(this.args);
          case "PromotedLance":
            return new PromotedLance(this.args);
          case "PromotedKnight":
            return new PromotedKnight(this.args);
          case "PromotedSilverGeneral":
            return new PromotedSilverGeneral(this.args);
          case "DragonHorse":
            return new DragonHorse(this.args);
          case "DragonKing":
            return new DragonKing(this.args);
          default:
            return null;
        }
      }
    } else {
      return null;
    }
  }
}

export default PieceFactory;
