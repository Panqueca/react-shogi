import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PlusCircle, Activity, User } from "react-feather";

const Link = styled(NavLink)`
  font-weight: bold;
  font-size: 12px;
  margin-right: 10px;
  padding: 3px 10px;
  &.router-link-exact-active {
    border-bottom: 2px solid #fff;
    background-color: #fff;
    color: #000 !important;
  }

  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }
`;

const MainNav = () => (
  <div className="navbar-nav" style={{ marginLeft: "40px" }}>
    <Link
      to="/"
      exact
      className="nav-link text-light"
      activeClassName="router-link-exact-active"
    >
      <Activity size="15" className="icon" />
      Dashboard
    </Link>
    <Link
      to="/wait-game"
      exact
      className="nav-link text-light"
      activeClassName="router-link-exact-active"
    >
      <PlusCircle size="15" className="icon" />
      New Battle
    </Link>
    <Link
      to="/profile"
      exact
      className="nav-link text-light"
      activeClassName="router-link-exact-active"
    >
      <User size="15" className="icon" />
      Profile
    </Link>
  </div>
);

export default MainNav;
