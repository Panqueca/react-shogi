import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Board from "../../components/Board";
import { useWindowSize } from "../../utils/hooks/window";
import { useShogiEngine } from "../../utils/game/hooks";

const MatchDisplay = styled.div`
  position: relative;
`;
const TopDialog = styled.div`
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
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 5px;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 12px;
`;

const GameHistory = () => {
  const { gameMatch } = useShogiEngine({});
  const history = useHistory();

  useEffect(() => {
    console.log("LOAD GAME DATA");
  }, []);

  const { vh } = useWindowSize();
  const size = `${vh * 0.8}px`;

  return (
    <MatchDisplay>
      <TopDialog width={size}>
        You Resigned this game{" "}
        <Button onClick={() => history.push("/waitGame")}>New Game</Button>
      </TopDialog>
      <Board
        hands={gameMatch.hands}
        board={gameMatch.board}
        width={size}
        height={size}
      />
    </MatchDisplay>
  );
};

export default GameHistory;
