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
  { from: Pawn, to: PromotedPawn },
  { from: Bishop, to: DragonHorse },
  { from: Rook, to: DragonKing },
  { from: Lance, to: PromotedLance },
  { from: Knight, to: PromotedKnight },
  { from: SilverGeneral, to: PromotedSilverGeneral }
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
    let promotedKlass = this._promotedKlass(this.piece.constructor);
    if (exists(promotedKlass)) {
      return new promotedKlass({
        id: this.piece.id,
        player_number: this.piece.playerNumber
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

  _promotedKlass(klass) {
    let mapping = PROMOTIONS.filter(p => {
      return p.from === klass;
    })[0];
    if (exists(mapping)) {
      return mapping.to;
    } else {
      return null;
    }
  }

  _demotedKlass(klass) {
    let mapping = PROMOTIONS.filter(p => {
      return p.to === klass;
    })[0];
    if (exists(mapping)) {
      return mapping.from;
    } else {
      return null;
    }
  }
}

export default PromotionFactory;
