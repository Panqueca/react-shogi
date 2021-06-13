import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import resizeAware from "react-resize-aware";
import defaultLineup from "../defaultLineup";
import decode from "../decode";
import {
  getSquareByInternationalSlug,
  getSquareNameByXY
} from "../utils/board/display";

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
  lightSquareColor,
  darkSquareColor,
  pieces,
  pieceComponents,
  drawLabels,
  handleMovePiece,
  notification
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

  function getSquareColor(x, y) {
    const odd = x % 2;
    if (y % 2) return odd ? lightSquareColor : darkSquareColor;
    return odd ? darkSquareColor : lightSquareColor;
  }

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
      const background = getSquareColor(x, y);

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
    ? pieces.map((decl, i) => {
        const { square, piece } = decode.fromPieceDecl(decl);
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
            onClick={selectTile}
            isSelected={square === targetTile.square}
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

  return (
    <ResizeAware
      ref={boardRef}
      onResize={handleResize}
      style={boardStyles}
      onlyEvent
    >
      {children}
    </ResizeAware>
  );
};

Board.propTypes = {
  allowMoves: PropTypes.bool,
  drawLabels: PropTypes.bool,
  lightSquareColor: PropTypes.string,
  darkSquareColor: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.string)
};

Board.defaultProps = {
  allowMoves: true,
  highlightTarget: true,
  drawLabels: true,
  lightSquareColor: "#f4c64e",
  darkSquareColor: "#f4c64e",
  pieces: getDefaultLineup()
};

export default Board;
