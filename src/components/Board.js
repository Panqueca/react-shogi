import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import resizeAware from "react-resize-aware";
import {
  getSquareByInternationalSlug,
  getSquareInfoByXY,
  getSquareNameByXY,
  getSquareByXYBoard
} from "../utils/board/display";
import { Card, Badge } from "react-bootstrap";
import { checkIsPossibleMove } from "../utils/pieces/filter";

const ResizeAware = resizeAware.default || resizeAware;

const squareStyles = {
  float: "left",
  position: "relative",
  pointerEvents: "none"
};

const labelStyles = {
  fontSize: "calc(7px + .5vw)",
  position: "absolute",
  userSelect: "none"
};
const yLabelStyles = Object.assign({ top: "5%", left: "5%" }, labelStyles);
const xLabelStyles = Object.assign({ bottom: "5%", right: "5%" }, labelStyles);

const Board = ({
  hands,
  historyActions,
  squaresColor,
  drawLabels,
  handleMovePiece,
  lastAction,
  targetTile,
  selectHandPiece,
  possibleMoves,
  displayPieces,
  board
}) => {
  const [boardConfig, setBoardConfig] = useState({ boardSize: 0, tileSize: 0 });
  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef.els) {
      const boardSize = boardRef.els.board.clientWidth;
      setBoardConfig({ boardSize, tileSize: boardSize / 9 });
    }
  }, [boardRef]);

  function handleResize(size) {
    const tileSize = size.width / 9;
    setBoardConfig({ boardSize: size.width, tileSize });
  }

  function selectTile({ x, y, pieceInfo }) {
    const move = getSquareNameByXY({ x, y });
    handleMovePiece({ move, x, y, square: move, pieceInfo });
  }

  function renderLabelText(x, y) {
    const isBottomRow = y === 0;
    const isLeftColumn = x === 0;

    const { row, col } = getSquareInfoByXY({ x, y });

    if (!drawLabels || (!isLeftColumn && !isBottomRow)) return null;

    if (isLeftColumn && isBottomRow)
      return [
        <span key="blx" style={xLabelStyles}>
          {col}
        </span>,
        <span key="bly" style={yLabelStyles}>
          {row.toUpperCase()}
        </span>
      ];

    const label = isLeftColumn ? row.toUpperCase() : col;

    return (
      <span style={isLeftColumn ? yLabelStyles : xLabelStyles}>{label}</span>
    );
  }

  const tiles = [];

  const finalTileSize = boardConfig.tileSize - 0.05;
  const finalTilePercent = 11.111;

  for (let y = 0; y <= 8; y++) {
    for (let x = 8; x >= 0; x--) {
      const background = squaresColor;

      const styles = Object.assign(
        {
          background,
          cursor: "pointer",
          position: "relative",
          border: "1px solid #6b5313",
          width: finalTileSize,
          height: finalTileSize
        },
        squareStyles
      );

      tiles.push(
        <div key={`${x}${y}`}>
          <div key={`rect-${x}-${y}`} style={styles} title={`x: ${x}, y: ${y}`}>
            {renderLabelText(x, y)}
          </div>
        </div>
      );
    }
  }
  const renderPieces = [];

  board.forEach((colPieces, x) => {
    if (Array.isArray(colPieces))
      colPieces.forEach((locationInfo, y) => {
        if (!displayPieces) return;

        const { color, kind } = locationInfo || {};
        const {
          indexOfRow,
          indexOfCol,
          squareNumber,
          squareName,
          boardRow,
          boardCol,
          squareX,
          squareY
        } = getSquareByXYBoard({ x, y });

        const displayKind = kind || "Empty";
        const PieceSelection = displayPieces[displayKind];

        const isPossibleMove = checkIsPossibleMove(
          { squareX, squareY },
          possibleMoves
        );

        renderPieces.push(
          <PieceSelection
            y={indexOfRow}
            x={indexOfCol}
            squareNumber={squareNumber}
            squareName={squareName}
            boardRow={boardRow}
            boardCol={boardCol}
            onClick={({ x, y }) =>
              selectTile({ x, y, pieceInfo: locationInfo })
            }
            isSelected={isPossibleMove || squareName === targetTile.square}
            lastAction={lastAction && squareName === lastAction.toId}
            key={squareName}
            boardConfig={boardConfig}
            tileSize={finalTileSize}
            tilePercent={finalTilePercent}
            player={color === 1 ? 2 : 1}
          />
        );
      });
  });

  const children = tiles.concat(renderPieces);
  const boardStyles = {
    position: "relative",
    width: "100%",
    height: boardConfig.boardSize
  };

  function displayHandPieces(handPieces, turn) {
    if (Array.isArray(handPieces)) {
      const groupByKind = [];

      handPieces.forEach(pieceInfo => {
        const { kind } = pieceInfo;

        groupByKind[kind] = groupByKind[kind] || [];
        groupByKind[kind].push(pieceInfo);
      });

      return Object.keys(groupByKind).map(kind => {
        const Piece = displayPieces[kind];
        const count = groupByKind[kind].length;

        if (Piece)
          return (
            <div className="piece-at-hand" key={kind}>
              <Piece
                forceProps={{
                  title: `${kind}`,
                  onClick: () => selectHandPiece({ kind, turn })
                }}
              />
              {count > 1 && (
                <Badge variant="light" className="count-badge">
                  {count}
                </Badge>
              )}
            </div>
          );
        return null;
      });
    }

    return null;
  }

  const HistoryTable = ({ historyActions }) => {
    const elementRef = useRef();

    useEffect(() => {
      if (elementRef && elementRef.current) elementRef.current.scrollIntoView();
    });

    return (
      <div className="history-table">
        {historyActions.map((history, index) => {
          const { data, playerSide } = history;
          const { toId = "" } = data;
          const { squareName } = getSquareByInternationalSlug(toId);

          return (
            <div key={index} className="history-line" ref={elementRef}>
              <div className={playerSide} />
              {squareName}
            </div>
          );
        })}
      </div>
    );
  };

  function displayHistoryActions() {
    if (Array.isArray(historyActions))
      return <HistoryTable historyActions={historyActions} />;

    return null;
  }

  return (
    <div className="board-set">
      <div className="match-display">
        <div className="player-2">
          <Card style={{ width: "100%", margin: "0px" }} className="profile">
            <Card.Body>
              <Card.Title>
                <Card.Img
                  variant="top"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y

                "
                  style={{ width: "35px", marginRight: "10px" }}
                />
                Jogador 2 (Gote)
              </Card.Title>
              <p>10Kyu</p>
              Especialidades:
              <ul>
                <li>Quick Ishida</li>
                <li>Shikenbisha</li>
              </ul>
            </Card.Body>
          </Card>
          <div className="hand">{displayHandPieces(hands[1], 1)}</div>
        </div>
        <div className="board-table" ref={boardRef}>
          <ResizeAware
            className="board-resizer"
            onResize={handleResize}
            style={boardStyles}
            onlyEvent
          >
            {children}
          </ResizeAware>
        </div>
        <div className="player-1">
          <div className="history">{displayHistoryActions()}</div>
          <Card style={{ width: "100%", margin: "0px" }} className="profile">
            <Card.Body>
              <Card.Title>
                <Card.Img
                  variant="top"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y

                "
                  style={{ width: "35px", marginRight: "10px" }}
                />
                Jogador 1 (Sente)
              </Card.Title>
              <p>10Kyu</p>
              Especialidades:
              <ul>
                <li>Quick Ishida</li>
                <li>Shikenbisha</li>
              </ul>
            </Card.Body>
          </Card>
          <div className="hand">{displayHandPieces(hands[0], 0)}</div>
        </div>
      </div>
    </div>
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
