import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import socketClient from "socket.io-client";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { useWindowSize } from "../utils/hooks/window";
import { useShogiEngine } from "../utils/game/hooks";
import { getDialogInfoByNotificationSlug } from "../utils/game/messages";
import ElapsedTime from "../components/ElapsedTime";
import { useDialogState } from "../store/dialogs/state";
import { isKingInCheck } from "../utils/game/match";

const defaultDialog = {
  open: false,
  title: "",
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "",
  cancelText: "",
};

const MatchDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WaitDialog = styled.div`
  width: ${({ width }) => width};
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 22px;
  border: 2px solid #000;
`;

const defaultSfen =
  "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";

const io = socketClient(process.env.REACT_APP_SERVER_URL, {
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
    type: "BLITZ_10",
  });
  const [dialog, setDialog] = useState(defaultDialog);
  const [effectDialog, setEffectDialog] = useState({
    open: false,
    display: null,
  });
  const [clocks, setClocks] = useState({
    player1: {
      isRunning: false,
      expireSeconds: null,
    },
    player2: {
      isRunning: false,
      expireSeconds: null,
    },
  });

  const { id: GAME_ID } = useParams();
  const { getAccessTokenSilently, user } = useAuth0();
  const { openNewGame } = useDialogState();

  const { player1, player2 } = gameData;

  const getAuthHeader = async () => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  function getLastMove() {
    const { moves } = gameData;
    if (moves.length > 0) return moves[moves.length - 1];
    return { sfen: defaultSfen, square: null };
  }

  function getLastSfen() {
    return getLastMove().sfen;
  }

  function converteTurnToSide(turn) {
    if (turn === 0) return "SENTE";
    return "GOTE";
  }

  function getClientSideByGame(game) {
    const { player1, player2, status } = game;

    if (status === "SEARCHING" || status === "LOADING") return "SENTE";
    if (player1 && player1.sub === user.sub) return "SENTE";
    if (player2 && player2.sub === user.sub) return "GOTE";
    return null;
  }

  function getClientPlayerSide() {
    return getClientSideByGame(gameData);
  }

  function handleGameUpdate({
    game,
    senteRemainingSeconds,
    goteRemainingSeconds,
  }) {
    const { status, turn } = game;
    const clientSide = getClientSideByGame(game);

    if (status === "STARTED" && clientSide) {
      setClocks({
        currentPlayer: {
          isRunning: converteTurnToSide(turn) === clientSide,
          expireSeconds:
            clientSide === "SENTE"
              ? senteRemainingSeconds
              : goteRemainingSeconds,
        },
        opponentPlayer: {
          isRunning: converteTurnToSide(turn) !== clientSide,
          expireSeconds:
            clientSide === "SENTE"
              ? goteRemainingSeconds
              : senteRemainingSeconds,
        },
      });
    }

    setGameData(game);
  }

  function getPlayerTurnSide() {
    const { turn } = gameData;
    return turn === 0 ? "SENTE" : "GOTE";
  }

  function getOpponent() {
    if (player1 && player1.sub === user.sub) return player2;
    if (player2 && player2.sub === user.sub) return player1;
    return null;
  }

  function checkGameIsMyTurn(game) {
    const { turn } = game;

    return { isMyTurn: getClientPlayerSide() === turn, turn };
  }

  function checkIsMyTurn() {
    return checkGameIsMyTurn(gameData).isMyTurn;
  }

  function checkCheck(game) {
    const { isMyTurn, turn } = checkGameIsMyTurn(game);
    if (isMyTurn && isKingInCheck(game, turn))
      callEffect(getDialogInfoByNotificationSlug("KingInCheck"));
  }

  async function fetchSetGameData() {
    const header = await getAuthHeader();
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/games/find?_id=${GAME_ID}`,
      header,
    );
    const { game, senteRemainingSeconds, goteRemainingSeconds } = response;
    const { _id } = game;

    if (_id) {
      handleGameUpdate({ game, senteRemainingSeconds, goteRemainingSeconds });
      checkCheck(game);
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
      (response) => dialogActionCallback(response, params),
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

  async function saveGameMove({ sfen, squareX, squareY, kind }) {
    if (gameData.status === "STARTED") {
      const header = await getAuthHeader();

      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/games/saveMove`,
        {
          _id: GAME_ID,
          sfen,
          squareX,
          squareY,
          kind,
        },
        header,
      );
    }
  }

  const {
    gameMatch,
    targetTile,
    touchTargetTile,
    moveAction,
    selectHandPiece,
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
          `${process.env.REACT_APP_SERVER_URL}/games/resign`,
          {
            _id: GAME_ID,
          },
          header,
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

  const { boardSize } = useWindowSize();

  useEffect(() => {
    if (gameData.status === "STARTED") {
      const dialogInfo = getDialogInfoByNotificationSlug(
        checkIsMyTurn() ? "YOUR_TURN" : "OPPONENT_TURN",
      );
      if (dialogInfo.type) callEffect({ ...dialogInfo });
    }
  }, [gameData.status]);

  useEffect(() => {
    io.on("GAME_FOUND", ({ _id }) => {
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

  const currentPlayerSide = getClientPlayerSide();
  const opponentPlayer = getOpponent();
  const lastMove = getLastMove();
  const isMyTurn = checkIsMyTurn();

  return (
    <MatchDisplay>
      {displayDialog()}
      {gameData.status === "SEARCHING" && (
        <WaitDialog width={boardSize}>
          ...You are waiting for an opponent
          <br />
          <ElapsedTime />
        </WaitDialog>
      )}
      {gameData.status === "FINISHED" && (
        <WaitDialog width={boardSize}>
          Match Finished! {gameData.winner} won.{" "}
          <Button onClick={openNewGame}>New Game</Button>
        </WaitDialog>
      )}
      {gameMatch && (
        <Board
          hands={gameMatch.hands}
          board={gameMatch.board}
          handleMovePiece={touchTargetTile}
          possibleMoves={moveAction.moves}
          selectHandPiece={selectHandPiece}
          targetTile={targetTile}
          lastMove={lastMove}
          width={boardSize}
          height={boardSize}
          effectDialog={effectDialog}
          callSurrender={callSurrender}
          currentPlayer={user}
          currentPlayerSide={currentPlayerSide}
          currentTurnPlayer={getPlayerTurnSide()}
          opponentPlayer={opponentPlayer}
          isMyTurn={isMyTurn}
          isGameRunning={gameData.status === "STARTED"}
          clocks={clocks}
          fetchSetGameData={fetchSetGameData}
          loading={gameData.status === "LOADING"}
        />
      )}
    </MatchDisplay>
  );
};

export default LiveMatch;
