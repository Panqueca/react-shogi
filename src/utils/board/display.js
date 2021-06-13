export const Y_SERIES = ["a", "b", "c", "d", "e", "f", "g", "h", "i"].reverse();
export const X_SERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9].reverse();

export const getSquareByName = name => {
  const [row, col] = name;
  const indexOfRow = Y_SERIES.indexOf(row);
  const indexOfCol = X_SERIES.indexOf(parseInt(col, 10));

  return { row, col, indexOfRow, indexOfCol };
};

export const getSquareNameByXY = ({ x, y }) => {
  return `${Y_SERIES[y]}${X_SERIES[x]}`;
};
