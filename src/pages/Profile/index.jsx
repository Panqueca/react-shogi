import { Container, Grid, Paper, Typography } from '@mui/material'

const Games = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Paper>
            <Typography variant='h6'>Details</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography variant='h6'>Games</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Games
