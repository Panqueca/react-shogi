import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";
import { Settings, Flag, MessageCircle } from "react-feather";
import styled, { keyframes } from "styled-components";

const PlayerInfo = styled.div`
  width: ${({ width = "100%" }) => width};
  height: 50px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  opacity: ${({ hide }) => (hide ? "0" : "1")};

  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .hand {
    height: 50px;
    width: auto;
    display: flex;

    .piece-at-hand {
      width: 40px;
      margin: 5px;
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

const blink = keyframes`
0% {
  opacity: 0.6;
}
25% {
  opacity: 0.7;
}
50% {
  opacity: 1;
}
75% {
  opacity: 0.7;
}
100% {
  opacity: 0.6;
}
`;

const Notification = styled.div`
  width: ${({ width }) => width};
  margin: 0 auto;
  height: 25px;
  line-height: 25px;
  text-align: left;
  font-weight: bold;
  animation: ${blink} 1s infinite;
`;

const MatchPlayer = ({
  name,
  gravatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y",
  showSettings = true,
  toggleSettings,
  width,
  playerColorTurn,
  displayPieces,
  hands,
  selectHandPiece,
  callSurrender,
  viewBox,
  hide,
  showNotificationBar,
  isMyTurn,
}) => {
  function getNotification() {
    if (isMyTurn) return "Your turn to play";
  }

  function displayHandPieces(handPieces, turn) {
    if (Array.isArray(handPieces)) {
      const groupByKind = [];

      handPieces.forEach((pieceInfo) => {
        const { kind } = pieceInfo;
        groupByKind[kind] = groupByKind[kind] || [];
        groupByKind[kind].push(pieceInfo);
      });

      return Object.keys(groupByKind).map((kind) => {
        const Piece = displayPieces[kind];
        const count = groupByKind[kind].length;

        if (Piece)
          return (
            <div className="piece-at-hand" key={kind}>
              <Piece
                forceProps={{
                  title: `${kind}`,
                  onClick: () => selectHandPiece({ kind, turn }),
                  "data-cy": `piece-at-hand-${turn}-${kind}`,
                }}
                svgProps={{
                  viewBox,
                  width: "50px",
                  height: "50px",
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
    <Fragment>
      {showNotificationBar && (
        <Notification width={width}>{getNotification()}</Notification>
      )}
      <PlayerInfo width={width} hide={hide}>
        <div className="title">
          <img
            src={gravatar}
            style={{ width: "35px", marginRight: "10px" }}
            alt=""
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
    </Fragment>
  );
};

export default MatchPlayer;
