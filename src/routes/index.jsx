import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from '@mui/material'
import ResponsiveAppBar from '@components/ResponsiveAppBar'
import Homepage from '@pages/Homepage'
import Login from '@pages/Login'
import SignUp from '@pages/SignUp'
import Games from '@pages/Games'
import PlayGame from '@pages/PlayGame'
import WaitGame from '@pages/WaitGame'
import LiveGame from '@pages/LiveGame'
import Profile from '@pages/Profile'
import ProtectedRoute from './ProtectedRoute'

const Routes = () => {
  return (
    <Grid container flexDirection='column'>
      <Grid item width='100%'>
        <ResponsiveAppBar />
      </Grid>
      <Grid item width='100%' style={{ minHeight: '80%' }}>
        <Switch>
          <ProtectedRoute path='/' exact component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <ProtectedRoute path='/homepage' component={Homepage} />
          <ProtectedRoute path='/games' component={Games} />
          <ProtectedRoute path='/wait-game/:GAME_TYPE' component={WaitGame} />
          <ProtectedRoute path='/play' exact component={PlayGame} />
          <ProtectedRoute path='/play/:GAME_ID' component={LiveGame} />
          <ProtectedRoute path='/profile' component={Profile} />
        </Switch>
      </Grid>
    </Grid>
  )
}

export default Routes
