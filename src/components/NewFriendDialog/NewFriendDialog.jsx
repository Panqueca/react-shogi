import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function NewFriendDialog({
  open = false,
  handleClose,
  handleConfirm,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your friend's nickname to add them as a friend.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Player nickname'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
