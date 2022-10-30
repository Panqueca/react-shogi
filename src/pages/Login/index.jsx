import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Grid, Button, Typography } from '@mui/material'
import Logo from '@assets/app_logo.jpg'

export default function Login() {
  return (
    <Grid
      container
      gap={3}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      sx={{ height: '100%' }}
    >
      <Grid item>
        <img src={Logo} alt='' />
        <Typography variant='subtitle1' sx={{ p: 2, px: 0 }}>
          Start Playing Shogi Battles
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
      >
        <Grid
          item
          container
          flexDirection='column'
          gap={2}
          sx={{ width: '200px' }}
        >
          <TextField id='login-email' label='Email' variant='outlined' />
          <TextField
            id='login-password'
            label='Password'
            variant='outlined'
            type='password'
          />
          <Button sx={{ width: '100%' }} variant='contained'>
            Login
          </Button>
          <Link to='/signup'>
            <Button sx={{ width: '100%' }}>Sign Up</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
