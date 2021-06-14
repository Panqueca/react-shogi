import decode from "../../decode";

export const DEFAULT_GAME = {
  id: 1,
  flagEditMode: true,
  turn: 0
};

export const getNormalizedGameData = gameData => {
  const updatedHands = [];

  const { game_state } = gameData;
  const { hands } = game_state;

  if (Array.isArray(hands))
    hands.forEach(handInfo => {
      const newPieces = [];
      if (handInfo.pieces)
        handInfo.pieces.forEach(pieceInfo => {
          const { pieceType } = decode.fromPieceDecl(pieceInfo.id);
          newPieces.push({ ...pieceInfo, type: pieceType });
        });

      updatedHands.push({ ...handInfo, pieces: newPieces });
    });

  return { ...gameData, game_state: { ...game_state, hands: updatedHands } };
};
