import React from "react";
import { useState } from "react";
import { Shogi } from "shogi.js";
import { Button, Modal } from "react-bootstrap";
import "./demo.css";
import Board from "../components/Board";
import { DEFAULT_GAME, getNormalizedGameData } from "../utils/game/match";
import { checkIsPossibleMove } from "../utils/pieces/filter";
import { getSquareByInternationalSlug } from "../utils/board/display";
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

const shogi = new Shogi();

const MatchPage = ({ displayPieces }) => {
  shogi.initialize();

  const [gameMatch, setGameMatch] = useState(shogi);
  const [historyActions, setHistoryActions] = useState([]);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState({ from: null, moves: [] });
  const [selectedDropPiece, setSelectedDropPiece] = useState({ id: null });
  const [dialog, setDialog] = useState(defaultDialog);

  function resetMoveData() {
    setMoveAction({ from: null });
    setTargetTile(defaultTargetTile);
    setSelectedDropPiece({ id: null });
  }

  function resetGame() {
    setGameMatch(DEFAULT_GAME);
    setHistoryActions([]);
    resetMoveData();
  }

  function updateGameMatch(newGame) {
    setGameMatch(newGame);
    resetMoveData();
  }

  function addHistoryAction(newAction, turn) {
    const { data } = newAction;
    let toId = data.toId;

    if (newAction.kind === "drop") toId === data.squareId;

    if (toId)
      setHistoryActions([
        ...historyActions,
        {
          ...newAction,
          data: { ...data, toId },
          playerSide: turn === 2 ? "GOTE" : "SENTE"
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
      setGameMatch(gameData);
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

  function touchTargetTile({ x, y, square, pieceInfo }) {
    const tempShogi = new Shogi();
    tempShogi.initializeFromSFENString(gameMatch.toSFENString());

    const { squareX, squareY } = getSquareByInternationalSlug(square);

    const { color: piecePlayer } = pieceInfo || {};
    const samePlayerPiece = piecePlayer === "current_player_number";
    const isOpponentPiece = piecePlayer === "current_player_number";

    if (!moveAction.from || samePlayerPiece) {
      setMoveAction({
        from: { squareX, squareY, square },
        moves: tempShogi.getMovesFrom(squareX, squareY)
      });
      setTargetTile({ x, y, square });
      return;
    }

    if (isOpponentPiece) {
      resetMoveData();
      return;
    }

    if (checkIsPossibleMove({ squareX, squareY }, moveAction.moves)) {
      tempShogi.move(
        moveAction.from.squareX,
        moveAction.from.squareY,
        squareX,
        squareY
      );
      console.log({ tempShogi });
      updateGameMatch(tempShogi);
    }
  }

  function handleMovePiece({ move, y, x, square, pieceInfo }) {
    return;
    /* 
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
      touchTargetTile({ x, y, square });
      return;
    }

    if (move === targetTile.square || move === moveAction.from) {
      resetMoveData();
      return;
    }

    touchTargetTile({ x, y, square });

    tempMatch.touchSquare(moveAction.from, current_player_number);
    tempMatch.touchSquare(move, current_player_number);
    console.log({ moveAction, move });
    const {
      squareX: fromSquareX,
      squareY: fromSquareY
    } = getSquareByInternationalSlug(moveAction.from);
    const {
      squareX: toSquareX,
      squareY: toSquareY
    } = getSquareByInternationalSlug(move);
    console.log(fromSquareX, fromSquareY, toSquareX, toSquareY);
    shogi.move(fromSquareX, fromSquareY, toSquareX, toSquareY);
    console.log({ shogi });

    const { haveNotification } = checkAlertNotification(tempMatch);
    if (haveNotification) return;

    if (tempMatch.notificationSlug === "MoveValid") {
      addHistoryAction(tempMatch.lastAction, current_player_number);
      const gameData = getNormalizedGameData(tempMatch.asJson);
      updateGameMatch(gameData);
    }

    setMoveAction({ from: null }); */
  }

  function selectHandPiece({ pieces, turn }) {
    if (gameMatch.turn === turn && pieces && pieces[0]) {
      const { previousId } = pieces[0];
      if (previousId) {
        setSelectedDropPiece({ id: previousId });
        touchTargetTile(defaultTargetTile);
      }
    }
  }

  console.log({ gameMatch, moveAction });

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
        />
      )}
    </div>
  );
};

export default MatchPage;
