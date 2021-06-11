import Piece from "./piece";

/** A piece that moves any number of squares diagonally */
class Bishop extends Piece {
  /**
   * The destinations that a Bishop can move from a square on a board.
   * @param {Square} square - The origin square.
   * @param {GameState} gameState - the game state being played on.
   * @return {SquareSet}
   */
  destinations(square, gameState) {
    return gameState.squares
      .diagonal(square)
      .unoccupiedOrOccupiedByOpponent(this.playerNumber)
      .unblocked(square, gameState.squares);
  }
}

export default Bishop;
