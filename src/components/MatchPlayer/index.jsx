import { Grid, Typography } from '@mui/material'

const MatchPlayer = ({ name, clock, side }) => {
  return (
    <Grid container justifyContent='space-between'>
      <Grid item>
        <Typography variant='subtitle2'>
          ({`${side === 0 ? 'SENTE' : 'GOTE'}`}) {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='subtitle2'>{clock.secondsLeft}</Typography>
      </Grid>
    </Grid>
  )
}

export default MatchPlayer
