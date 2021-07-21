import React from "react";
import { Clock } from "react-feather";
import { useElapsedTime } from "use-elapsed-time";

const ElapsedTime = () => {
  const { elapsedTime } = useElapsedTime({ isPlaying: true });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Clock size="20" style={{ marginRight: "5px" }} />{" "}
      {elapsedTime.toFixed(0)}s
    </div>
  );
};

export default ElapsedTime;
