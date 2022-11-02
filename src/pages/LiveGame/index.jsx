import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { socket } from '@api/websockets'
import MatchBoard from '@components/MatchBoard'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import useLiveShogiMatch from '@hooks/useLiveShogiMatch'
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
    checkIsMyTurn,
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

  useEffect(() => {
    socket.on(`GAME_STARTED${GAME_ID}`, async () => {
      await findGameState()
      listenNotification('GAME_STARTED')
    })

    socket.on(`GAME_UPDATE${GAME_ID}`, async ({ game, secondsLeft }) => {
      setRunningGame(game, secondsLeft)
    })

    socket.on(`GAME_FINISHED${GAME_ID}`, async ({ winnerId }) => {
      await findGameState()
      listenNotification(
        winnerId === currentPlayer._id ? 'YOU_WON' : 'YOU_LOST'
      )
    })
  }, [])

  useEffect(() => {
    if (game.status === 'ABORTED') listenNotification('ABORTED')
    if (game.status === 'SEARCHING') listenNotification('SEARCHING')
    if (!loading.game && game.status === 'GAME_FINISHED')
      listenNotification('GAME_FINISHED')
  }, [game?.status])

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
        currentPlayer={currentPlayer}
        opponentPlayer={opponentPlayer}
        isMyTurn={checkIsMyTurn()}
        isGameRunning={game.status === 'STARTED'}
        clocks={clocks}
        fetchSetGameData={findGameState}
        loading={!game._id}
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
