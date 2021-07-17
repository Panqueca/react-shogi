import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";
import { ToggleLeft, ToggleRight } from "react-feather";
import { getSquareByXYBoard } from "../utils/board/display";
import { checkIsPossibleMove } from "../utils/pieces/filter";
import MatchPlayer from "./MatchPlayer";

const MatchDisplay = styled.div`
  padding: 20px;
`;

const blinkTile = keyframes`
0% {
  background-color: rgba(255, 126, 126, 0.4);
}
25% {
  background-color: rgba(255, 126, 126, 0.45);
}
50% {
  background-color: rgba(255, 126, 126, 0.5);
}
75% {
  background-color: rgba(255, 126, 126, 0.45);
}
100% {
  background-color: rgba(255, 126, 126, 0.4);
}
`;

const BoardSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.111%;
  height: 11.111%;
  border: 1px solid #6b5313;
  position: relative;
  animation: ${({ blink }) =>
    blink
      ? css`
          ${blinkTile} 2s infinite
        `
      : "none"};
  div {
    width: 100%;
    height: 100%;
  }

  .square-number {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 12px;
    color: #6b5313;
    font-weight: bold;
    opacity: 0.5;
    padding: 2px;
  }
`;

const ShogiBoard = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 15px;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "100%" }) => height};
  background-color: ${({ squaresColor }) => squaresColor};

  .overlay {
    display: ${({ showOverlay }) => (showOverlay ? "block" : "none")};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1000;
  }
`;

const EffectDialog = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto auto;
  left: 0;
  right: 0;
  z-index: 100;
  top: 0;
  bottom: 0;
`;

const SettingsMenu = styled.div`
  display: block;
  width: 300px;
  height: 200px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10000;
  padding: 15px;
  border: 1px solid #000;

  .title {
    font-weight: bold;
  }

  .option-group {
    padding: 15px 5px;
    .option {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Board = ({
  hands,
  squaresColor,
  handleMovePiece,
  lastAction,
  targetTile,
  selectHandPiece,
  possibleMoves,
  displayPieces,
  board,
  width,
  height,
  effectDialog,
  callSurrender
}) => {
  const [settings, setSettings] = useState({
    open: false,
    showSquareNumbers: true
  });

  function closeDialogs() {
    if (settings.open) setSettings({ ...settings, open: false });
  }

  function toggleSettings() {
    setSettings({ ...settings, open: !settings.open });
  }

  function toggleSettingOption(option) {
    setSettings({ ...settings, [option]: !settings[option] });
  }

  function selectTile({ square, pieceInfo }) {
    handleMovePiece({ square, pieceInfo });
  }

  function getBoardOrderedByRows(matchBoard) {
    const rows = [];

    matchBoard.forEach(colTiles => {
      colTiles.forEach((locationInfo, y) => {
        if (!rows[y]) rows[y] = [];
        rows[y].push(locationInfo);
      });
    });

    return rows;
  }

  const orderedByRows = getBoardOrderedByRows(board);

  const getToogle = (on, toggle) => {
    if (on)
      return (
        <ToggleRight
          color="#008029"
          onClick={() => toggle()}
          style={{ cursor: "pointer" }}
        />
      );
    return (
      <ToggleLeft onClick={() => toggle()} style={{ cursor: "pointer" }} />
    );
  };

  return (
    <MatchDisplay>
      <MatchPlayer
        name="Player 2 (Gote)"
        hands={hands}
        displayPieces={displayPieces}
        showSettings={false}
        playerColorTurn={1}
        selectHandPiece={selectHandPiece}
        width={width}
      />
      <ShogiBoard
        width={width}
        height={height}
        squaresColor={squaresColor}
        showOverlay={settings.open}
      >
        <div className="overlay" onClick={closeDialogs}></div>
        <EffectDialog open={effectDialog.open}>
          {effectDialog.display}
        </EffectDialog>
        {settings.open && (
          <SettingsMenu>
            <div className="title">Settings</div>
            <div className="option-group">
              <div className="group">
                <div className="option">
                  <div>Show Square Numbers</div>{" "}
                  {getToogle(settings.showSquareNumbers, () =>
                    toggleSettingOption("showSquareNumbers")
                  )}
                </div>
              </div>
            </div>
          </SettingsMenu>
        )}
        {displayPieces &&
          orderedByRows.map((rowTiles, y) => {
            if (Array.isArray(rowTiles))
              return rowTiles.map((locationInfo, x) => {
                const { color, kind } = locationInfo || {};
                const {
                  squareNumber,
                  squareName,
                  squareX,
                  squareY,
                  square
                } = getSquareByXYBoard({ x, y });

                const displayKind = kind || "Empty";
                const PieceSelection = displayPieces[displayKind];

                const isPossibleMove = checkIsPossibleMove(
                  { squareX, squareY },
                  possibleMoves
                );

                const isLastAction = lastAction && square === lastAction.square;
                if (isLastAction) console.log({ lastAction, square });

                return (
                  <BoardSquare key={squareNumber} blink={isLastAction}>
                    <PieceSelection
                      y={squareX}
                      x={squareY}
                      squareNumber={squareNumber}
                      squareName={squareName}
                      onClick={() =>
                        selectTile({
                          square,
                          pieceInfo: locationInfo
                        })
                      }
                      isSelected={
                        isPossibleMove || squareName === targetTile.square
                      }
                      player={color === 1 ? 2 : 1}
                    />
                    {settings.showSquareNumbers && (
                      <div className="square-number">{squareNumber}</div>
                    )}
                  </BoardSquare>
                );
              });
          })}
      </ShogiBoard>
      <MatchPlayer
        name="Player 1 (Sente)"
        hands={hands}
        displayPieces={displayPieces}
        playerColorTurn={0}
        toggleSettings={toggleSettings}
        selectHandPiece={selectHandPiece}
        callSurrender={callSurrender}
        width={width}
      />
    </MatchDisplay>
  );
};

Board.propTypes = {
  allowMoves: PropTypes.bool,
  drawLabels: PropTypes.bool,
  squaresColor: PropTypes.string
};

Board.defaultProps = {
  allowMoves: true,
  drawLabels: true,
  squaresColor: "#f4c64e"
};

export default Board;
