import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getSquareByXYBoard } from "../utils/board/display";
import { Card, Badge } from "react-bootstrap";
import { checkIsPossibleMove } from "../utils/pieces/filter";

const ShogiBoard = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 15px;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "100%" }) => height};
  background-color: ${({ squaresColor }) => squaresColor};

  .board-square {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11.111%;
    height: 11.111%;
    border: 1px solid #6b5313;

    div {
      width: 100%;
      height: 100%;
    }
  }
`;

const PlayerInfo = styled.div`
  width: ${({ width = "100%" }) => width};
  margin: 0 auto;
`;

const Board = ({
  hands,
  squaresColor,
  drawLabels,
  handleMovePiece,
  lastAction,
  targetTile,
  selectHandPiece,
  possibleMoves,
  displayPieces,
  board,
  width,
  height
}) => {
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

  return (
    <div className="board-set">
      <div className="match-display">
        <PlayerInfo width={width}>
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
              <div className="hand">{displayHandPieces(hands[1], 1)}</div>
            </Card.Body>
          </Card>
        </PlayerInfo>
        <ShogiBoard width={width} height={height} squaresColor={squaresColor}>
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

                  return (
                    <div className="board-square" key={squareNumber}>
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
                        lastAction={
                          lastAction && squareName === lastAction.toId
                        }
                        player={color === 1 ? 2 : 1}
                      />
                    </div>
                  );
                });
            })}
        </ShogiBoard>
        <PlayerInfo width={width}>
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
              <div className="hand">{displayHandPieces(hands[0], 0)}</div>
            </Card.Body>
          </Card>
        </PlayerInfo>
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
