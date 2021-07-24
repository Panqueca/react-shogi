import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import DialogProvider from "./components/DialogProvider";
import Footer from "./components/Footer";
import { Home, Profile, WaitGame, LiveMatch, ExternalApi } from "./views";
import ProtectedRoute from "./auth/ProtectedRoute";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <DialogProvider />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/wait-game/:type" component={WaitGame} />
          <ProtectedRoute path="/live-match/:id" component={LiveMatch} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
