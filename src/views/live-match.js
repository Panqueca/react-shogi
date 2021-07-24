import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import socketClient from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";
import Board from "../components/Board";
import { useWindowSize } from "../utils/hooks/window";
import { useShogiEngine } from "../utils/game/hooks";
import { getDialogInfoByNotificationSlug } from "../utils/game/messages";
import ElapsedTime from "../components/ElapsedTime";

const defaultDialog = {
  open: false,
  title: "",
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "",
  cancelText: "",
};

const MatchDisplay = styled.div``;

const WaitDialog = styled.div`
  position: absolute;
  width: ${({ width }) => width};
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 22px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  height: 100px;
  top: 125px;
  border: 2px solid #000;
`;

const defaultSfen =
  "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";

const io = socketClient("http://localhost:6060", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false, // [2] Please don't set this to true
  upgrade: false,
  rejectUnauthorized: false,
});

const LiveMatch = () => {
  const [gameData, setGameData] = useState({
    _id: null,
    winner: null,
    moves: [],
    status: "LOADING",
    increment: 0,
    type: "BLITZ",
  });
  const [dialog, setDialog] = useState(defaultDialog);
  const [effectDialog, setEffectDialog] = useState({
    open: false,
    display: null,
  });

  const history = useHistory();
  const { id: GAME_ID } = useParams();
  const { getAccessTokenSilently, user } = useAuth0();

  const { player1, player2 } = gameData;

  const getAuthHeader = async () => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  function getLastSfen() {
    const { moves } = gameData;
    if (moves.length > 0) return moves[moves.length - 1].sfen;
    return defaultSfen;
  }

  async function fetchSetGameData() {
    const header = await getAuthHeader();
    const { data: response } = await axios.get(
      `http://localhost:6060/games/find?_id=${GAME_ID}`,
      header
    );
    const { _id } = response;

    if (_id) {
      setGameData(response);
    }
  }

  useEffect(() => {
    fetchSetGameData();
  }, []);

  function getPlayerTurnSide() {
    const { turn } = gameData;
    return turn === 0 ? "SENTE" : "GOTE";
  }

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
      (response) => dialogActionCallback(response, params)
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
        },
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
      const header = await getAuthHeader();

      await axios.post(
        "http://localhost:6060/games/saveMove",
        {
          _id: GAME_ID,
          sfen,
        },
        header
      );
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
    resetGame,
  } = useShogiEngine({
    listenNotification,
    saveGameMove,
    sfenPosition: getLastSfen(),
  });

  function callSurrender() {
    setDialog({
      open: true,
      title: "Are you shure you want to resign?",
      onConfirm: async () => {
        resetGame();
        resetDialog();

        const header = await getAuthHeader();
        await axios.post(
          "http://localhost:6060/games/resign",
          {
            _id: GAME_ID,
          },
          header
        );
      },
      onCancel: resetDialog,
      confirmText: "Resign",
      cancelText: "Cancel",
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
  const size = `${vh * 0.8 - 150}px`;

  useEffect(() => {
    io.on("GAME_FOUND", ({ _id }) => {
      console.log("GAME_FOUND");
      if (GAME_ID === _id) {
        const dialogInfo = getDialogInfoByNotificationSlug("GAME_FOUND");
        if (dialogInfo.type) callEffect({ ...dialogInfo });
        fetchSetGameData();
        resetGame();
      }
    });

    io.on("connect_error", (err) => {
      console.log("connect_error", { err });
    });

    io.on("GAME_UPDATE", ({ _id }) => {
      console.log("GAME_UPDATE");
      if (GAME_ID === _id) fetchSetGameData();
    });

    io.on("GAME_FINISHED", ({ _id }) => {
      console.log("GAME_UPDATE");
      if (GAME_ID === _id) {
        fetchSetGameData();
      }
    });
  }, []);

  function getClientPlayerSide() {
    if (gameData.status !== "STARTED") return null;
    if (player1.sub === user.sub) return "SENTE";
    if (player2.sub === user.sub) return "GOTE";
    return null;
  }

  function getOpponent() {
    if (player1 && player1.sub === user.sub) return player2;
    if (player2 && player2.sub === user.sub) return player1;
    return null;
  }

  const currentPlayerSide = getClientPlayerSide();
  const opponentPlayer = getOpponent();

  return (
    <MatchDisplay>
      {displayDialog()}
      {gameData.status === "STARTED" && (
        <WaitDialog width={size}>
          {`Turn: ${
            gameData.turn === 0 ? "SENTE" : "GOTE"
          }, Client: ${currentPlayerSide}`}
        </WaitDialog>
      )}
      {gameData.status === "SEARCHING" && (
        <WaitDialog width={size}>
          ...You are waiting for an opponent
          <br />
          <ElapsedTime />
        </WaitDialog>
      )}
      {gameData.status === "FINISHED" && (
        <WaitDialog width={size}>
          Match Finished! {gameData.winner} won.{" "}
          <Button onClick={() => history.push("/wait-game")}>New Game</Button>
        </WaitDialog>
      )}
      {gameData.status !== "LOADING" && gameMatch && (
        <Board
          hands={gameMatch.hands}
          board={gameMatch.board}
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
          currentPlayer={user}
          currentPlayerSide={currentPlayerSide}
          currentTurnPlayer={getPlayerTurnSide()}
          opponentPlayer={opponentPlayer}
        />
      )}
    </MatchDisplay>
  );
};

export default LiveMatch;
