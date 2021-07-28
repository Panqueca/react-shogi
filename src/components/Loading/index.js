import React from "react";
import styled from "styled-components";

const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Spinner = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Loading = ({ width = "150px" }) => (
  <Spinner>
    <img src={loadingImg} alt="Loading..." width={width} />
  </Spinner>
);

export default Loading;
