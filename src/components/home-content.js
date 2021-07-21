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

const HomeContent = () => (
  <div className="next-steps">
    <div className="row">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a target="_blank" rel="noopener noreferrer">
            Starts a new Shogi Battle
          </a>
        </h6>
        <p>
          <ButtonGroup>
            <Link to="/wait-game">
              <Button>1min</Button>
            </Link>
            <Link to="/wait-game">
              <Button>3min</Button>
            </Link>
            <Link to="/wait-game">
              <Button>10min</Button>
            </Link>
            <Link to="/wait-game">
              <Button>15min</Button>
            </Link>
          </ButtonGroup>
        </p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a target="_blank" rel="noopener noreferrer">
            Improve your skills with daily Shogi Exercises
          </a>
        </h6>
        <p>...</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a target="_blank" rel="noopener noreferrer">
            TOURNAMENTS
          </a>
        </h6>
        <p>...</p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a target="_blank" rel="noopener noreferrer">
            Learn Shogi
          </a>
        </h6>
        <p>...</p>
      </div>
    </div>
  </div>
);

export default HomeContent;
