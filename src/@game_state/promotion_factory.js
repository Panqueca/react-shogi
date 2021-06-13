import { exists } from "./utils";
import Pawn from "./Pawn";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Lance from "./Lance";
import Knight from "./Knight";
import SilverGeneral from "./SilverGeneral";

import PromotedPawn from "./PromotedPawn";
import DragonHorse from "./DragonHorse";
import DragonKing from "./DragonKing";
import PromotedLance from "./PromotedLance";
import PromotedKnight from "./PromotedKnight";
import PromotedSilverGeneral from "./PromotedSilverGeneral";

const PROMOTIONS = [
  { from: Pawn, to: PromotedPawn, type: "PromotedPawn" },
  { from: Bishop, to: DragonHorse, type: "DragonHorse" },
  { from: Rook, to: DragonKing, type: "DragonKing" },
  { from: Lance, to: PromotedLance, type: "PromotedLance" },
  { from: Knight, to: PromotedKnight, type: "PromotedKnight" },
  {
    from: SilverGeneral,
    to: PromotedSilverGeneral,
    type: "PromotedSilverGeneral"
  }
];

class PromotionFactory {
  constructor(piece) {
    this.piece = piece;
  }

  get promotable() {
    return exists(this._promotedKlass(this.piece.constructor));
  }

  get demotable() {
    return exists(this._demotedKlass(this.piece.constructor));
  }

  promote() {
    const { type } = this._filterKlass(this.piece.constructor);
    let promotedKlass = this._promotedKlass(this.piece.constructor);
    if (exists(promotedKlass)) {
      return new promotedKlass({
        id: this.piece.id,
        player_number: this.piece.playerNumber,
        type
      });
    } else {
      throw "Piece cannot be promoted";
    }
  }

  demote() {
    let demotedKlass = this._demotedKlass(this.piece.constructor);
    if (exists(demotedKlass)) {
      return new demotedKlass({
        id: this.piece.id,
        player_number: this.piece.playerNumber
      });
    } else {
      throw "Piece cannot be promoted";
    }
  }

  _filterKlass(klass) {
    return PROMOTIONS.filter(p => {
      return p.from === klass;
    })[0];
  }

  _promotedKlass(klass) {
    const filtered = this._filterKlass(klass);
    if (exists(filtered)) return filtered.to;
    return null;
  }

  _demotedKlass(klass) {
    const filtered = this._filterKlass(klass);
    if (exists(filtered)) return filtered.from;
    return null;
  }
}

export default PromotionFactory;
