export function checkIsPossibleMove({ squareX, squareY }, possibleMoves) {
  if (Array.isArray(possibleMoves)) {
    const filter = possibleMoves.filter(
      ({ to }) => to.x === squareX && to.y === squareY
    );
    return filter.length > 0;
  }
  return false;
}
