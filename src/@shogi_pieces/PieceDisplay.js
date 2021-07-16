/* eslint-disable react/display-name, react/prop-types */
const React = require("react");
const PropTypes = require("prop-types");

const SimpleLayer = ({ styles, onClick = () => {}, className = "" }) => {
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
      className={className}
    />
  );
};

SimpleLayer.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  onClick: PropTypes.func
};

SimpleLayer.defaultProps = {
  className: "",
  styles: {},
  onClick: () => {}
};

module.exports = Piece => props => {
  const {
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    style,
    isMoving,
    isSelected,
    lastAction,
    boardRow,
    boardCol,
    forceProps,
    tileSize,
    tilePercent,
    player
  } = props;
  const display_y = 8 - boardRow;

  const styles = Object.assign({}, style, {
    position: "absolute",
    left: `${boardCol * tilePercent}%`,
    top: `${display_y * tilePercent}%`,
    width: tileSize,
    height: tileSize,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: isMoving ? 1000 : undefined
  });

  const onClickFunc =
    typeof onClick === "function"
      ? () => onClick({ x: props.x, y: props.y })
      : () => {};

  const rotate = player === 2 ? { transform: "rotate(180deg)" } : {};

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      style={styles}
      title={`Square: ${props.squareNumber} (${props.squareName}), y: ${props.x} x: ${props.y}`}
      {...forceProps}
    >
      <SimpleLayer onClick={onClickFunc} />
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
          alignItems: "center",
          ...rotate
        }}
      >
        <Piece />
      </div>
      {isSelected && (
        <SimpleLayer
          styles={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1 }}
        />
      )}
      {lastAction && (
        <SimpleLayer styles={{ zIndex: 1 }} className="last-action-tile" />
      )}
    </div>
  );
};