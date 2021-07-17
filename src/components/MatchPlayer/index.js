import React from "react";
import { Badge } from "react-bootstrap";
import { Settings, Flag, MessageCircle } from "react-feather";
import styled from "styled-components";

const PlayerInfo = styled.div`
  width: ${({ width = "100%" }) => width};
  height: 50px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .hand {
    height: 50px;
    width: auto;
    display: flex;

    .piece-at-hand {
      width: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 1em;

      div {
        position: relative !important;
        width: 100% !important;
        top: 0 !important;
        flex: 0 0 0;
      }

      .count-badge {
        position: absolute;
        top: 55%;
        right: 0%;
        z-index: 100;
      }
    }
  }
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const MatchPlayer = ({
  name,
  showSettings = true,
  toggleSettings,
  width,
  playerColorTurn,
  displayPieces,
  hands,
  selectHandPiece,
  callSurrender
}) => {
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
                  onClick: () => selectHandPiece({ kind, turn }),
                  "data-cy": `piece-at-hand-${turn}-${kind}`
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
    <PlayerInfo width={width}>
      <div className="title">
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
          style={{ width: "35px", marginRight: "10px" }}
        />
        {name}
      </div>
      <div className="hand">
        {displayHandPieces(hands[playerColorTurn], playerColorTurn)}
      </div>
      {showSettings && (
        <div className="config">
          <ActionButton disabled>
            <MessageCircle />
          </ActionButton>
          <ActionButton onClick={callSurrender}>
            <Flag />
          </ActionButton>
          <ActionButton onClick={toggleSettings}>
            <Settings />
          </ActionButton>
        </div>
      )}
    </PlayerInfo>
  );
};

export default MatchPlayer;
