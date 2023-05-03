import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from '@context/AuthContext'

const AuthController = () => {
  const {
    user,
    isAuthenticated,
    isLoadingSession,
    authToken,
    handleIsSessionAuthenticated,
  } = useAuthState()
  const history = useHistory()

  function handleRedirect() {
    return history.push('/login')
  }

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoadingSession &&
      history.location.pathname !== '/login'
    )
      handleRedirect()
  }, [isLoadingSession, isAuthenticated])

  useEffect(() => {
    handleIsSessionAuthenticated()
  }, [authToken])

  return null
}

export default AuthController
