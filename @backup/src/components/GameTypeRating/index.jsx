import React from 'react'
import { GiSilverBullet } from 'react-icons/gi'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Box, Typography } from '@mui/material'

const Icon = ({ type }) => {
  const validType = type.split('_')[0]

  let icon = '...'

  if (validType === 'BULLET') icon = <GiSilverBullet />
  if (validType === 'BLITZ') icon = <BsFillLightningChargeFill />
  if (validType === 'RAPID') icon = <AiOutlineClockCircle />

  return <Box sx={{ backgroundColor: 'success.dark', p: 1 }}>{icon}</Box>
}

const GameTypeRating = ({ type, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid',
        borderColor: 'success.dark',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Icon type={type} />
      <Typography
        variant='body2'
        fontWeight='bold'
        sx={{ p: 1, backgroundColor: 'background.default' }}
      >
        {value}
      </Typography>
    </Box>
  )
}

export default GameTypeRating
