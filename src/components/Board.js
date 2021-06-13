import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import resizeAware from "react-resize-aware";
import defaultLineup from "../defaultLineup";
import decode from "../decode";
import { getSquareByName, getSquareNameByXY } from "../utils/board/display";

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

const Board = ({
  lightSquareColor,
  darkSquareColor,
  highlightTarget,
  allowMoves,
  onDragStart,
  onMovePiece,
  pieces,
  pieceComponents,
  drawLabels,
  handleMovePiece
}) => {
  const [boardConfig, setBoardConfig] = useState({ boardSize: 0, tileSize: 0 });
  const [dragging, setDragging] = useState({
    targetTile: null,
    dragFrom: null,
    draggingPiece: null
  });
  const [targetTile, setTargetTile] = useState({
    square: null,
    x: null,
    y: null
  });
  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef.els) {
      const boardSize = boardRef.els.board.clientWidth;
      setBoardConfig({ boardSize, tileSize: boardSize / 9 });
    }
  }, [boardRef]);

  function getSquareColor(x, y) {
    const odd = x % 2;

    if (y % 2) {
      return odd ? lightSquareColor : darkSquareColor;
    }

    return odd ? darkSquareColor : lightSquareColor;
  }

  function handleResize(size) {
    const tileSize = size.width / 9;
    setBoardConfig({ boardSize: size.width, tileSize });
  }

  function selectTile({ x, y }) {
    const move = getSquareNameByXY({ x, y });
    if (targetTile.square === "move") return;
    handleMovePiece({ move });
    setTargetTile({ x, y, square: move });
  }

  function coordsToPosition(coords) {
    const x = Math.round(coords.x / boardConfig.tileSize);
    const y = Math.round(coords.y / boardConfig.tileSize);
    return {
      x,
      y,
      pos: `${String.fromCharCode(decode.charCodeOffset + y)}${9 - x}`
    };
  }

  function handleDrag(evt, drag) {
    if (!highlightTarget) {
      return;
    }

    const { x, y } = coordsToPosition({
      x: drag.node.offsetLeft + drag.x,
      y: drag.node.offsetTop + drag.y
    });

    if (
      !dragging.targetTile ||
      dragging.targetTile.x !== x ||
      dragging.targetTile.y !== y
    ) {
      setDragging({
        ...dragging,
        targetTile: { x: Math.abs(x - 8), y: Math.abs(y - 8) }
      });
    }
  }

  function handleDragStart(evt, drag) {
    evt.preventDefault();

    if (!allowMoves) {
      return false;
    }

    const node = drag.node;
    const dragFrom = coordsToPosition({
      x: node.offsetLeft,
      y: node.offsetTop
    });

    const draggingPiece = findPieceAtPosition(dragFrom.pos);
    if (onDragStart(draggingPiece, dragFrom.pos) === false) {
      return false;
    }

    setDragging({ ...dragging, dragFrom, draggingPiece });
    return evt;
  }

  function handleDragStop(evt, drag) {
    const node = drag.node;
    const { dragFrom, draggingPiece } = dragging;

    const dragTo = coordsToPosition({
      x: node.offsetLeft + drag.x,
      y: node.offsetTop + drag.y
    });

    setDragging({
      ...dragging,
      dragFrom: null,
      targetTile: null,
      draggingPiece: null
    });

    if (dragFrom.pos !== dragTo.pos) {
      onMovePiece(draggingPiece, dragFrom.pos, dragTo.pos);
      return false;
    }

    return true;
  }

  function findPieceAtPosition(pos) {
    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      if (piece.indexOf(pos) === 2) {
        return {
          notation: piece,
          name: piece.slice(0, 1),
          index: i,
          position: pos
        };
      }
    }

    return null;
  }

  function renderLabelText(x, y) {
    const isBottomRow = y === 8;
    const isLeftColumn = x === 0;

    if (!drawLabels || (!isLeftColumn && !isBottomRow)) {
      return null;
    }

    if (isLeftColumn && isBottomRow) {
      return [
        <span key="blx" style={xLabelStyles}>
          9
        </span>,
        <span key="bly" style={yLabelStyles}>
          i
        </span>
      ];
    }

    const label = isLeftColumn
      ? String.fromCharCode(decode.charCodeOffset + Math.abs(y - 8))
      : x + 1;

    return (
      <span style={isLeftColumn ? yLabelStyles : xLabelStyles}>{label}</span>
    );
  }

  const { draggingPiece } = dragging;

  const tiles = [];

  for (let y = 8; y > -1; y--) {
    for (let x = 8; x > -1; x--) {
      const isTarget =
        dragging.targetTile &&
        dragging.targetTile.x === x &&
        dragging.targetTile.y === y;
      const background = getSquareColor(x, y);
      const boxShadow = isTarget
        ? "inset 0px 0px 0px 0.4vmin yellow"
        : undefined;
      const styles = Object.assign(
        {
          background,
          boxShadow,
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
        const isMoving = draggingPiece && i === draggingPiece.index;
        const { square, piece } = decode.fromPieceDecl(decl);
        const { indexOfRow, indexOfCol } = getSquareByName(square);
        const PieceSelection = pieceComponents[piece];

        return (
          <PieceSelection
            isMoving={isMoving}
            y={indexOfRow}
            x={indexOfCol}
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
  highlightTarget: PropTypes.bool,
  drawLabels: PropTypes.bool,
  lightSquareColor: PropTypes.string,
  darkSquareColor: PropTypes.string,
  onMovePiece: PropTypes.func,
  onDragStart: PropTypes.func,
  pieces: PropTypes.arrayOf(PropTypes.string)
};

Board.defaultProps = {
  allowMoves: true,
  highlightTarget: true,
  drawLabels: true,
  onMovePiece: () => {},
  onDragStart: () => {},
  lightSquareColor: "#f4c64e",
  darkSquareColor: "#f4c64e",
  pieces: getDefaultLineup()
};

export default Board;
