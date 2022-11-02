import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import GameSearchingPopup from '@components/GameNotifications/GameSearchingPopup'
import GameFinishedPopup from '@components/GameNotifications/GameFinishedPopup'

const LiveGameDialogs = ({
  dialog,
  resetDialog,
  game,
  players,
  confirmAbortGame,
  isWinner,
}) => {
  if (dialog.type === 'SEARCHING')
    return (
      <GameSearchingPopup
        dialog={dialog}
        resetDialog={resetDialog}
        confirmAbortGame={confirmAbortGame}
      />
    )

  if (['ABORTED', 'GAME_FINISHED'].includes(dialog.type))
    return (
      <GameFinishedPopup
        dialog={dialog}
        resetDialog={resetDialog}
        game={game}
        players={players}
        isWinner={isWinner}
      />
    )

  return (
    dialog.open && (
      <Dialog open={dialog.open} onClose={dialog.onCancel}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogActions>
          <Button onClick={dialog.onCancel}>{dialog.cancelText}</Button>
          <Button onClick={dialog.onConfirm} color='success'>
            {dialog.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  )
}

export default LiveGameDialogs
