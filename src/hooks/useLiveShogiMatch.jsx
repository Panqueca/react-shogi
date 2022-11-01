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

function useLiveShogiMatch({ GAME_ID, resetGame }) {
  const { user } = useAuthState()
  const [game, setGame] = useState(initialGameState)
  const [dialog, setDialog] = useState(defaultDialog)
  const [effectDialog, setEffectDialog] = useState(defaultEffectDialog)
  const [clocks] = useState({
    player1: {
      isRunning: false,
      expireSeconds: null,
    },
    player2: {
      isRunning: false,
      expireSeconds: null,
    },
  })
  const { loading, changeLoading } = useLoadings({
    game: true,
  })
  const { player1, player2 } = game

  async function findGameState() {
    changeLoading({ game: true })
    const { data: response } = await findGameById(GAME_ID)

    if (response?.game?._id) {
      setGame(response.game)
    } else {
      toast.error(
        response.message || 'Unexpected error while searching for game'
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
    if (['SEARCHING', 'LOADING'].includes(game.status)) return 0
    if (game?.player1 === user._id) return 0
    if (game?.player2 === user._id) return 1
    return null
  }

  function getOpponent() {
    if (game?.player1 === user._id) return player2
    if (game?.player2 === user._id) return player1
    return null
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
    getClientPlayerSide,
    getOpponent,
    checkIsMyTurn,
    clocks,
    findGameState,
    dialog,
  }
}

export default useLiveShogiMatch
