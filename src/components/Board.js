import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import resizeAware from "react-resize-aware";
import defaultLineup from "../defaultLineup";
import decode from "../decode";
import {
  getSquareByInternationalSlug,
  getSquareNameByXY
} from "../utils/board/display";
import { Card, Button, Badge } from "react-bootstrap";

const ResizeAware = resizeAware.default || resizeAware;
const getDefaultLineup = () => defaultLineup.slice();
const square = 100 / 9;
const squareSize = `${square}%`;

const squareStyles = {
  width: squareSize,
  paddingBottom: squareSize,
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

const defaultTargetTile = {
  square: null,
  x: null,
  y: null
};

const Board = ({
  pieces,
  hands,
  historyActions,
  squaresColor,
  pieceComponents,
  drawLabels,
  handleMovePiece,
  notification,
  lastAction
}) => {
  const [boardConfig, setBoardConfig] = useState({ boardSize: 0, tileSize: 0 });
  const [targetTile, setTargetTile] = useState(defaultTargetTile);
  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef.els) {
      const boardSize = boardRef.els.board.clientWidth;
      setBoardConfig({ boardSize, tileSize: boardSize / 9 });
    }
  }, [boardRef]);

  useEffect(() => {
    if (notification === "Piece cannot move.") {
      setTargetTile(defaultTargetTile);
    }
  }, [notification]);

  function handleResize(size) {
    const tileSize = size.width / 9;
    setBoardConfig({ boardSize: size.width, tileSize });
  }

  function selectTile({ x, y }) {
    const move = getSquareNameByXY({ x, y });
    if (targetTile.square === move) return;
    handleMovePiece({ move });
    setTargetTile({ x, y, square: move });
  }

  function renderLabelText(x, y) {
    const isBottomRow = y === 8;
    const isLeftColumn = x === 0;

    if (!drawLabels || (!isLeftColumn && !isBottomRow)) return null;

    if (isLeftColumn && isBottomRow)
      return [
        <span key="blx" style={xLabelStyles}>
          1
        </span>,
        <span key="bly" style={yLabelStyles}>
          A
        </span>
      ];

    const labelValue = String.fromCharCode(
      decode.charCodeOffset + Math.abs(y - 8)
    ).toUpperCase();

    const label = isLeftColumn ? labelValue : x + 1;

    return (
      <span style={isLeftColumn ? yLabelStyles : xLabelStyles}>{label}</span>
    );
  }

  const tiles = [];

  for (let y = 8; y > -1; y--) {
    for (let x = 8; x > -1; x--) {
      const background = squaresColor;

      const styles = Object.assign(
        {
          background,
          border: "1px solid #000",
          cursor: "pointer",
          position: "relative"
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
  const displayPieces = pieceComponents
    ? pieces.map(({ pieceAtLocation }, i) => {
        const { square, piece } = decode.fromPieceDecl(pieceAtLocation);
        const {
          boardRow,
          boardCol,
          indexOfRow,
          indexOfCol,
          squareNumber,
          squareName
        } = getSquareByInternationalSlug(square);
        const PieceSelection = pieceComponents[piece];

        return (
          <PieceSelection
            y={indexOfRow}
            x={indexOfCol}
            squareNumber={squareNumber}
            squareName={squareName}
            boardRow={boardRow}
            boardCol={boardCol}
            onClick={({ x, y }) => selectTile({ x, y })}
            isSelected={square === targetTile.square}
            lastAction={lastAction && square === lastAction.toId}
            key={square}
          />
        );
      })
    : [];

  const children = tiles.concat(displayPieces);
  const boardStyles = {
    position: "relative",
    width: "100%",
    height: boardConfig.boardSize
  };

  function displayHandPieces(handPieces) {
    if (Array.isArray(handPieces)) {
      return handPieces.map(({ pieceByPlayer, count }) => {
        const Piece = pieceComponents[pieceByPlayer];
        if (Piece)
          return (
            <div className="piece-at-hand">
              <Piece />
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
      <div>
        <div className="board-head-actions">
          <Button variant="primary">Render-se</Button>
        </div>
      </div>
      <div className="match-display">
        <div className="player-2">
          <Card style={{ width: "100%", margin: "0px" }} className="profile">
            <Card.Body>
              <Card.Title>
                <Card.Img
                  variant="top"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y

                "
                  style={{ width: "50px", marginRight: "15px" }}
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
          <div className="hand">{displayHandPieces(hands.player2)}</div>
        </div>
        <div className="board-table">
          <ResizeAware
            ref={boardRef}
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
                  style={{ width: "50px", marginRight: "15px" }}
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
          <div className="hand">{displayHandPieces(hands.player1)}</div>
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  allowMoves: PropTypes.bool,
  drawLabels: PropTypes.bool,
  squaresColor: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.object)
};

Board.defaultProps = {
  allowMoves: true,
  drawLabels: true,
  squaresColor: "#f4c64e",
  pieces: getDefaultLineup()
};

export default Board;
