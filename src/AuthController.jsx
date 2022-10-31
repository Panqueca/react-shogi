import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from '@context/AuthContext'
import { socket } from '@api/websockets'

const AuthController = () => {
  const {
    user,
    isAuthenticated,
    isLoadingSession,
    isInitialLoading,
    authToken,
    sessionLogout,
    handleIsSessionAuthenticated,
  } = useAuthState()
  const history = useHistory()

  function getSocketLogoutEvent(address) {
    return `LOGOUT(${address})`
  }

  function handleAuthSession() {
    handleIsSessionAuthenticated()
    socket.on(getSocketLogoutEvent(user?.email), (payload) => {
      if (authToken === payload.token) sessionLogout()
    })
  }

  function handleRedirect() {
    if (!user?.email) return history.push('/')
    return history.push('/login')
  }

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoadingSession &&
      !isInitialLoading &&
      history.location.pathname !== '/'
    )
      handleRedirect()
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      // Initial session authentication
      handleAuthSession()
    }
  }, [user, isAuthenticated, authToken])

  return null
}

export default AuthController
