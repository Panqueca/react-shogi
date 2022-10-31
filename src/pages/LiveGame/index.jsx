import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { findGameById } from '@api/games'
import MatchBoard from '@components/MatchBoard'
import useLoadings from '@hooks/useLoadings'
import useShogiEngine from '@hooks/useShogiEngine'
import useWindowSize from '@hooks/useWindowSize'

const initialGameState = {}

const LiveGame = () => {
  const { loading, changeLoading } = useLoadings({
    game: true,
  })
  const { gameMatch } = useShogiEngine({})
  const [game, setGame] = useState(initialGameState)
  const { GAME_ID } = useParams()
  const { boardSize } = useWindowSize()

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

  console.log({ game })

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

export default LiveGame
