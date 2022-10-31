import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import { getGameTypeOptions } from '@utils/games'

const GameTypeOptions = () => {
  return (
    <Grid container gap={1} justifyContent='center' width='100%'>
      {getGameTypeOptions().map(({ value, label }) => {
        return (
          <Link key={value} to={`/wait-game/${value}`}>
            <Button variant='contained'>{label}</Button>
          </Link>
        )
      })}
    </Grid>
  )
}

export default GameTypeOptions
