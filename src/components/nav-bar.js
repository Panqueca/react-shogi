import React from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav
        className="navbar navbar-expand-md navbar-light"
        style={{ background: "#222" }}
      >
        <div className="container">
          <Link to="/">
            <div className="navbar-brand logo">
              {" "}
              <img src={logo} alt="Shogi Battles" width="100" />
            </div>
          </Link>
          <MainNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
