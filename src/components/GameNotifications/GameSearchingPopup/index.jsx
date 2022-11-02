import {
  Grid,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  Typography,
} from '@mui/material'

const GameSearchingPopup = ({ dialog, resetDialog, confirmAbortGame }) => {
  return (
    <Dialog
      open={dialog.open}
      onClose={resetDialog}
      aria-labelledby='game-searching-dialog'
    >
      <DialogTitle id='game-searching-dialog'>{dialog.title}</DialogTitle>
      <DialogContent>
        <Typography variant='body1' align='center'>
          Show loading here...
        </Typography>
        <Grid container justifyContent='center' py={3}>
          <Button variant='outlined' onClick={confirmAbortGame}>
            Cancel
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default GameSearchingPopup
