import {
  getSquareByInternationalSlug,
  getSquareByXYBoard,
} from "../board/display";
import { checkIsPossibleMove } from "../pieces/filter";

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
      pieceAttacks.forEach((square) => {
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

export function getMoveResponse({ moveAction, turn, color }) {
  const { from: isActionMove, dropPiece } = moveAction;
  const { kind: dropKind, turn: dropTurn } = dropPiece || {};

  const hasPieceOnSquare = color >= 0;

  const isPlayerPiece = hasPieceOnSquare && color === turn;
  const isOpponentPiece = hasPieceOnSquare && color !== turn;
  const isDropAction = dropKind && dropTurn === turn;
  const isEmptySelection = !isActionMove && !hasPieceOnSquare && !isDropAction;

  const invalidOpponentPiece = isOpponentPiece && !isActionMove;
  console.log({ invalidOpponentPiece, isActionMove });
  const invalidOwnPiece = isPlayerPiece && isActionMove;

  const invalidDrop = isDropAction && hasPieceOnSquare;
  const invalidMove =
    invalidOpponentPiece || invalidOwnPiece || invalidDrop || isEmptySelection;

  return {
    hasPieceOnSquare,
    isPlayerPiece,
    isOpponentPiece,
    isActionMove,
    isDropAction,
    invalidOpponentPiece,
    invalidOwnPiece,
    invalidDrop,
    invalidMove,
  };
}

export function getMoveAction({ square, moveAction, turn, color }) {
  const {
    invalidOwnPiece,
    invalidDrop,
    invalidOpponentPiece,
    invalidMove,
    isDropAction,
    isOpponentPiece,
    isActionMove,
  } = getMoveResponse({
    moveAction,
    turn,
    color,
  });

  const { squareX, squareY } = getSquareByInternationalSlug(square);
  const canPieceMoveToSquare = checkIsPossibleMove(
    { squareX, squareY },
    moveAction.moves
  );

  if (invalidOwnPiece) return "invalid:ownPiece";
  if (invalidDrop) return "invalid:drop";
  if (invalidOpponentPiece) return "invalid:opponentPiece";
  if (invalidMove) return "invalid:move";
  if (isDropAction) return "valid:drop";
  if (canPieceMoveToSquare && isOpponentPiece) return "valid:capture";
  if (canPieceMoveToSquare && isActionMove) return "valid:move";
  if (isOpponentPiece) return "invalid:opponentPiece";
  return "valid:selection";
}

export function getEnemyCampRowData({ turn }) {
  if (turn === 0)
    return {
      startRow: 1,
      endRow: 3,
    };

  return {
    startRow: 7,
    endRow: 9,
  };
}

export function isPieceOnEnemyCamp({ turn, squareY }) {
  const { startRow, endRow } = getEnemyCampRowData({ turn });
  if (squareY >= startRow && squareY <= endRow) return true;
}
