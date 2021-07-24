import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import moment from "moment";

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

  return `Clock: ${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export default PlayerTimer;
