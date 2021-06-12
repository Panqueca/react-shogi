const charCodeOffset = 97;

module.exports = {
  fromPieceDecl: pos => {
    const [piece, square] = pos.split("@");
    const x = Number(square[1]) - 1;
    const y = square.toLowerCase().charCodeAt(0) - charCodeOffset;
    return { x, y, piece, square };
  },

  charCodeOffset
};
