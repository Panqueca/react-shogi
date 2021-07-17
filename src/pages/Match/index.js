import React from "react";
import { useState } from "react";
import { Shogi } from "shogi.js";
import { Button, Modal } from "react-bootstrap";
import "./style.css";
import Board from "../../components/Board";
import { getSquareByInternationalSlug } from "../../utils/board/display";
import { getDialogInfoByNotificationSlug } from "../../utils/game/messages";
import { getMoveAction, isKingInCheck } from "../../utils/game/match";
import { useWindowSize } from "../../utils/hooks/window";

const defaultTargetTile = {
  square: null,
  x: null,
  y: null
};

const defaultDialog = {
  open: false,
  title: "",
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "",
  cancelText: ""
};

const defaultMoveAction = { from: null, dropPiece: null, moves: [] };

const shogi = new Shogi();

const MatchPage = ({ displayPieces }) => {
  shogi.initialize();

  const [gameMatch, setGameMatch] = useState(shogi);
  const [historyActions, setHistoryActions] = useState([]);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState(defaultMoveAction);
  const [dialog, setDialog] = useState(defaultDialog);

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
          to
        }
      ]);
  }

  function checkAlertNotification(tempMatch) {
    const { notificationSlug } = tempMatch;

    const dialogInfo = getDialogInfoByNotificationSlug(
      notificationSlug,
      response => dialogActionCallback(tempMatch, response)
    );
    const { onConfirm, onCancel } = dialogInfo;

    if (dialogInfo.title) {
      setDialog({
        ...dialogInfo,
        open: true,
        onConfirm: () => {
          onConfirm();
          resetDialog();
        },
        onCancel: () => {
          onCancel();
          resetDialog();
        }
      });
      return true;
    }

    return false;
  }

  function getLastAction() {
    const lastAction = historyActions[historyActions.length - 1] || {};
    const { data = {} } = lastAction;
    return { ...lastAction, ...data };
  }

  function resetDialog() {
    setDialog(defaultDialog);
  }

  const dialogActionCallback = response => {
    const { turn } = gameMatch;

    if (response === "PROMOTE" || response === "DONT_PROMOTE") {
      console.log("Promote", { turn });
    }
  };

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

    if (isKingInCheck(tempShogi, gameMatch.turn)) {
      resetMoveData();
      alert("King in check");
      return;
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

  //console.log({ gameMatch, moveAction });

  function displayDialog() {
    return (
      <Modal show={dialog.open} onHide={() => {}} size="sm" centered>
        <Modal.Header>
          <Modal.Title>{dialog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dialog.body && dialog.body}</Modal.Body>
        <Modal.Footer>
          {dialog.cancelText && (
            <Button variant="secondary" onClick={dialog.onCancel}>
              {dialog.cancelText}
            </Button>
          )}
          {dialog.confirmText && (
            <Button variant="primary" onClick={dialog.onConfirm}>
              {dialog.confirmText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }

  console.log({ gameMatch, historyActions });

  const { vh } = useWindowSize();

  return (
    <div className="demo">
      <div>
        {displayDialog()}
        <div className="board-head-actions">
          <Button variant="primary">Render-se</Button>
          <Button variant="primary" onClick={resetGame}>
            Reset
          </Button>
        </div>
      </div>
      {gameMatch && (
        <Board
          hands={gameMatch.hands}
          board={gameMatch.board}
          currentPlayer={gameMatch.turn}
          displayPieces={displayPieces}
          handleMovePiece={touchTargetTile}
          possibleMoves={moveAction.moves}
          selectHandPiece={selectHandPiece}
          targetTile={targetTile}
          lastAction={getLastAction()}
          historyActions={historyActions}
          width={`${vh * 0.8}px`}
          height={`${vh * 0.8}px`}
        />
      )}
    </div>
  );
};

export default MatchPage;
