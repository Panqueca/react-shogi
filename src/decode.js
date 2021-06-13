const { getSquareByInternationalSlug } = require("./utils/board/display");

module.exports = {
  fromPieceDecl: pos => {
    const [piece, square] = pos.split("@");
    const { indexOfRow, indexOfCol } = getSquareByInternationalSlug(square);
    const pieceType = piece.substr(0, piece.length - 1);

    return { y: indexOfRow, x: indexOfCol, piece, pieceType, square };
  }
};
