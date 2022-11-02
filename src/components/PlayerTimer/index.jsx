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

  if (!isRunning) console.log({ minutes, clock })

  const getSeconds = seconds > 9 ? seconds : `0${seconds}`

  return (
    <Box
      sx={{
        opacity: isRunning ? 1 : 0.5,
        backgroundColor: 'background.lightPaper',
        p: 0.5,
        borderRadius: 1,
      }}
    >
      <Typography
        variant='body2'
        fontSize={16}
      >{`${minutes}:${getSeconds}`}</Typography>
    </Box>
  )
}

export default PlayerTimer
