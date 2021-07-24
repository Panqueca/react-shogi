import React from "react";
import styled from "styled-components";
import { PlusCircle, Activity, User } from "react-feather";
import GameTypeOptions from "../GameTypeOptions";
import { useDialogState, WAIT_GAME } from "../../store/dialogs/state";
import { useHistory } from "react-router-dom";

const Link = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-right: 10px;
  padding: 3px 10px;
  cursor: pointer;
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

const MainNav = () => {
  const { openPopup, closePopup } = useDialogState();
  const history = useHistory();

  function openWaitGame() {
    openPopup(WAIT_GAME, () => (
      <div>
        <h3 style={{ padding: "15px 20px" }}>Start a New Battle</h3>
        <div style={{ padding: "0px 5px" }}>
          <GameTypeOptions closeModal={() => closePopup(WAIT_GAME)} />
        </div>
      </div>
    ));
  }

  return (
    <div className="navbar-nav" style={{ marginLeft: "40px" }}>
      <Link
        onClick={() => history.push("/")}
        exact
        className="nav-link text-light"
      >
        <Activity size="15" className="icon" />
        Dashboard
      </Link>
      <Link className="nav-link text-light" onClick={openWaitGame}>
        <PlusCircle size="15" className="icon" />
        New Battle
      </Link>
      <Link
        onClick={() => history.push("/profile")}
        className="nav-link text-light"
      >
        <User size="15" className="icon" />
        Profile
      </Link>
    </div>
  );
};

export default MainNav;
