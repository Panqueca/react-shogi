export const Y_SERIES = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
export const X_SERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const getSquareByInternationalSlug = name => {
  const [row, col] = name;
  const indexOfRow = Y_SERIES.indexOf(row);
  const indexOfCol = X_SERIES.indexOf(parseInt(col, 10));
  const boardRow = Math.abs(indexOfRow - 8);
  const boardCol = Math.abs(indexOfCol - 8);

  return {
    row,
    col,
    indexOfRow,
    indexOfCol,
    boardRow,
    boardCol,
    squareNumber: `${indexOfCol + 1}${indexOfRow + 1}`,
    squareName: `${col}${row.toUpperCase()}`
  };
};

export const getSquareNameByXY = ({ x, y }) => {
  return `${Y_SERIES[y]}${X_SERIES[x]}`;
};
