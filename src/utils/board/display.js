export const Y_SERIES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
export const X_SERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const getSquareNameByXY = ({ x, y }) => {
  return `${Y_SERIES[y]}${X_SERIES[x]}`;
};

export const getSquareByInternationalSlug = name => {
  const [row, col] = name;
  const indexOfRow = Y_SERIES.indexOf(row);
  const indexOfCol = X_SERIES.indexOf(parseInt(col, 10));
  const boardRow = Math.abs(indexOfRow - 8);
  const boardCol = Math.abs(indexOfCol - 8);

  const squareY = indexOfRow + 1;
  const squareX = indexOfCol + 1;

  return {
    row,
    col,
    indexOfRow,
    indexOfCol,
    boardRow,
    boardCol,
    squareNumber: getSquareNameByXY({ x: indexOfCol, y: indexOfRow }),
    squareY,
    squareX,
    squareName: `${col}${row}`
  };
};

export const getSquareInfoByXY = ({ x, y }) => {
  return {
    name: getSquareNameByXY({ x, y }),
    row: Y_SERIES[y],
    col: X_SERIES[x]
  };
};

export const getSquareByXYBoard = ({ x, y }) => {
  const squareName = getSquareNameByXY({ x, y });
  return getSquareByInternationalSlug(squareName);
};
