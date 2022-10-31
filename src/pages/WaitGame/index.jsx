import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

const WaitGame = () => {
  const { GAME_TYPE } = useParams()

  async function findGameToPlay() {
    console.log('Find by GAME_TYPE', GAME_TYPE)
  }

  useEffect(() => {
    if (GAME_TYPE) findGameToPlay()
  }, [])

  return (
    <Container>
      <Typography variant='subtitle1' textAlign='center'>
        Wainting game {`${GAME_TYPE}`}
      </Typography>
    </Container>
  )
}

export default WaitGame
