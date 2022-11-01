import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from '@mui/material'
import useLoadings from '@hooks/useLoadings'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'
import { playGame } from '@api/games'
import MatchBoard from '@components/MatchBoard'

const WaitGame = () => {
  const { loading, changeLoading } = useLoadings({
    game: true,
  })
  const { gameMatch } = useShogiEngine({})
  const { GAME_TYPE } = useParams()
  const { boardSize } = useWindowSize()
  const history = useHistory()

  async function findGameToPlay() {
    changeLoading({ game: true })

    const { data: response } = await playGame(GAME_TYPE)
    if (response?._id) history.push(`/play/${response._id}`)

    changeLoading({ game: false })
  }

  useEffect(() => {
    if (GAME_TYPE) findGameToPlay()
  }, [])

  return (
    <Container>
      {loading.game && 'loading...'}
      {!loading.game && (
        <MatchBoard
          hands={gameMatch.hands}
          board={gameMatch.board}
          width={boardSize}
          height={boardSize}
          player1={null}
          player2={null}
          currentPlayerSide='SENTE'
        />
      )}
    </Container>
  )
}

export default WaitGame
