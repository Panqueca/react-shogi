import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Board from "../components/Board";
import { useWindowSize } from "../utils/hooks/window";
import { useShogiEngine } from "../utils/game/hooks";
import { useAuth0 } from "@auth0/auth0-react";

const MatchDisplay = styled.div``;

const WaitGame = () => {
  const { gameMatch } = useShogiEngine({});
  const { getAccessTokenSilently, user } = useAuth0();
  const history = useHistory();
  const { type: GAME_TYPE } = useParams();

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
      const { data: waitResponse } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/games/wait`,
        { user, gameType: GAME_TYPE },
        headers,
      );

      const { message, _id: GAME_ID } = waitResponse;

      if (
        (message === "WAITING_PLAYER" ||
          message === "GAME_FOUND" ||
          message === "ALREADY_PLAYING") &&
        GAME_ID
      ) {
        history.push(`/live-match/${GAME_ID}`);
      }
    }

    wait();
  }, []);

  const { boardSize } = useWindowSize();

  return (
    <MatchDisplay>
      <Board
        hands={gameMatch.hands}
        board={gameMatch.board}
        width={boardSize}
        height={boardSize}
        player1={null}
        player2={null}
        currentPlayerSide="SENTE"
      />
    </MatchDisplay>
  );
};

export default WaitGame;
