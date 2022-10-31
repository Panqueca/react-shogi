import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import useLoadings from '@hooks/useLoadings'
import { playGame } from '@api/games'

const WaitGame = () => {
  const { loading, changeLoading } = useLoadings({
    game: false,
  })
  const { GAME_TYPE } = useParams()
  const history = useHistory()

  async function findGameToPlay() {
    if (!loading.game) {
      changeLoading({ game: true })

      const { data: response } = await playGame(GAME_TYPE)
      if (response.status === 'GAME_FOUND')
        history.push(`/play/${response._id}`)

      changeLoading({ game: false })
    }
  }

  useEffect(() => {
    if (GAME_TYPE) findGameToPlay()
  }, [])

  return (
    <Container>
      {loading.game && 'loading...'}
      {!loading.game && (
        <Typography variant='subtitle1' textAlign='center'>
          Wainting game {`${GAME_TYPE}`}
        </Typography>
      )}
    </Container>
  )
}

export default WaitGame
