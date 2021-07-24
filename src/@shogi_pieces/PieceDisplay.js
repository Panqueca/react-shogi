import React from "react";

const SimpleLayer = ({
  styles,
  onClick = () => {},
  className = "",
  ...props
}) => {
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
        ...styles,
      }}
      onClick={onClick}
      className={className}
      {...props}
    />
  );
};

const PieceDisplay = (props) => {
  const {
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    style,
    isSelected,
    lastAction,
    forceProps,
    squareNumber,
    // squareName,
    svgProps = {},
    isOponnent,
    Piece,
  } = props;

  const styles = Object.assign({}, style, {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  });

  const onClickFunc =
    typeof onClick === "function"
      ? () => onClick({ x: props.x, y: props.y })
      : () => {};

  const rotate = isOponnent ? { transform: "rotate(180deg)" } : {};

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      style={styles}
      // title={`Square: ${squareNumber} (${squareName}), y: ${props.x} x: ${props.y}`}
      {...forceProps}
    >
      <SimpleLayer onClick={onClickFunc} data-cy={`square-${squareNumber}`} />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
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
          ...rotate,
        }}
        data-cy={`piece-tile-square-${squareNumber}`}
      >
        <Piece {...svgProps} />
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

export default PieceDisplay;
