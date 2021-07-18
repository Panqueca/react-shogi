import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import "./style.css";
import Board from "../../components/Board";
import { useWindowSize } from "../../utils/hooks/window";
import { useShogiEngine } from "../../utils/game/hooks";
import { getDialogInfoByNotificationSlug } from "../../utils/game/messages";

const defaultDialog = {
  open: false,
  title: "",
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "",
  cancelText: ""
};

const MatchDisplay = styled.div``;

const MatchPage = () => {
  const [dialog, setDialog] = useState(defaultDialog);
  const [effectDialog, setEffectDialog] = useState({
    open: false,
    display: null
  });

  function resetDialog() {
    setDialog(defaultDialog);
  }

  const dialogActionCallback = (response, params) => {
    if (response === "PROMOTE" || response === "DONT_PROMOTE") {
      const { promote } = params;
      promote(response === "PROMOTE");
    }

    resetDialog();
  };

  function listenNotification(notificationSlug, params) {
    const dialogInfo = getDialogInfoByNotificationSlug(
      notificationSlug,
      response => dialogActionCallback(response, params)
    );

    const { type, onConfirm, onCancel } = dialogInfo;

    if (type === "dialog") {
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
    }

    const { display, delay = 500 } = dialogInfo;

    if (type === "effect") {
      setEffectDialog({ open: true, display });
      setTimeout(() => {
        setEffectDialog({ open: false, display: null });
      }, delay);
    }
  }

  const {
    gameMatch,
    historyActions,
    targetTile,
    touchTargetTile,
    moveAction,
    selectHandPiece,
    getLastAction,
    resetGame
  } = useShogiEngine({ listenNotification });

  function callSurrender() {
    setDialog({
      open: true,
      title: "Are you shure you want to resign?",
      onConfirm: () => {
        resetGame();
        resetDialog();
      },
      onCancel: resetDialog,
      confirmText: "Resign",
      cancelText: "Cancel"
    });
  }

  function displayDialog() {
    return (
      <Modal show={dialog.open} onHide={() => {}} size="sm" centered>
        <Modal.Header>
          <Modal.Title>{dialog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dialog.body && dialog.body}</Modal.Body>
        <Modal.Footer>
          {dialog.cancelText && (
            <Button
              variant="secondary"
              onClick={dialog.onCancel}
              data-cy="match-cancel-dialog-btn"
            >
              {dialog.cancelText}
            </Button>
          )}
          {dialog.confirmText && (
            <Button
              variant="primary"
              onClick={dialog.onConfirm}
              data-cy="match-confirm-dialog-btn"
            >
              {dialog.confirmText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }

  const { vh } = useWindowSize();

  return (
    <MatchDisplay>
      {displayDialog()}
      {gameMatch && (
        <Board
          hands={gameMatch.hands}
          board={gameMatch.board}
          currentPlayer={gameMatch.turn}
          handleMovePiece={touchTargetTile}
          possibleMoves={moveAction.moves}
          selectHandPiece={selectHandPiece}
          targetTile={targetTile}
          lastAction={getLastAction()}
          historyActions={historyActions}
          width={`${vh * 0.8}px`}
          height={`${vh * 0.8}px`}
          effectDialog={effectDialog}
          callSurrender={callSurrender}
        />
      )}
    </MatchDisplay>
  );
};

export default MatchPage;
