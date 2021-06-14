import React from "react";
import { useState } from "react";
import Match from "../@game_state/match";
import Board from "../components/Board";
import { transformGameStateToBoard } from "../utils/pieces/filter";
import { Button } from "react-bootstrap";
import { DEFAULT_GAME } from "../utils/game/match";
import "./demo.css";

const defaultTargetTile = {
  square: null,
  x: null,
  y: null
};

const Demo = ({ pieceComponents }) => {
  const [game, setGame] = useState(DEFAULT_GAME);
  const [historyActions, setHistoryActions] = useState([]);
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const [moveAction, setMoveAction] = useState({ from: null });

  function addHistoryAction(newAction, playerNumber) {
    if (newAction)
      setHistoryActions([
        ...historyActions,
        { ...newAction, playerSide: playerNumber === 2 ? "GOTE" : "SENTE" }
      ]);
  }

  function getLastAction() {
    const lastAction = historyActions[historyActions.length - 1] || {};
    const { data = {} } = lastAction;
    return { ...lastAction, ...data };
  }

  function handleMovePiece({ move, y, x, square, pieceInfo }) {
    const tempMatch = new Match(game);
    const { current_player_number } = tempMatch.asJson.game_state;

    if (move === targetTile.square) {
      setTargetTile(defaultTargetTile);
      setMoveAction({ from: null });
      return;
    }

    const { player_number = null } = pieceInfo || {};
    const samePlayerPiece = player_number === current_player_number;

    if (!moveAction.from || samePlayerPiece) {
      setMoveAction({ from: move });
      setTargetTile({ x, y, square });
      return;
    }

    if (move === targetTile.square || move === moveAction.from) {
      setTargetTile(defaultTargetTile);
      setMoveAction({ from: null });
      return;
    }

    setTargetTile({ x, y, square });

    tempMatch.touchSquare(moveAction.from, current_player_number);
    tempMatch.touchSquare(move, current_player_number);
    console.log({ tempMatch });

    if (
      tempMatch.notificationSlug === "MoveValid" ||
      tempMatch.notificationSlug === "PieceMovedToPromotionZone"
    ) {
      addHistoryAction(tempMatch.lastAction, current_player_number);

      if (tempMatch.promotion) {
        tempMatch.touchPromotionOption(true, current_player_number);
        console.log("Promotion: ", { tempMatch });
        addHistoryAction(tempMatch.lastAction, current_player_number);
      }

      setGame(tempMatch.asJson);
    }

    setMoveAction({ from: null });
  }

  function resetGame() {
    setGame(DEFAULT_GAME);
    setHistoryActions([]);
    setMoveAction({ from: null });
    setTargetTile(defaultTargetTile);
  }

  const GAME_STATE = transformGameStateToBoard(game.game_state);

  return (
    <div className="demo">
      <div>
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
        />
      )}
    </div>
  );
};

export default Demo;
