import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from '@mui/material'
import { useAuthState } from '@context/AuthContext'
import ResponsiveAppBar from '@components/ResponsiveAppBar'
import Homepage from '@pages/Homepage'
import Login from '@pages/Login'
import SignUp from '@pages/SignUp'
import Games from '@pages/Games'
import PlayGame from '@pages/PlayGame'
import Profile from '@pages/Profile'

const Routes = () => {
  const { areProtectedRoutesBlocked, isLoadingSession } = useAuthState()

  const protectedRoute = (Component) => {
    if (isLoadingSession) return null
    if (areProtectedRoutesBlocked()) return Login
    return Component
  }

  return (
    <Grid container flexDirection='column' flexFlow='row wrap'>
      <Grid item width='100%'>
        <ResponsiveAppBar />
      </Grid>
      <Grid item width='100%' style={{ minHeight: '80%' }}>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/homepage' component={protectedRoute(Homepage)} />
          <Route path='/games' component={protectedRoute(Games)} />
          <Route path='/play' component={protectedRoute(PlayGame)} />
          <Route path='/profile' component={protectedRoute(Profile)} />
        </Switch>
      </Grid>
    </Grid>
  )
}

export default Routes
