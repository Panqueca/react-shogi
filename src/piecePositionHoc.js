/* eslint-disable react/display-name, react/prop-types */
const React = require("react");

module.exports = Piece => props => {
  const {
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    style,
    isMoving
  } = props;
  const y = 7 - props.y;

  const styles = Object.assign({}, style, {
    position: "absolute",
    left: `${props.x * 11.111}%`,
    top: `${y * 11.111}%`,
    width: "11.111%",
    height: "11.111%",
    textAlign: "center",
    zIndex: isMoving ? 1000 : undefined,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  });

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      style={styles}
    >
      <Piece size="85%" />
    </div>
  );
};
