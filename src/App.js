import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MatchPage from "./pages/Match";
import WaitGame from "./pages/WaitGame";
import GameHistory from "./pages/GameHistory";
import "./style.css";

const App = () => {
  return (
    <Router>
      <div className="app-body">
        <Switch>
          <Route exact path="/">
            <WaitGame />
          </Route>
          <Route path="/waitGame">
            <WaitGame />
          </Route>
          <Route path="/game/:id" exact>
            <MatchPage />
          </Route>
          <Route path="/game/history/:id" exact>
            <GameHistory />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
