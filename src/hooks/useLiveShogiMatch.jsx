import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { findGameById, savePlayerMove, resignGame } from '@api/games'
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

  function setRunningGame(game, secondsLeft) {
    setGame(game)
    updateGameClocks(game, secondsLeft)
  }

  async function findGameState() {
    changeLoading({ game: true })
    const { data: response } = await findGameById(GAME_ID)

    if (response?.game?._id) {
      setRunningGame(response.game, response.secondsLeft)
      setPlayers(response.players)
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

    if (players.length === 0) return getMatchPlayerByTurn([user], 0)
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

  function callEffect({ display, delay, afterEffectNotification }) {
    setEffectDialog({ open: true, display })

    setTimeout(() => {
      setEffectDialog({ open: false, display: null })

      if (afterEffectNotification) listenNotification(afterEffectNotification)
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

    const {
      type,
      onConfirm,
      onCancel,
      display,
      delay = 500,
      afterEffectNotification,
    } = dialogInfo

    if (type === 'effect') {
      callEffect({ display, delay, afterEffectNotification })
    }

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
    } else if (type) {
      setDialog({ ...dialogInfo })
    }
  }

  async function saveGameMove({ sfen, squareX, squareY, kind }) {
    if (game.status === 'STARTED') {
      const { error } = await savePlayerMove({
        _id: game._id,
        sfen,
        squareX,
        squareY,
        kind,
      })
      if (error) toast.error(error)
    }
  }

  function canGameBeAborted() {
    return game.status === 'SEARCHING' || game?.moves.length < 2
  }

  function callSurrender() {
    const canAbort = canGameBeAborted()

    setDialog({
      open: true,
      title: canAbort ? 'Abort match?' : 'Are you shure you want to resign?',
      onConfirm: async () => {
        try {
          await resignGame({ _id: game._id })
          findGameState()
          resetDialog()
          if (typeof resetGame === 'function') resetGame()
        } catch (err) {
          console.error(err)
        }
      },
      onCancel: resetDialog,
      confirmText: canAbort ? 'Abort' : 'Resign',
      cancelText: 'Cancel',
    })
  }

  async function confirmAbortGame() {
    await resignGame({ _id: game._id })
    findGameState()
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
    setRunningGame,
    dialog,
    getLastMove: () => getLastMove(game.moves),
    resetDialog,
    players,
    confirmAbortGame,
  }
}

export default useLiveShogiMatch
