import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import socketClient from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";
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

const WaitDialog = styled.div`
  position: fixed;
  width: ${({ width }) => width};
  padding: 20px;
  background-color: #fff;
  font-size: 22px;
  top: 0px;
  left: 0;
  right: 0;
  margin: auto auto;
  z-index: 100;
  display: flex;
  justify-content: space-between;
`;

const defaultSfen =
  "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";

const io = socketClient("http://localhost:9000");

const MatchPage = () => {
  const [gameData, setGameData] = useState({
    _id: null,
    winner: null,
    moves: [],
    status: "LOADING",
    increment: 0,
    type: "BLITZ"
  });
  const [dialog, setDialog] = useState(defaultDialog);
  const [effectDialog, setEffectDialog] = useState({
    open: false,
    display: null
  });

  const history = useHistory();
  const { id: GAME_ID } = useParams();

  function getLastSfen() {
    const { moves } = gameData;
    if (moves.length > 0) return moves[moves.length - 1].sfen;
    return defaultSfen;
  }

  async function fetchSetGameData() {
    const { data: response } = await axios.get(
      `http://localhost:9000/games/find?_id=${GAME_ID}`
    );
    const { _id } = response;

    if (_id) {
      setGameData(response);
    }
  }

  useEffect(() => {
    fetchSetGameData();
  }, []);

  function resetDialog() {
    setDialog(defaultDialog);
  }

  function callEffect({ display, delay }) {
    setEffectDialog({ open: true, display });
    setTimeout(() => {
      setEffectDialog({ open: false, display: null });
    }, delay);
  }

  function dialogActionCallback(response, params) {
    if (response === "PROMOTE" || response === "DONT_PROMOTE") {
      const { promote } = params;
      promote(response === "PROMOTE");
    }

    resetDialog();
  }

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
      callEffect({ display, delay });
    }
  }

  async function saveGameMove(sfen) {
    console.log("saveGameMove", { sfen });
    if (gameData.status === "STARTED") {
      await axios.post("http://localhost:9000/games/saveMove", {
        _id: GAME_ID,
        sfen
      });
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
  } = useShogiEngine({
    listenNotification,
    saveGameMove,
    sfenPosition: getLastSfen()
  });

  function callSurrender() {
    setDialog({
      open: true,
      title: "Are you shure you want to resign?",
      onConfirm: async () => {
        resetGame();
        resetDialog();
        await axios.post("http://localhost:9000/games/resign", {
          _id: GAME_ID,
          resignSide: "SENTE"
        });

        history.push(`/game/history/${GAME_ID}`);
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
  const size = `${vh * 0.8}px`;

  useEffect(() => {
    io.on("GAME_FOUND", ({ _id }) => {
      if (GAME_ID === _id) {
        const dialogInfo = getDialogInfoByNotificationSlug("GAME_FOUND");
        if (dialogInfo.type) callEffect({ ...dialogInfo });
        fetchSetGameData();
        resetGame();
      }
    });

    io.on("GAME_UPDATE", ({ _id }) => {
      console.log("GAME_UPDATE");
      if (GAME_ID === _id) fetchSetGameData();
    });

    io.on("GAME_FINISHED", ({ _id }) => {
      if (GAME_ID === _id) {
        fetchSetGameData();
      }
    });
  }, []);

  return (
    <MatchDisplay>
      {displayDialog()}
      {gameData.status === "FINISHED" && (
        <WaitDialog width={size}>
          Match Finished! {gameData.winner} won.{" "}
          <Button onClick={() => history.push("/waitGame")}>New Game</Button>
        </WaitDialog>
      )}
      {gameData.status === "SEARCHING" && (
        <WaitDialog width={size}>You are waiting for an opponent</WaitDialog>
      )}
      {gameData.status !== "LOADING" && gameMatch && (
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
          width={size}
          height={size}
          effectDialog={effectDialog}
          callSurrender={callSurrender}
        />
      )}
    </MatchDisplay>
  );
};

export default MatchPage;
