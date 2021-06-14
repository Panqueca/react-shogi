import decode from "../../decode";

export function getPlayerHandByGameResponse(pieces, turn) {
  const normalized = {};

  if (Array.isArray(pieces) && turn)
    pieces.forEach(pieceInfo => {
      if (!pieceInfo || !pieceInfo.id) return;

      const { id: previousId } = pieceInfo;
      const { pieceType } = decode.fromPieceDecl(pieceInfo.id);
      const current = normalized[pieceType] || { count: 0, pieces: [] };
      normalized[pieceType] = {
        pieceType,
        pieceByPlayer: `${pieceType}${turn === 2 ? "B" : "A"}`,
        pieces: [...current.pieces, { previousId }],
        count: current.count + 1
      };
    });

  return Object.keys(normalized).map(pieceType => normalized[pieceType]);
}

export function checkIsPossibleMove({ squareX, squareY }, possibleMoves) {
  if (Array.isArray(possibleMoves)) {
    const filter = possibleMoves.filter(
      ({ to }) => to.x === squareX && to.y === squareY
    );
    return filter.length > 0;
  }
  return false;
}
