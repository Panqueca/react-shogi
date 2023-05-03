import { getSquareByInternationalSlug, getSquareByXYBoard } from '@utils/board'

export const defaultTargetTile = {
  square: null,
  x: null,
  y: null,
}

export const defaultDialog = {
  open: false,
  title: '',
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: '',
  cancelText: '',
}

export const defaultSfen =
  'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1'

export const defaultMoveAction = { from: null, dropPiece: null, moves: [] }

export const defaultEffectDialog = {
  open: false,
  display: null,
}

export const initialGameState = {
  _id: null,
  winner: null,
  moves: [],
  status: 'LOADING',
  increment: 0,
  type: 'BLITZ_10',
}

export const defaultClocks = {
  currentPlayer: {
    isRunning: false,
    secondsLeft: 0,
  },
  opponentPlayer: {
    isRunning: false,
    secondsLeft: 0,
  },
}

export function eachPiece(board, callback) {
  board.forEach((col, x) => {
    col.forEach((piece, y) => {
      callback({ x, y, piece })
    })
  })
}

export function getAttackedSquares(game, kingColor) {
  const attackedSquares = []

  eachPiece(game.board, ({ piece, x, y }) => {
    if (!piece || piece.color === kingColor) return
    const { squareX, squareY } = getSquareByXYBoard({ x, y })

    const pieceAttacks = game.getMovesFrom(squareX, squareY)
    if (pieceAttacks.length > 0)
      pieceAttacks.forEach((square) => {
        attackedSquares.push({ kind: piece.kind, ...square })
      })
  })

  return attackedSquares
}

export function sameSquare(squareA, squareB) {
  return squareA.x === squareB.x && squareA.y === squareB.y
}

export function isKingInCheck(game, kingColor) {
  const attacked = getAttackedSquares(game, kingColor)
  let kingSquare = { x: null, y: null }

  eachPiece(game.board, ({ piece, x, y }) => {
    if (piece && piece.kind === 'OU' && piece.color === kingColor) {
      const { squareX, squareY } = getSquareByXYBoard({ x, y })
      kingSquare = { x: squareX, y: squareY }
    }
  })

  return attacked.filter(({ to }) => sameSquare(kingSquare, to)).length > 0
}

export function getMoveResponse({ moveAction, turn, color }) {
  const { from: isActionMove, dropPiece } = moveAction
  const { kind: dropKind, turn: dropTurn } = dropPiece || {}

  const hasPieceOnSquare = color >= 0

  const isPlayerPiece = hasPieceOnSquare && color === turn
  const isOpponentPiece = hasPieceOnSquare && color !== turn
  const isDropAction = dropKind && dropTurn === turn
  const isEmptySelection = !isActionMove && !hasPieceOnSquare && !isDropAction

  const invalidOpponentPiece = isOpponentPiece && !isActionMove
  const invalidOwnPiece = isPlayerPiece && isActionMove

  const invalidDrop = isDropAction && hasPieceOnSquare
  const invalidMove =
    invalidOpponentPiece || invalidOwnPiece || invalidDrop || isEmptySelection

  return {
    hasPieceOnSquare,
    isPlayerPiece,
    isOpponentPiece,
    isActionMove,
    isDropAction,
    invalidOpponentPiece,
    invalidOwnPiece,
    invalidDrop,
    invalidMove,
  }
}

export function checkIsPossibleMove({ squareX, squareY }, possibleMoves) {
  if (Array.isArray(possibleMoves)) {
    const filter = possibleMoves.filter(
      ({ to }) => to.x === squareX && to.y === squareY
    )
    return filter.length > 0
  }
  return false
}

export function getMoveAction({ square, moveAction, turn, color }) {
  const {
    invalidOwnPiece,
    invalidDrop,
    invalidOpponentPiece,
    invalidMove,
    isDropAction,
    isOpponentPiece,
    isActionMove,
  } = getMoveResponse({
    moveAction,
    turn,
    color,
  })

  const { squareX, squareY } = getSquareByInternationalSlug(square)
  const canPieceMoveToSquare = checkIsPossibleMove(
    { squareX, squareY },
    moveAction.moves
  )

  if (invalidOwnPiece) return 'invalid:ownPiece'
  if (invalidDrop) return 'invalid:drop'
  if (invalidOpponentPiece) return 'invalid:opponentPiece'
  if (invalidMove) return 'invalid:move'
  if (isDropAction) return 'valid:drop'
  if (canPieceMoveToSquare && isOpponentPiece) return 'valid:capture'
  if (canPieceMoveToSquare && isActionMove) return 'valid:move'
  if (isOpponentPiece) return 'invalid:opponentPiece'
  return 'valid:selection'
}

export function getEnemyCampRowData({ turn }) {
  if (turn === 0)
    return {
      startRow: 1,
      endRow: 3,
    }

  return {
    startRow: 7,
    endRow: 9,
  }
}

export function isPieceOnEnemyCamp({ turn, squareY }) {
  const { startRow, endRow } = getEnemyCampRowData({ turn })
  if (squareY >= startRow && squareY <= endRow) return true
}

export function canPromoteByKind(kind) {
  const promotedKind =
    {
      FU: 'TO',
      KY: 'NY',
      KE: 'NK',
      GI: 'NG',
      KA: 'UM',
      HI: 'RY',
    }[kind] || kind

  return promotedKind !== kind
}

export function getGamePlayerTurn(checkGame, userId) {
  if (['SEARCHING', 'LOADING'].includes(checkGame.status)) return 0
  if (checkGame?.player1 === userId) return 0
  if (checkGame?.player2 === userId) return 1
  return null
}

export function getOpponentTurnByPlayer(playerTurn) {
  return playerTurn === 0 ? 1 : 0
}

export function getLastMove(moves = []) {
  if (moves.length > 0) return moves[moves.length - 1]
  return { sfen: defaultSfen, square: null }
}

export function getMatchPlayerByTurn(players, turn) {
  return { ...players[turn], turn }
}
