import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Paper,
  Typography,
} from '@mui/material'
import { useQuery } from 'react-query'
import { useAuthState } from '@context/AuthContext'
import { findUserGames } from '@api/player'
import GamesHistoryTable from '@components/GamesHistoryTable'

const Games = () => {
  const { user } = useAuthState()
  const { _id } = user

  const {
    isLoading,
    error,
    data: games,
  } = useQuery(['playerGames', _id], () => findUserGames({ _id }))

  console.log({ _id, isLoading, error, games })

  return (
    <Container fixed>
      <Grid container spacing={2} height='100vh' alignItems='stretch'>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ height: '100%' }}>
            <Grid container alignItems='center' flexDirection='column'>
              <Avatar
                alt='Remy Sharp'
                src='/static/images/avatar/1.jpg'
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant='h6'>Seth Hallam</Typography>
              <Typography variant='h8'>Subscriber</Typography>
            </Grid>
            <Grid container justifyContent='space-around'>
              <Grid item display='flex' alignItems='center' gap={1}>
                <Box sx={{ bgcolor: 'primary.main' }}>
                  <Icon>add_circle</Icon>
                </Box>
                <Box>
                  <Typography variant='h5'>1.23</Typography>
                  <Typography variant='body1'>Task Done</Typography>
                </Box>
              </Grid>
              <Grid item display='flex' alignItems='center' gap={1}>
                <Box sx={{ bgcolor: 'primary.main' }}>
                  <Icon>add_circle</Icon>
                </Box>
                <Box>
                  <Typography variant='h5'>1.23</Typography>
                  <Typography variant='body1'>Task Done</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='h5'>Details</Typography>
              <Typography variant='body1'>
                <strong>Username:</strong> @shallamb
              </Typography>
              <Typography variant='body1'>
                <strong>Billing Email:</strong> shallamb@hugedomains.com
              </Typography>
              <Typography variant='body1'>
                <strong>Status:</strong> Pending
              </Typography>
              <Typography variant='body1'>
                <strong>Role:</strong> Subscriber
              </Typography>
              <Typography variant='body1'>
                <strong>Language:</strong> English
              </Typography>
              <Typography variant='body1'>
                <strong>Country:</strong> Peru
              </Typography>
            </Grid>
            <Grid item display='flex' alignItems='center' gap={1}>
              <Button variant='contained'>Contained</Button>
              <Button variant='outlined' color='error'>
                Error
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography variant='h6'>Games</Typography>
          <GamesHistoryTable games={games} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Games
