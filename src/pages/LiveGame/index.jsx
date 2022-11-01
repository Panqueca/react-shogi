import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container, Dialog } from '@mui/material'
import { findGameById } from '@api/games'
import { useAuthState } from '@context/AuthContext'
import MatchBoard from '@components/MatchBoard'
import useLoadings from '@hooks/useLoadings'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import { getDialogInfoByNotificationSlug } from '@utils/gameMessages'

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

const defaultSfen =
  'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1'

const LiveGame = () => {
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
  const { GAME_ID } = useParams()
  const { boardSize } = useWindowSize()
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
  }, [])

  function getLastMove() {
    const { moves } = game
    if (moves.length > 0) return moves[moves.length - 1]
    return { sfen: defaultSfen, square: null }
  }

  function getLastSfen() {
    return getLastMove().sfen
  }

  function getClientSideByGame(game) {
    const { player1, player2, status } = game

    if (status === 'SEARCHING' || status === 'LOADING') return 'SENTE'
    if (player1 && player1 === user._id) return 'SENTE'
    if (player2 && player2 === user._id) return 'GOTE'
    return null
  }

  function getClientPlayerSide() {
    return getClientSideByGame(game)
  }

  function getPlayerTurnSide() {
    const { turn } = game
    return turn === 0 ? 'SENTE' : 'GOTE'
  }

  function getOpponent() {
    if (player1 && player1 === user._id) return player2
    if (player2 && player2 === user._id) return player1
    return null
  }

  function checkGameIsMyTurn(game) {
    const { turn } = game

    return { isMyTurn: getClientPlayerSide() === turn, turn }
  }

  function checkIsMyTurn() {
    return checkGameIsMyTurn(game).isMyTurn
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
        resetGame()
        resetDialog()
      },
      onCancel: resetDialog,
      confirmText: 'Resign',
      cancelText: 'Cancel',
    })
  }

  const {
    gameMatch,
    targetTile,
    touchTargetTile,
    moveAction,
    selectHandPiece,
    resetGame,
  } = useShogiEngine({
    listenNotification,
    saveGameMove,
    sfenPosition: getLastSfen(),
  })

  console.log({ game })

  return (
    <Container>
      {loading.game && 'loading...'}
      {!loading.game && (
        <MatchBoard
          hands={gameMatch.hands}
          board={gameMatch.board}
          handleMovePiece={touchTargetTile}
          possibleMoves={moveAction.moves}
          selectHandPiece={selectHandPiece}
          targetTile={targetTile}
          lastMove={getLastMove()}
          width={boardSize}
          height={boardSize}
          effectDialog={effectDialog}
          callSurrender={callSurrender}
          currentPlayer={'user'}
          currentPlayerSide={getClientPlayerSide()}
          currentTurnPlayer={getPlayerTurnSide()}
          opponentPlayer={getOpponent()}
          isMyTurn={checkIsMyTurn()}
          isGameRunning={game.status === 'STARTED'}
          clocks={clocks}
          fetchSetGameData={findGameState}
          loading={game.status === 'LOADING'}
        />
      )}
      {dialog.open && <Dialog open={dialog.open} onClose={dialog.close} />}
    </Container>
  )
}

export default LiveGame
