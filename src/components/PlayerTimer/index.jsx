import React, { useEffect } from 'react'
import moment from 'moment'
import { useTimer } from 'react-timer-hook'
import { Box, Typography } from '@mui/material'

const PlayerTimer = ({ clock, onExpire = () => {} }) => {
  const { secondsLeft, isRunning } = clock || {}
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: null,
    onExpire,
  })

  useEffect(() => {
    const momentDate = moment(new Date())
    const expire = momentDate.add(secondsLeft, 'seconds')
    restart(expire, isRunning)
  }, [isRunning, secondsLeft])

  const getSeconds = seconds > 9 ? seconds : `0${seconds}`

  return (
    <Box
      sx={{
        opacity: isRunning ? 1 : 0.5,
        backgroundColor: 'background.contrast.paper',
        p: 0.5,
        px: 1,
        borderRadius: 1,
      }}
    >
      <Typography
        variant='body2'
        fontSize={18}
        color='text.contrast'
        fontWeight='500'
      >{`${minutes}:${getSeconds}`}</Typography>
    </Box>
  )
}

export default PlayerTimer
