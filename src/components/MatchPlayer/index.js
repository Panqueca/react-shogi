import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import PlayerTimer from "../PlayerTimer";

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

  .player-box {
    display: flex;
    gap: 15px;
    height: 50px;
    align-items: center;

    .title {
      font-size: 14px;
      font-weight: bold;
      line-height: 50px;
    }
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

const Notification = styled.div`
  width: ${({ width }) => width};
  margin: 0 auto;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-weight: bold;
  color: #999;
  font-size: 14px;
  line-height: 25px;
`;

const MatchPlayer = ({
  name,
  picture = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y",
  width,
  playerColorTurn,
  displayPieces,
  hands,
  selectHandPiece,

  viewBox,
  hide,
  showNotificationBar,
  isMyTurn,
  clock,
  side,
  fetchSetGameData,
}) => {
  function getNotification() {
    if (isMyTurn) return "Your turn to play";
  }

  function onExpire() {
    setTimeout(() => {
      if (fetchSetGameData) fetchSetGameData();
    }, [1500]);
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
        <div className="player-box">
          <div className="title">
            <img
              src={picture}
              style={{
                width: "35px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
              alt=""
            />
            {side && `(${side}) `}
            {name}
          </div>
          <div className="hand">
            {displayHandPieces(hands[playerColorTurn], playerColorTurn)}
          </div>
        </div>
        <PlayerTimer clock={clock} onExpire={onExpire} />
      </PlayerInfo>
    </Fragment>
  );
};

export default MatchPlayer;
