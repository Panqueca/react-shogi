import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { findGameById } from '@api/games'
import { useAuthState } from '@context/AuthContext'
import useLoadings from '@hooks/useLoadings'
import { getDialogInfoByNotificationSlug } from '@utils/gameMessages'
import { defaultSfen } from '@utils/match'

const initialGameState = {
  _id: null,
  winner: null,
  moves: [],
  status: 'LOADING',
  increment: 0,
  type: 'BLITZ_10',
}

const defaultDialog = {
  open: false,
  title: '',
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: '',
  cancelText: '',
}

const defaultEffectDialog = {
  open: false,
  display: null,
}

const defaultClocks = {
  currentPlayer: {
    isRunning: false,
    secondsLeft: 0,
  },
  opponentPlayer: {
    isRunning: false,
    secondsLeft: 0,
  },
}

function useLiveShogiMatch({ GAME_ID, resetGame }) {
  const { user } = useAuthState()
  const [game, setGame] = useState(initialGameState)
  const [players, setPlayers] = useState([])
  const [dialog, setDialog] = useState(defaultDialog)
  const [effectDialog, setEffectDialog] = useState(defaultEffectDialog)
  const [clocks, setClocks] = useState(defaultClocks)
  const { loading, changeLoading } = useLoadings({
    game: true,
  })

  function getGamePlayerSide(checkGame) {
    if (['SEARCHING', 'LOADING'].includes(checkGame.status)) return 0
    if (checkGame?.player1 === user._id) return 0
    if (checkGame?.player2 === user._id) return 1
    return null
  }

  function getOpponentSideByPlayer(playerSide) {
    return playerSide === 0 ? 1 : 0
  }

  function updateGameClocks(checkGame, secondsLeft) {
    const playerSide = getGamePlayerSide(checkGame)
    const opponentSide = getOpponentSideByPlayer(playerSide)
    const gameIsActive = checkGame.status === 'STARTED'

    setClocks({
      currentPlayer: {
        secondsLeft: secondsLeft[playerSide],
        isRunning: gameIsActive && checkGame.turn === playerSide,
      },
      opponentPlayer: {
        secondsLeft: secondsLeft[opponentSide],
        isRunning: gameIsActive && checkGame.turn === opponentSide,
      },
    })
  }

  async function findGameState() {
    changeLoading({ game: true })
    const { data: response } = await findGameById(GAME_ID)

    if (response?.game?._id) {
      setGame(response.game)
      setPlayers(response.players)
      updateGameClocks(response.game, response.secondsLeft)
    } else {
      toast.error(
        response?.message || 'Unexpected error while searching for game'
      )
    }

    changeLoading({ game: false })
  }

  useEffect(() => {
    if (GAME_ID) findGameState()
  }, [GAME_ID])

  function getLastMove() {
    const { moves } = game
    if (moves.length > 0) return moves[moves.length - 1]
    return { sfen: defaultSfen, square: null }
  }

  function getLastSfen() {
    return getLastMove().sfen
  }

  function getClientPlayerSide() {
    return getGamePlayerSide(game)
  }

  function getCurrentPlayer() {
    const playerSide = getClientPlayerSide()
    return { ...players[playerSide], side: playerSide }
  }

  function getOpponentPlayer() {
    const opponentSide = getOpponentSideByPlayer(getClientPlayerSide())
    return { ...players[opponentSide], side: opponentSide }
  }

  function checkIsMyTurn() {
    return getClientPlayerSide() === game.turn
  }

  function resetDialog() {
    setDialog(defaultDialog)
  }

  function callEffect({ display, delay }) {
    setEffectDialog({ open: true, display })

    setTimeout(() => {
      setEffectDialog({ open: false, display: null })
    }, delay)
  }

  function dialogActionCallback(response, params) {
    if (response === 'PROMOTE' || response === 'DONT_PROMOTE') {
      const { promote } = params
      promote(response === 'PROMOTE')
    }

    resetDialog()
  }

  function listenNotification(notificationSlug, params) {
    const dialogInfo = getDialogInfoByNotificationSlug(
      notificationSlug,
      (response) => dialogActionCallback(response, params)
    )

    const { type, onConfirm, onCancel } = dialogInfo

    if (type === 'dialog') {
      setDialog({
        ...dialogInfo,
        open: true,
        onConfirm: () => {
          onConfirm()
          resetDialog()
        },
        onCancel: () => {
          onCancel()
          resetDialog()
        },
      })
    }

    const { display, delay = 500 } = dialogInfo

    if (type === 'effect') {
      callEffect({ display, delay })
    }
  }

  async function saveGameMove({ sfen, squareX, squareY, kind }) {
    if (game.status === 'STARTED') {
      console.log('Save game move', { sfen, squareX, squareY, kind })
    }
  }

  function callSurrender() {
    setDialog({
      open: true,
      title: 'Are you shure you want to resign?',
      onConfirm: async () => {
        resetDialog()
        if (typeof resetGame === 'function') resetGame()
      },
      onCancel: resetDialog,
      confirmText: 'Resign',
      cancelText: 'Cancel',
    })
  }

  return {
    game,
    loading,
    changeLoading,
    listenNotification,
    saveGameMove,
    getLastSfen,
    getLastMove,
    effectDialog,
    callSurrender,
    getCurrentPlayer,
    getOpponentPlayer,
    checkIsMyTurn,
    clocks,
    findGameState,
    dialog,
  }
}

export default useLiveShogiMatch
