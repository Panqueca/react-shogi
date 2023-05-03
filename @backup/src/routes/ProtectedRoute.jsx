import React from 'react'
import { Route } from 'react-router-dom'
import { useAuthState } from '@context/AuthContext'
import Login from '@pages/Login'

const ProtectedRoute = ({ path, exact, component }) => {
  const { areProtectedRoutesBlocked, isLoadingSession } = useAuthState()

  if (isLoadingSession) return null
  if (areProtectedRoutesBlocked())
    return <Route path={path} exact component={Login} />

  return <Route path={path} exact={exact} component={component} />
}

export default ProtectedRoute
