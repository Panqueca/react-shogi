import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { findGameById } from '@api/games'
import { useAuthState } from '@context/AuthContext'
import useLoadings from '@hooks/useLoadings'
import { getDialogInfoByNotificationSlug } from '@utils/gameMessages'
import {
  initialGameState,
  defaultClocks,
  defaultDialog,
  defaultEffectDialog,
  getGamePlayerTurn,
  getOpponentTurnByPlayer,
  getMatchPlayerByTurn,
  getLastMove,
} from '@utils/match'

function useLiveShogiMatch({ GAME_ID, resetGame }) {
  const [game, setGame] = useState(initialGameState)
  const [players, setPlayers] = useState([])
  const [clocks, setClocks] = useState(defaultClocks)
  const [dialog, setDialog] = useState(defaultDialog)
  const [effectDialog, setEffectDialog] = useState(defaultEffectDialog)
  const { loading, changeLoading } = useLoadings({
    game: true,
  })
  const { user } = useAuthState()

  function updateGameClocks(checkGame, secondsLeft) {
    const playerTurn = getGamePlayerTurn(checkGame, user._id)
    const opponentTurn = getOpponentTurnByPlayer(playerTurn)
    const gameIsActive = checkGame.status === 'STARTED'
    const clockState = [
      gameIsActive && checkGame.turn === 0,
      gameIsActive && checkGame.turn === 1,
    ]

    setClocks({
      currentPlayer: {
        secondsLeft: secondsLeft[playerTurn],
        isRunning: clockState[playerTurn],
      },
      opponentPlayer: {
        secondsLeft: secondsLeft[opponentTurn],
        isRunning: clockState[opponentTurn],
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

  function getCurrentPlayer() {
    const playerTurn = getGamePlayerTurn(game, user._id)
    return getMatchPlayerByTurn(players, playerTurn)
  }

  function getOpponentPlayer() {
    const opponentTurn = getOpponentTurnByPlayer(getCurrentPlayer().turn)
    return getMatchPlayerByTurn(players, opponentTurn)
  }

  function checkIsMyTurn() {
    return getCurrentPlayer().turn === game.turn
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
    effectDialog,
    callSurrender,
    getCurrentPlayer,
    getOpponentPlayer,
    checkIsMyTurn,
    clocks,
    findGameState,
    dialog,
    getLastMove: () => getLastMove(game),
  }
}

export default useLiveShogiMatch
