import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container, Grid, Typography } from '@mui/material'
import { findGameById } from '@api/games'

const initialGameState = {}

const LiveGame = () => {
  const [game, setGame] = useState(initialGameState)
  const { GAME_ID } = useParams()

  async function findGameState() {
    const { data: response } = await findGameById(GAME_ID)

    if (response?.game?._id) {
      setGame(response.game)
    } else {
      toast.error(
        response.message || 'Unexpected error while searching for game'
      )
    }
  }

  useEffect(() => {
    if (GAME_ID) findGameState()
  }, [])

  return (
    <Container>
      <Typography variant='subtitle1' textAlign='center'>
        Live game {`${GAME_ID}`}
      </Typography>
      <Grid
        container
        sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}
      >
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </Grid>
    </Container>
  )
}

export default LiveGame
