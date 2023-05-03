import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Backdrop, CircularProgress } from '@mui/material'
import MatchBoard from '@components/MatchBoard'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import useLiveShogiMatch from '@hooks/useLiveShogiMatch'
import useLiveShogiWebsockets from '@hooks/useLiveShogiWebsockets'
import LiveGameDialogs from '@pages/LiveGame/LiveGameDialogs'

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
    clocks,
    findGameState,
    setRunningGame,
    dialog,
    resetDialog,
    players,
    confirmAbortGame,
    loading,
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
  const currentPlayer = getCurrentPlayer()
  const opponentPlayer = getOpponentPlayer()

  const { isConnected } = useLiveShogiWebsockets({
    GAME_ID,
    findGameState,
    listenNotification,
    setRunningGame,
    currentPlayer,
    onReconnect: findGameState,
  })

  useEffect(() => {
    if (game.status === 'ABORTED') listenNotification('ABORTED')
    if (game.status === 'SEARCHING') listenNotification('SEARCHING')
    if (!loading.game && game.status === 'GAME_FINISHED')
      listenNotification('GAME_FINISHED')
  }, [game?.status])

  function onPieceMove(params) {
    if (game.status === 'STARTED') touchTargetTile(params)
  }

  function handleSelectHandPiece(params) {
    console.log({ params })
    if (game.status === 'STARTED') selectHandPiece(params)
  }

  return (
    <Container>
      <Backdrop open={isConnected}>
        <CircularProgress />
      </Backdrop>
      <MatchBoard
        game={game}
        hands={gameMatch.hands}
        board={gameMatch.board}
        handleMovePiece={onPieceMove}
        possibleMoves={moveAction.moves}
        selectHandPiece={handleSelectHandPiece}
        targetTile={targetTile}
        lastMove={getLastMove()}
        width={boardSize}
        height={boardSize}
        effectDialog={effectDialog}
        callSurrender={callSurrender}
        currentPlayer={currentPlayer}
        opponentPlayer={opponentPlayer}
        clocks={clocks}
        fetchSetGameData={findGameState}
        tileSize={tileSize}
      />
      <LiveGameDialogs
        dialog={dialog}
        resetDialog={resetDialog}
        game={game}
        players={players}
        confirmAbortGame={confirmAbortGame}
        isWinner={getCurrentPlayer()._id === game.winnerId}
      />
    </Container>
  )
}

export default LiveGame
