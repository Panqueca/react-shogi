import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  padding: 15px;
`;

const StyledLink = styled(Link)`
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
      <StyledLink to="/wait-game/BULLET_1" onClick={closeModal}>
        1min
      </StyledLink>
      <StyledLink to="/wait-game/BLITZ_3" onClick={closeModal}>
        3min
      </StyledLink>
      <StyledLink to="/wait-game/BLITZ_10" onClick={closeModal}>
        10min
      </StyledLink>
      <StyledLink to="/wait-game/RAPID_15" onClick={closeModal}>
        15min
      </StyledLink>
    </ButtonGroup>
  );
};

export default GameTypeOptions;
