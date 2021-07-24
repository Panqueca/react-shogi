import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  padding: 15px;
`;

const Button = styled.button`
  padding: 5px 10px;
  color: #000;
  font-weight: bold;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 15px;
`;

const GameTypeOptions = ({ closeModal = () => {} }) => {
  return (
    <ButtonGroup>
      <Link to="/wait-game/BULLET_1" onClick={closeModal}>
        <Button>1min</Button>
      </Link>
      <Link to="/wait-game/BLITZ_3" onClick={closeModal}>
        <Button>3min</Button>
      </Link>
      <Link to="/wait-game/BLITZ_10" onClick={closeModal}>
        <Button>10min</Button>
      </Link>
      <Link to="/wait-game/RAPID_15" onClick={closeModal}>
        <Button>15min</Button>
      </Link>
    </ButtonGroup>
  );
};

export default GameTypeOptions;
