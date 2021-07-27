import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import moment from "moment";
import styled from "styled-components";

const Clock = styled.div`
  background-color: ${({ isRunning }) => (isRunning ? "#111" : "#999")};
  color: #fff;
  font-size: 16px;
  letter-spacing: 3px;
  width: 70px;
  text-align: center;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
`;

const PlayerTimer = ({ clock, onExpire = () => {} }) => {
  const { expireSeconds, isRunning } = clock || {};
  const { seconds, minutes, pause, restart } = useTimer({
    expiryTimestamp: null,
    onExpire,
  });

  useEffect(() => {
    const momentDate = moment(new Date());
    const expire = momentDate.add(expireSeconds, "seconds");
    restart(expire);

    if (!isRunning) pause();
  }, [isRunning]);

  const getSeconds = seconds > 9 ? seconds : `0${seconds}`;

  return <Clock isRunning={isRunning}>{`${minutes}:${getSeconds}`}</Clock>;
};

export default PlayerTimer;
