export const Y_SERIES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
export const X_SERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const getInternationalSlugByXY = ({ x, y }) => {
  return `${Y_SERIES[y]}${X_SERIES[x]}`;
};

export const getSquareByInternationalSlug = name => {
  const [row, col] = name;
  const indexOfRow = Y_SERIES.indexOf(row);
  const indexOfCol = X_SERIES.indexOf(parseInt(col, 10));

  const squareY = indexOfRow + 1;
  const squareX = indexOfCol + 1;

  return {
    row,
    col,
    indexOfRow,
    indexOfCol,
    squareNumber: Number(`${squareY}${squareX}`),
    squareY,
    squareX,
    squareName: `${col}${row}`,
    square: name
  };
};

export const getSquareInfoByXY = ({ x, y }) => {
  const row = Y_SERIES[y - 1];
  const col = X_SERIES[x - 1];

  return {
    name: `${row}${col}`,
    row,
    col
  };
};

export const getSquareByXYBoard = ({ x, y }) => {
  const square = getInternationalSlugByXY({ x, y });
  return getSquareByInternationalSlug(square);
};
