import decode from "../../decode";
import { Y_SERIES } from "../board/display";

export function getMissingSquares(currentSquares) {
  const all = [];

  Y_SERIES.forEach(col => {
    for (let i = 1; i <= 9; i++) {
      const squareId = `${col}${i}`;
      const { x, y } = decode.fromPieceDecl(`Pawn@${squareId}`);
      all.push({ id: squareId, x, y });
    }
  });

  return all.filter(
    square => [...currentSquares].map(({ id }) => id).indexOf(square.id) === -1
  );
}

export function transformLineUpToSquares(lineUp) {
  const squares = [];

  lineUp.forEach(info => {
    if (info) {
      const { x, y, piece, square, pieceType } = decode.fromPieceDecl(info);
      const side = piece.substr(piece.length - 1);
      const player_number = side === "A" ? 1 : 2;

      squares.push({
        id: square,
        x,
        y,
        piece: {
          id: info,
          type: pieceType,
          player_number
        }
      });
    }
  });

  return [...squares, ...getMissingSquares(squares)];
}

export function buildBoardPiecesByGameState(gameState) {
  const { squares } = gameState || {};

  if (Array.isArray(squares)) {
    return squares.map(({ id, piece }) => {
      if (!piece)
        return {
          pieceAtLocation: `Empty@${id}`,
          piece: null,
          player_number: null
        };

      return {
        pieceAtLocation: `${piece.type}${
          piece.player_number === 1 ? "A" : "B"
        }@${id}`,
        piece,
        player_number: piece.player_number
      };
    });
  }

  return [];
}

export function transformGameStateToBoard(gameState) {
  return {
    pieces: buildBoardPiecesByGameState(gameState),
    hands: buildBoardHandsByGameState(gameState)
  };
}

export function getPlayerHandByGameResponse(pieces, playerNumber) {
  const normalized = {};

  if (Array.isArray(pieces) && playerNumber)
    pieces.forEach(pieceInfo => {
      if (!pieceInfo || !pieceInfo.id) return;

      const { id: previousId } = pieceInfo;
      const { pieceType } = decode.fromPieceDecl(pieceInfo.id);
      const current = normalized[pieceType] || { count: 0, pieces: [] };
      normalized[pieceType] = {
        pieceType,
        pieceByPlayer: `${pieceType}${playerNumber === 2 ? "B" : "A"}`,
        pieces: [...current.pieces, { previousId }],
        count: current.count + 1
      };
    });

  return Object.keys(normalized).map(pieceType => normalized[pieceType]);
}

export function buildBoardHandsByGameState(gameState) {
  const { hands } = gameState || {};

  const result = {
    player1: [],
    player2: []
  };

  if (Array.isArray(hands)) {
    hands.forEach(({ player_number: pl, pieces }) => {
      result[pl === 1 ? "player1" : "player2"] = getPlayerHandByGameResponse(
        pieces,
        pl
      );
    });
  }

  return result;
}
