import { Link } from 'react-router-dom'
import {
  Grid,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  Typography,
  Avatar,
} from '@mui/material'
import { getGameTypeOptions } from '@utils/games'
import { getGravatar } from '@utils/users'

const GameFinishedPopup = ({
  dialog,
  resetDialog,
  game,
  players,
  isWinner,
}) => {
  const finishedGameTitle = isWinner
    ? 'Victory. You won!'
    : 'Game over. You lost!'
  const RATING = 5

  return (
    <Dialog
      open={dialog.open}
      onClose={resetDialog}
      aria-labelledby='game-finished-dialog'
    >
      <DialogTitle id='game-finished-dialog' align='center'>
        {dialog.title || finishedGameTitle}
      </DialogTitle>
      <DialogContent>
        <Grid display='flex' justifyContent='space-around' gap={1}>
          {players.length === 2
            ? players.map((player) => {
                const winner = player._id === game.winnerId
                return (
                  <Grid
                    item
                    key={player._id}
                    sx={{
                      backgroundColor: winner
                        ? 'background.paper'
                        : 'transparent',
                      borderRadius: 2,
                    }}
                    align='center'
                    xs={6}
                    p={1}
                    py={2}
                  >
                    <Avatar
                      alt={player.nickname}
                      src={getGravatar(player.email)}
                    />
                    <Typography variant='body2' fontWeight='500' pt={1}>
                      {player.nickname}
                    </Typography>
                    <Typography variant='h6'>
                      {`${winner ? '+' : '-'}${RATING}`}
                    </Typography>
                  </Grid>
                )
              })
            : null}
        </Grid>
        <Grid container py={3} justifyContent='center' gap={1}>
          {players.length === 2 && (
            <Button variant='outlined' disabled>
              Rematch
            </Button>
          )}
          <Link to={`/wait-game/${game.type}`}>
            <Button variant='contained' color='success'>
              {`New ${
                getGameTypeOptions().find(({ value }) => value === game.type)
                  ?.label || ''
              } Game`}
            </Button>
          </Link>
        </Grid>
        <Link to='/homepage'>
          <Typography variant='body1' color='secondary' textAlign='center'>
            Go to Homepage
          </Typography>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

export default GameFinishedPopup
