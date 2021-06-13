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
    isMoving,
    isSelected
  } = props;
  const y = 8 - props.y;

  const styles = Object.assign({}, style, {
    position: "absolute",
    left: `${props.x * 11.111}%`,
    top: `${y * 11.38}%`,
    width: "11.111%",
    height: "11.111%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: isMoving ? 1000 : undefined
  });

  const SimpleLayer = ({ styles, onClick = () => {} }) => {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          ...styles
        }}
        onClick={onClick}
      />
    );
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      style={styles}
      title={`x: ${props.x}, y: ${props.y}`}
    >
      <SimpleLayer onClick={() => onClick({ x: props.x, y: props.y })} />
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
      <div
        style={{
          zIndex: 2,
          width: "75%",
          height: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Piece />
      </div>
      {isSelected && (
        <SimpleLayer
          styles={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1 }}
        />
      )}
    </div>
  );
};
