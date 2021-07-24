import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";
import { ToggleLeft, ToggleRight } from "react-feather";
import { getSquareByXYBoard } from "../../utils/board/display";
import { checkIsPossibleMove } from "../../utils/pieces/filter";
import MatchPlayer from "../MatchPlayer";
import { useSkinState } from "../../store/skin/state";

const MatchDisplay = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const blinkTile = keyframes`
0% {
  background-color: rgba(255, 126, 126, 0.3);
}
25% {
  background-color: rgba(255, 126, 126, 0.4);
}
50% {
  background-color: rgba(255, 126, 126, 0.5);
}
75% {
  background-color: rgba(255, 126, 126, 0.4);
}
100% {
  background-color: rgba(255, 126, 126, 0.3);
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
  margin: 0;
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

const Select = styled.select`
  font-size: 11px;
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

  .group {
    padding: 10px 5px;
    .option {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Board = ({
  hands,
  handleMovePiece,
  lastMove,
  targetTile,
  selectHandPiece,
  possibleMoves,
  board,
  width,
  height,
  effectDialog,
  callSurrender,
  currentPlayerSide,
  currentPlayer,
  opponentPlayer,
  currentTurnPlayer,
  isMyTurn,
  isGameRunning,
}) => {
  const { skin, displayPieces, changeSkin, boardConfig } = useSkinState();
  const { squaresColor, pieceViewBox } = boardConfig;

  const [settings, setSettings] = useState({
    open: false,
    showSquareNumbers: true,
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
    if (currentTurnPlayer === currentPlayerSide)
      handleMovePiece({ square, pieceInfo });
  }

  function updateSkin(e) {
    changeSkin(e.target.value);
  }

  function getOrderedColTiles(colTiles) {
    return colTiles.map((pieceInfo, y) => {
      return { pieceInfo, y };
    });
  }

  function getBoardOrderedByRows(matchBoard) {
    const isGote = currentPlayerSide === "GOTE";

    const orderedBoardPositions = matchBoard
      .map((colTiles, x) => {
        return {
          colTiles: getOrderedColTiles(colTiles),
          x,
        };
      })
      .reverse();

    const byCols = isGote
      ? orderedBoardPositions
      : orderedBoardPositions.reverse();

    const rows = [];
    byCols.forEach(({ colTiles, x }) => {
      colTiles.forEach(({ pieceInfo, y }) => {
        rows[y] = rows[y] || [];
        rows[y].push({ pieceInfo, y, x });
      });
    });

    const byRows = isGote ? rows.reverse() : rows;
    return byRows;
  }

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

  const orderedByRows = getBoardOrderedByRows(board);

  console.log({ opponentPlayer });

  return (
    <MatchDisplay>
      <MatchPlayer
        name={opponentPlayer && opponentPlayer.nickname}
        picture={opponentPlayer && opponentPlayer.picture}
        hands={hands}
        displayPieces={displayPieces}
        showSettings={false}
        playerColorTurn={currentPlayerSide === "SENTE" ? 1 : 0}
        selectHandPiece={selectHandPiece}
        width={width}
        viewBox={pieceViewBox.hand}
        hide={!opponentPlayer}
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
              <div className="group">
                <div className="option">
                  <div>Skin Options</div>{" "}
                  <Select onChange={updateSkin} value={skin}>
                    <option value="skin_1">3D Light Skin</option>
                    <option value="skin_2">Red Kanji Wood</option>
                  </Select>
                </div>
              </div>
            </div>
          </SettingsMenu>
        )}
        {displayPieces &&
          orderedByRows.map((rowTiles) => {
            if (Array.isArray(rowTiles)) {
              return rowTiles.map(({ pieceInfo, x, y }) => {
                const { color, kind } = pieceInfo || {};
                const { squareNumber, squareName, squareX, squareY, square } =
                  getSquareByXYBoard({ x, y });

                const displayKind = kind || "Empty";
                const PieceSelection = displayPieces[displayKind];

                const isPossibleMove = checkIsPossibleMove(
                  { squareX, squareY },
                  possibleMoves
                );

                const isPreviousMove =
                  lastMove &&
                  lastMove.squareX === squareX &&
                  lastMove.squareY === squareY;

                return (
                  <BoardSquare key={squareNumber} blink={isPreviousMove}>
                    <PieceSelection
                      y={squareX}
                      x={squareY}
                      squareNumber={squareNumber}
                      squareName={squareName}
                      onClick={() =>
                        selectTile({
                          square,
                          pieceInfo,
                        })
                      }
                      isSelected={
                        isPossibleMove || squareName === targetTile.square
                      }
                      player={color === 1 ? 2 : 1}
                      transform={
                        currentPlayerSide === "SENTE"
                          ? "rotate(0deg)"
                          : "rotate(180deg)"
                      }
                      isOponnent={
                        currentPlayerSide === "SENTE"
                          ? color === 1
                          : color === 0
                      }
                      svgProps={{ viewBox: pieceViewBox.board }}
                    />
                    {settings.showSquareNumbers && (
                      <div className="square-number">{squareNumber}</div>
                    )}
                  </BoardSquare>
                );
              });
            }

            return null;
          })}
      </ShogiBoard>
      <MatchPlayer
        name={currentPlayer && currentPlayer.nickname}
        picture={currentPlayer && currentPlayer.picture}
        hands={hands}
        displayPieces={displayPieces}
        playerColorTurn={currentPlayerSide === "SENTE" ? 0 : 1}
        toggleSettings={toggleSettings}
        selectHandPiece={selectHandPiece}
        callSurrender={callSurrender}
        width={width}
        viewBox={pieceViewBox.hand}
        isMyTurn={isMyTurn}
        showNotificationBar={isGameRunning}
      />
    </MatchDisplay>
  );
};

Board.propTypes = {
  allowMoves: PropTypes.bool,
  drawLabels: PropTypes.bool,
  effectDialog: PropTypes.object,
  targetTile: PropTypes.object,
  handleMovePiece: PropTypes.func,
};

Board.defaultProps = {
  allowMoves: true,
  drawLabels: true,
  effectDialog: { open: false },
  targetTile: {},
  handleMovePiece: () => {},
};

export default Board;
