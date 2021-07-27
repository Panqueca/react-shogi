import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";

import "./index.css";
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from "./theme";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <FixedGlobalStyle />
      <ThemeProvider darkMode={false}>
        <ThemedGlobalStyle />
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root"),
);
