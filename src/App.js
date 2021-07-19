import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MatchPage from "./pages/Match";
import WaitGame from "./pages/WaitGame";
import GameHistory from "./pages/GameHistory";
import "./style.css";
import Login from "./pages/Login";
import { useAuthState } from "./store/user/state";

const App = () => {
  const { sessionId } = useAuthState();

  return (
    <Router>
      <div className="app-body">
        <Switch>
          {!sessionId && (
            <React.Fragment>
              <Route path="/">
                <Login />
              </Route>
            </React.Fragment>
          )}
          {sessionId && (
            <React.Fragment>
              <Route exact path="/">
                <WaitGame />
              </Route>
              <Route exact path="/home">
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
            </React.Fragment>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
