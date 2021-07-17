import { useState } from "react";
import { Shogi } from "shogi.js";
import { getMoveAction, isKingInCheck } from "./match";
import { defaultTargetTile, defaultMoveAction } from "./defaults";
import {
  getSquareByInternationalSlug,
  getSquareInfoByXY
} from "../board/display";

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

  function updateGameMatch(newGame) {
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

  function createMoveAction({ square }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);
    console.log({ square, squareX, squareY }, "A");

    setMoveAction({
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

  function movesThePiece({ moveAction, square, kind }) {
    const tempShogi = getTempShogi();
    const { squareX, squareY } = getSquareByInternationalSlug(square);
    const { turn } = gameMatch;

    console.log({ moveAction });

    tempShogi.move(
      moveAction.from.squareX,
      moveAction.from.squareY,
      squareX,
      squareY
    );

    const opponnetColor = turn === 0 ? 1 : 0;

    if (isKingInCheck(tempShogi, turn)) {
      resetMoveData();
      listenNotification("KingInCheck");
      return;
    }

    if (isKingInCheck(tempShogi, opponnetColor)) {
      listenNotification("OpponentKingInCheck");
    }

    updateGameMatch(tempShogi);
    addHistoryAction({ kind, turn, to: { squareX, squareY } });
  }

  function touchTargetTile({ square, pieceInfo }) {
    console.log({ square });

    const { turn } = gameMatch;
    const { color } = pieceInfo || {};

    const [status, kind] = getMoveAction({
      square,
      moveAction,
      turn,
      color
    }).split(":");
    console.log({ status, kind });

    if (status === "invalid") {
      switch (kind) {
        case "ownPiece":
          createMoveAction({ square });
          return;
        default:
          resetMoveData();
      }
    }

    if (status === "valid") {
      switch (kind) {
        case "drop":
          dropsThePiece({ square, moveAction });
          return;
        case "move":
        case "capture":
          movesThePiece({ square, moveAction, kind });
          return;
        default:
          createMoveAction({ square });
      }
    }
  }

  function selectHandPiece({ kind, turn }) {
    if (gameMatch.turn === turn) {
      const tempShogi = getTempShogi();

      console.log({ kind });
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
    getLastAction,
    selectHandPiece,
    resetGame
  };
}
