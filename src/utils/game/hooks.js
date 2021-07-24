import { useEffect, useState } from "react";
import { Shogi } from "shogi.js";
import { getMoveAction, isKingInCheck, isPieceOnEnemyCamp } from "./match";
import { defaultTargetTile, defaultMoveAction } from "./defaults";
import { getSquareByInternationalSlug } from "../board/display";
import { canPromoteByKind } from "../pieces/constants";

const shogi = new Shogi();

export function useShogiEngine({
  listenNotification,
  saveGameMove,
  sfenPosition,
}) {
  shogi.initialize();

  const [gameMatch, setGameMatch] = useState(shogi);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState(defaultMoveAction);

  function getFromSfen(sfen) {
    const tempShogi = new Shogi();
    tempShogi.initializeFromSFENString(sfen);
    return tempShogi;
  }

  function getTempShogi() {
    return getFromSfen(gameMatch.toSFENString());
  }

  function getCurrentSfen() {
    return getTempShogi().toSFENString();
  }

  useEffect(() => {
    if (sfenPosition && sfenPosition !== getCurrentSfen())
      setGameMatch(getFromSfen(sfenPosition));
  }, [sfenPosition]);

  function resetMoveData() {
    setMoveAction(defaultMoveAction);
    setTargetTile(defaultTargetTile);
  }

  function resetGame() {
    setGameMatch(shogi);
    resetMoveData();
  }

  function checkOpponentCheck(tempShogi, turn) {
    const opponnetColor = turn === 0 ? 1 : 0;

    if (isKingInCheck(tempShogi, opponnetColor))
      listenNotification("OpponentKingInCheck");
  }

  function updateGameMatch(newGame, { squareX, squareY, kind }) {
    const { turn } = gameMatch;
    checkOpponentCheck(newGame, turn);
    setGameMatch(newGame);
    if (saveGameMove)
      saveGameMove({ sfen: newGame.toSFENString(), squareX, squareY, kind });
    resetMoveData();
  }

  function createMoveAction({ square, pieceInfo }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);

    setMoveAction({
      pieceInfo,
      from: { squareX, squareY, square },
      moves: tempShogi.getMovesFrom(squareX, squareY),
    });
    setTargetTile({ squareX, squareY, square });
  }

  function dropsThePiece({ square, moveAction }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);

    const { dropPiece } = moveAction;
    const { kind: dropKind, turn: dropTurn } = dropPiece || {};

    tempShogi.drop(squareX, squareY, dropKind, dropTurn);
    updateGameMatch(tempShogi, { squareX, squareY, kind: "drop" });
  }

  function promoteCallback({ from, to, promote }) {
    const tempShogi = getTempShogi();

    tempShogi.move(from.squareX, from.squareY, to.squareX, to.squareY, promote);
    const kind = promote ? "promote" : "move";

    updateGameMatch(tempShogi, {
      sqaureX: to.sqaureX,
      squareY: to.squareY,
      kind,
    });
  }

  function checkCanPromote({ turn, fromSquareY, toSquareY, kind }) {
    const onEnemyCamp = isPieceOnEnemyCamp({
      turn,
      squareY: fromSquareY,
    });
    const movedToEnemyCamp = isPieceOnEnemyCamp({ turn, squareY: toSquareY });

    return (onEnemyCamp || movedToEnemyCamp) && canPromoteByKind(kind);
  }

  function movesThePiece({ moveAction, square }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);
    const { turn } = gameMatch;
    const { from, pieceInfo } = moveAction;

    tempShogi.move(from.squareX, from.squareY, squareX, squareY);

    const canPromote = checkCanPromote({
      turn,
      fromSquareY: from.squareY,
      toSquareY: squareY,
      kind: pieceInfo.kind,
    });

    if (isKingInCheck(tempShogi, turn)) {
      resetMoveData();
      listenNotification("KingInCheck");
      return;
    }

    if (canPromote) {
      listenNotification("PieceMovedToPromotionZone", {
        promote: (promoteOption) =>
          promoteCallback({
            from,
            to: { squareX, squareY },
            promote: promoteOption,
          }),
      });
      return;
    }

    updateGameMatch(tempShogi, { squareX, squareY, kind: "move" });
  }

  function touchTargetTile({ square, pieceInfo }) {
    const { turn } = gameMatch;
    const { color } = pieceInfo || {};

    const [status, action] = getMoveAction({
      square,
      moveAction,
      turn,
      color,
    }).split(":");

    if (status === "invalid") {
      switch (action) {
        case "ownPiece":
          createMoveAction({ square, pieceInfo });
          return;
        default:
          resetMoveData();
      }
    }

    if (status === "valid") {
      switch (action) {
        case "drop":
          dropsThePiece({ square, moveAction });
          return;
        case "move":
        case "capture":
          movesThePiece({ square, moveAction, action });
          return;
        default:
          createMoveAction({ square, pieceInfo });
      }
    }
  }

  function selectHandPiece({ kind, turn }) {
    if (gameMatch.turn === turn) {
      const tempShogi = getTempShogi();

      const toggleClick =
        moveAction.dropPiece && moveAction.dropPiece.kind === kind;

      if (toggleClick) {
        resetMoveData();
        return;
      }

      setMoveAction({
        from: null,
        dropPiece: { kind, turn },
        moves: tempShogi.getDropsBy(turn),
      });
    }
  }

  return {
    gameMatch,
    touchTargetTile,
    targetTile,
    moveAction,
    promoteCallback,
    selectHandPiece,
    resetGame,
  };
}
