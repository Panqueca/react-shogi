/* eslint-disable react/display-name, react/prop-types */
const React = require("react");

module.exports = Piece => props => {
  const {
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    style,
    isMoving
  } = props;
  const y = 8 - props.y;

  const styles = Object.assign({}, style, {
    position: "absolute",
    left: `${props.x * 11.111}%`,
    top: `${y * 11.4}%`,
    width: "11.111%",
    height: "12.111%",
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
      title={`x: ${props.x}, y: ${props.y}`}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0
        }}
        onClick={() => onClick({ x: props.x, y: props.y })}
      />
      <Piece />
    </div>
  );
};
