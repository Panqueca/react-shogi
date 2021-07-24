import React, { Fragment } from "react";
import GameTypeOptions from "../components/GameTypeOptions";
import Hero from "../components/Hero";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    <div className="next-steps">
      <div className="row">
        <div className="col-md-5 mb-4">
          <h6 className="mb-3">
            <a target="_blank" rel="noopener noreferrer">
              Starts a new Shogi Battle
            </a>
          </h6>
          <p>
            <GameTypeOptions />
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
  </Fragment>
);

export default Home;
