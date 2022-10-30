import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useAuthState } from '@context/AuthContext'
import Games from '@pages/Games'
import Login from '@pages/Login'
import SignUp from '@pages/SignUp'

const Routes = () => {
  const { areProtectedRoutesBlocked } = useAuthState()

  const protectedRoute = (Component) => {
    if (areProtectedRoutesBlocked()) return null
    return Component
  }

  return (
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/games' component={protectedRoute(Games)} />
    </Switch>
  )
}

export default Routes
