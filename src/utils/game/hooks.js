import { useState } from "react";
import { Shogi } from "shogi.js";
import { getMoveAction, isKingInCheck, isPieceOnEnemyCamp } from "./match";
import { defaultTargetTile, defaultMoveAction } from "./defaults";
import {
  getSquareByInternationalSlug,
  getSquareInfoByXY
} from "../board/display";
import { canPromoteByKind } from "../pieces/constants";

const shogi = new Shogi();

export function useShogiEngine({ listenNotification }) {
  shogi.initialize();

  const [gameMatch, setGameMatch] = useState(shogi);
  const [historyActions, setHistoryActions] = useState([]);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState(defaultMoveAction);

  function getTempShogi() {
    const tempShogi = new Shogi();
    tempShogi.initializeFromSFENString(gameMatch.toSFENString());
    return tempShogi;
  }

  function resetMoveData() {
    setMoveAction(defaultMoveAction);
    setTargetTile(defaultTargetTile);
  }

  function resetGame() {
    setGameMatch(shogi);
    setHistoryActions([]);
    resetMoveData();
  }

  function checkOpponentCheck(tempShogi, turn) {
    const opponnetColor = turn === 0 ? 1 : 0;

    if (isKingInCheck(tempShogi, opponnetColor))
      listenNotification("OpponentKingInCheck");
  }

  function updateGameMatch(newGame) {
    const { turn } = gameMatch;
    checkOpponentCheck(newGame, turn);
    setGameMatch(newGame);
    resetMoveData();
  }

  function addHistoryAction({ kind, turn, to }) {
    if (to)
      setHistoryActions([
        ...historyActions,
        {
          kind,
          turn,
          to,
          square: getSquareInfoByXY({ x: to.squareX, y: to.squareY }).name
        }
      ]);
  }

  function getLastAction() {
    const lastAction = historyActions[historyActions.length - 1] || {};
    return lastAction;
  }

  function createMoveAction({ square, pieceInfo }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);

    setMoveAction({
      pieceInfo,
      from: { squareX, squareY, square },
      moves: tempShogi.getMovesFrom(squareX, squareY)
    });
    setTargetTile({ squareX, squareY, square });
  }

  function dropsThePiece({ square, moveAction }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);
    const { turn } = gameMatch;

    const { dropPiece } = moveAction;
    const { kind: dropKind, turn: dropTurn } = dropPiece || {};

    tempShogi.drop(squareX, squareY, dropKind, dropTurn);
    updateGameMatch(tempShogi);
    addHistoryAction({ kind: "drop", turn, to: { squareX, squareY } });
  }

  function promoteCallback({ from, to, promote }) {
    const tempShogi = getTempShogi();
    const { turn } = gameMatch;

    tempShogi.move(from.squareX, from.squareY, to.squareX, to.squareY, promote);
    updateGameMatch(tempShogi);
    addHistoryAction({
      kind: promote ? "promote" : "move",
      turn,
      to
    });
  }

  function checkCanPromote({ turn, fromSquareY, toSquareY, kind }) {
    const onEnemyCamp = isPieceOnEnemyCamp({
      turn,
      squareY: fromSquareY
    });
    const movedToEnemyCamp = isPieceOnEnemyCamp({ turn, squareY: toSquareY });

    return (onEnemyCamp || movedToEnemyCamp) && canPromoteByKind(kind);
  }

  function movesThePiece({ moveAction, square, action }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);
    const { turn } = gameMatch;
    const { from, pieceInfo } = moveAction;

    tempShogi.move(from.squareX, from.squareY, squareX, squareY);

    const canPromote = checkCanPromote({
      turn,
      fromSquareY: from.squareY,
      toSquareY: squareY,
      kind: pieceInfo.kind
    });

    if (isKingInCheck(tempShogi, turn)) {
      resetMoveData();
      listenNotification("KingInCheck");
      return;
    }

    if (canPromote) {
      listenNotification("PieceMovedToPromotionZone", {
        promote: promoteOption =>
          promoteCallback({
            from,
            to: { squareX, squareY },
            promote: promoteOption
          })
      });
      return;
    }

    updateGameMatch(tempShogi);
    addHistoryAction({ action, turn, to: { squareX, squareY } });
  }

  function touchTargetTile({ square, pieceInfo }) {
    const { turn } = gameMatch;
    const { color } = pieceInfo || {};

    const [status, action] = getMoveAction({
      square,
      moveAction,
      turn,
      color
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
        moves: tempShogi.getDropsBy(turn)
      });
    }
  }

  return {
    gameMatch,
    historyActions,
    touchTargetTile,
    targetTile,
    moveAction,
    promoteCallback,
    getLastAction,
    selectHandPiece,
    resetGame
  };
}
