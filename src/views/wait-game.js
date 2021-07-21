import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Board from "../components/Board";
import { useWindowSize } from "../utils/hooks/window";
import { useShogiEngine } from "../utils/game/hooks";
import { useAuth0 } from "@auth0/auth0-react";

const MatchDisplay = styled.div``;

const WaitGame = () => {
  const { gameMatch } = useShogiEngine({});
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const getAuthHeader = async () => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    async function wait() {
      const headers = await getAuthHeader();
      const { data: waitResponse } = await axios.get(
        "http://localhost:6060/games/wait",
        headers
      );

      const { message, _id: GAME_ID } = waitResponse;

      if (
        (message === "WAITING_PLAYER" || message === "GAME_FOUND") &&
        GAME_ID
      ) {
        history.push(`/live-match/${GAME_ID}`);
      }
    }

    wait();
  }, []);

  const { vh } = useWindowSize();
  const size = `${vh * 0.8 - 150}px`;

  return (
    <MatchDisplay>
      <Board
        hands={gameMatch.hands}
        board={gameMatch.board}
        width={size}
        height={size}
        player1={null}
        player2={null}
      />
    </MatchDisplay>
  );
};

export default WaitGame;
