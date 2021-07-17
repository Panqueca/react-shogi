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

const MatchPage = ({ displayPieces }) => {
  const [dialog, setDialog] = useState(defaultDialog);
  const [effectDialog, setEffectDialog] = useState({
    open: false,
    display: null
  });

  function resetDialog() {
    setDialog(defaultDialog);
  }

  const dialogActionCallback = response => {
    const { turn } = gameMatch;

    if (response === "PROMOTE" || response === "DONT_PROMOTE") {
      console.log("Promote", { turn });
    }

    resetDialog();
  };

  function listenNotification(notificationSlug, turn) {
    const dialogInfo = getDialogInfoByNotificationSlug(
      notificationSlug,
      response => dialogActionCallback({ response, turn })
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

  function checkAlertNotification(tempMatch) {
    const { notificationSlug } = tempMatch;

    const dialogInfo = getDialogInfoByNotificationSlug(
      notificationSlug,
      response => dialogActionCallback(tempMatch, response)
    );

    return false;
  }

  const {
    gameMatch,
    historyActions,
    targetTile,
    touchTargetTile,
    moveAction,
    selectHandPiece,
    getLastAction
  } = useShogiEngine({ listenNotification });

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
    <MatchDisplay>
      {displayDialog()}
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
          effectDialog={effectDialog}
        />
      )}
    </MatchDisplay>
  );
};

export default MatchPage;
