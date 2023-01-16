import { Container, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { useAuthState } from '@context/AuthContext'
import { findUserGames } from '@api/games'

const Games = () => {
  const { user } = useAuthState()
  const { _id } = user

  const { isLoading, error, data } = useQuery(['playerGames', _id], () =>
    findUserGames({ _id })
  )

  console.log({ _id, isLoading, error, data })

  return (
    <Container>
      <Typography variant='subtitle1' textAlign='center'>
        Profile
      </Typography>
    </Container>
  )
}

export default Games
