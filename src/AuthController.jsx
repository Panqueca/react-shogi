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
    if (!user?.email) return history.push('/')
    return history.push('/login')
  }

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoadingSession &&
      history.location.pathname !== '/'
    )
      handleRedirect()
  }, [isLoadingSession, isAuthenticated])

  useEffect(() => {
    handleIsSessionAuthenticated()
  }, [user, isAuthenticated, authToken])

  return null
}

export default AuthController
