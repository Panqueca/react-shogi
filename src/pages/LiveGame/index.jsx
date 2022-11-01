import { useParams } from 'react-router-dom'
import { Container, Dialog } from '@mui/material'
import MatchBoard from '@components/MatchBoard'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import useLiveShogiMatch from '@hooks/useLiveShogiMatch'

const LiveGame = () => {
  const { GAME_ID } = useParams()
  const {
    game,
    loading,
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
      )}
      {dialog.open && <Dialog open={dialog.open} onClose={dialog.close} />}
    </Container>
  )
}

export default LiveGame
