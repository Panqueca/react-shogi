import { getSquareByXYBoard } from "../board/display";

export function eachPiece(board, callback) {
  board.forEach((col, x) => {
    col.forEach((piece, y) => {
      callback({ x, y, piece });
    });
  });
}

export function getAttackedSquares(game, kingColor) {
  const attackedSquares = [];

  eachPiece(game.board, ({ piece, x, y }) => {
    if (!piece || piece.color === kingColor) return;
    const { squareX, squareY } = getSquareByXYBoard({ x, y });

    const pieceAttacks = game.getMovesFrom(squareX, squareY);
    if (pieceAttacks.length > 0)
      pieceAttacks.forEach(square => {
        attackedSquares.push({ kind: piece.kind, ...square });
      });
  });

  return attackedSquares;
}

export function sameSquare(squareA, squareB) {
  return squareA.x === squareB.x && squareA.y === squareB.y;
}

export function isKingInCheck(game, kingColor) {
  const attacked = getAttackedSquares(game, kingColor);
  let kingSquare = { x: null, y: null };

  eachPiece(game.board, ({ piece, x, y }) => {
    if (piece && piece.kind === "OU" && piece.color === kingColor) {
      const { squareX, squareY } = getSquareByXYBoard({ x, y });
      kingSquare = { x: squareX, y: squareY };
    }
  });

  return attacked.filter(({ to }) => sameSquare(kingSquare, to)).length > 0;
}
