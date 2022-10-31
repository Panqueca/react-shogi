import { useParams } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

const LiveGame = () => {
  const { GAME_ID } = useParams()

  return (
    <Container>
      <Typography variant='subtitle1' textAlign='center'>
        Live game {`${GAME_ID}`}
      </Typography>
    </Container>
  )
}

export default LiveGame
