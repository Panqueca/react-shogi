import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from '@context/AuthContext'
import { socket } from '@api/websockets'

const AuthController = () => {
  const {
    userId,
    isAuthenticated,
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
    socket.on(getSocketLogoutEvent(userId), (payload) => {
      if (authToken === payload.token) sessionLogout()
    })
  }

  function handleRedirect() {
    if (!userId) return history.push('/')
    return history.push('/login')
  }

  useEffect(() => {
    if (!isAuthenticated && history.location.pathname !== '/') handleRedirect()
  }, [isAuthenticated])

  useEffect(() => {
    if (userId && isAuthenticated) {
      // Initial session authentication
      handleAuthSession()
    }
  }, [userId, isAuthenticated, authToken])

  return null
}

export default AuthController
