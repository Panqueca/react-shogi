import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Board from "../../components/Board";
import { useWindowSize } from "../../utils/hooks/window";
import { useShogiEngine } from "../../utils/game/hooks";

const MatchDisplay = styled.div`
  position: relative;
`;
const WaitDialog = styled.div`
  position: fixed;
  width: ${({ width }) => width};
  padding: 20px;
  background-color: #fff;
  font-size: 22px;
  top: 0px;
  left: 0;
  right: 0;
  margin: auto auto;
  z-index: 100;
`;

const WaitGame = () => {
  const [waiting, setWaiting] = useState(false);
  const { gameMatch } = useShogiEngine({});
  const history = useHistory();

  useEffect(() => {
    if (!waiting) {
      async function wait() {
        const { data: waitResponse } = await axios.post(
          "http://localhost:9000/games/wait"
        );

        console.log({ waitResponse });
        const { message, _id: GAME_ID } = waitResponse;

        if (
          (message === "WAITING_PLAYER" || message === "GAME_FOUND") &&
          GAME_ID
        ) {
          history.push(`/game/${GAME_ID}`);
        }
      }

      wait();
    }
  }, [waiting]);

  const { vh } = useWindowSize();
  const size = `${vh * 0.8}px`;

  return (
    <MatchDisplay>
      <WaitDialog width={size}>You are waiting for an opponent</WaitDialog>
      <Board
        hands={gameMatch.hands}
        board={gameMatch.board}
        width={size}
        height={size}
      />
    </MatchDisplay>
  );
};

export default WaitGame;
