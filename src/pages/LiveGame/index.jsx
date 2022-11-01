import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'
import MatchBoard from '@components/MatchBoard'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import useLiveShogiMatch from '@hooks/useLiveShogiMatch'
import { socket } from '@api/websockets'

const LiveGame = () => {
  const { GAME_ID } = useParams()
  const {
    game,
    listenNotification,
    saveGameMove,
    getLastMove,
    effectDialog,
    callSurrender,
    getCurrentPlayer,
    getOpponentPlayer,
    checkIsMyTurn,
    clocks,
    findGameState,
    setRunningGame,
    dialog,
  } = useLiveShogiMatch({
    GAME_ID,
  })
  const {
    gameMatch,
    targetTile,
    touchTargetTile,
    moveAction,
    selectHandPiece,
  } = useShogiEngine({
    listenNotification,
    saveGameMove,
    sfenPosition: getLastMove().sfen,
  })
  const { boardSize, tileSize } = useWindowSize()

  useEffect(() => {
    socket.on(`GAME_STARTED${GAME_ID}`, async () => {
      await findGameState()
      console.log('started!')
    })

    socket.on(`GAME_UPDATE${GAME_ID}`, async ({ game, secondsLeft }) => {
      setRunningGame(game, secondsLeft)
    })

    socket.on(`GAME_FINISHED${GAME_ID}`, async () => {
      await findGameState()
      console.log('finished!')
    })
  }, [])

  function onPieceMove(params) {
    if (game.status === 'STARTED') touchTargetTile(params)
  }

  return (
    <Container>
      <MatchBoard
        hands={gameMatch.hands}
        board={gameMatch.board}
        handleMovePiece={onPieceMove}
        possibleMoves={moveAction.moves}
        selectHandPiece={selectHandPiece}
        targetTile={targetTile}
        lastMove={getLastMove()}
        width={boardSize}
        height={boardSize}
        effectDialog={effectDialog}
        callSurrender={callSurrender}
        currentTurnPlayer={game.turn}
        currentPlayer={getCurrentPlayer()}
        opponentPlayer={getOpponentPlayer()}
        isMyTurn={checkIsMyTurn()}
        isGameRunning={game.status === 'STARTED'}
        clocks={clocks}
        fetchSetGameData={findGameState}
        loading={game.status === 'LOADING'}
        tileSize={tileSize}
      />
      {dialog.open && (
        <Dialog open={dialog.open} onClose={dialog.onCancel}>
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogActions>
            <Button onClick={dialog.onCancel}>{dialog.cancelText}</Button>
            <Button onClick={dialog.onConfirm} color='success'>
              {dialog.confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  )
}

export default LiveGame
