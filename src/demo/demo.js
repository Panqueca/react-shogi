import React from "react";
import { useState } from "react";
import Match from "../@game_state/match";
import Board from "../components/Board";
import { transformGameStateToBoard } from "../utils/pieces/filter";
import { Button, Modal } from "react-bootstrap";
import { DEFAULT_GAME, getNormalizedGameData } from "../utils/game/match";
import "./demo.css";
import { getDialogInfoByNotificationSlug } from "../utils/game/messages";

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

const Demo = ({ pieceComponents }) => {
  const [game, setGame] = useState(DEFAULT_GAME);
  const [historyActions, setHistoryActions] = useState([]);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState({ from: null });
  const [selectedDropPiece, setSelectedDropPiece] = useState({ id: null });
  const [dialog, setDialog] = useState(defaultDialog);

  function resetMoveData() {
    setMoveAction({ from: null });
    setTargetTile(defaultTargetTile);
    setSelectedDropPiece({ id: null });
  }

  function resetGame() {
    setGame(DEFAULT_GAME);
    setHistoryActions([]);
    resetMoveData();
  }

  function addHistoryAction(newAction, playerNumber) {
    const { data } = newAction;
    let toId = data.toId;

    if (newAction.kind === "drop") toId === data.squareId;

    if (toId)
      setHistoryActions([
        ...historyActions,
        {
          ...newAction,
          data: { ...data, toId },
          playerSide: playerNumber === 2 ? "GOTE" : "SENTE"
        }
      ]);
  }

  function getLastAction() {
    const lastAction = historyActions[historyActions.length - 1] || {};
    const { data = {} } = lastAction;
    return { ...lastAction, ...data };
  }

  function resetDialog() {
    setDialog(defaultDialog);
  }

  const dialogActionCallback = (tempMatch, response) => {
    const { current_player_number } = tempMatch.asJson.game_state;

    if (response === "PROMOTE" || response === "DONT_PROMOTE") {
      if (tempMatch.promotion) {
        tempMatch.touchPromotionOption(
          response === "PROMOTE",
          current_player_number
        );
        addHistoryAction(tempMatch.lastAction, current_player_number);
      }

      const gameData = getNormalizedGameData(tempMatch.asJson);
      setGame(gameData);
    }
  };

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

  function handleMovePiece({ move, y, x, square, pieceInfo }) {
    const tempMatch = new Match(game);
    const { current_player_number } = tempMatch.asJson.game_state;

    const { player_number = null } = pieceInfo || {};
    const samePlayerPiece = player_number === current_player_number;

    if (selectedDropPiece.id) {
      tempMatch.touchPieceInHand(selectedDropPiece.id, current_player_number);
      if (tempMatch.notificationSlug === "PieceSelected") {
        tempMatch.touchSquare(move, current_player_number);
        if (tempMatch.notificationSlug === "DropValid") {
          addHistoryAction(tempMatch.lastAction);
          setGame(tempMatch.asJson);
        }

        resetMoveData();
      }
      return;
    }

    if (!moveAction.from || samePlayerPiece) {
      setMoveAction({ from: move });
      setTargetTile({ x, y, square });
      return;
    }

    if (move === targetTile.square || move === moveAction.from) {
      resetMoveData();
      return;
    }

    setTargetTile({ x, y, square });

    tempMatch.touchSquare(moveAction.from, current_player_number);
    tempMatch.touchSquare(move, current_player_number);

    const { haveNotification } = checkAlertNotification(tempMatch);
    if (haveNotification) return;

    if (tempMatch.notificationSlug === "MoveValid") {
      addHistoryAction(tempMatch.lastAction, current_player_number);
      const gameData = getNormalizedGameData(tempMatch.asJson);
      setGame(gameData);
    }

    setMoveAction({ from: null });
  }

  function selectHandPiece({ pieces, playerNumber }) {
    const { game_state } = game;
    const { current_player_number } = game_state;

    if (current_player_number === playerNumber && pieces && pieces[0]) {
      const { previousId } = pieces[0];
      if (previousId) {
        setSelectedDropPiece({ id: previousId });
        setTargetTile(defaultTargetTile);
      }
    }
  }

  const GAME_STATE = transformGameStateToBoard(game.game_state);
  console.log({ game });

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
      {game && game.id && (
        <Board
          pieces={GAME_STATE.pieces}
          hands={GAME_STATE.hands}
          historyActions={historyActions}
          currentPlayer={game.current_player_number}
          pieceComponents={pieceComponents}
          handleMovePiece={handleMovePiece}
          notification={game.notification}
          lastAction={getLastAction()}
          targetTile={targetTile}
          selectHandPiece={selectHandPiece}
        />
      )}
    </div>
  );
};

export default Demo;
