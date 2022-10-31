import { Container, Grid, Typography, Paper } from '@mui/material'
import GameTypeOptions from '@components/GameTypeOptions'

const Games = () => {
  return (
    <Container>
      <Typography variant='h3' component='h1' textAlign='center' py={3}>
        Welcome to Shogi Battles
      </Typography>
      <Typography variant='body1' textAlign='center'>
        Here you can play real shogi battles and improve everyday with
        exercises, analysis tools, AI tips...
      </Typography>
      <Typography variant='h6' textAlign='center'>
        All to make you better at shogi billions of times faster.
      </Typography>
      <Grid container spacing={3} py={5} alignItems='stretch'>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography variant='h5' textAlign='center'>
              Start a new Shogi Battle
            </Typography>
            <Grid py={2}>
              <GameTypeOptions />
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography variant='h5' textAlign='center'>
              Improve your Skills
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography variant='h5' textAlign='center'>
              TOURNAMENTS
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography variant='h5' textAlign='center'>
              Learn Shogi
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Games
