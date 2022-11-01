import { createContext, useContext } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'
import useLoadings from '@hooks/useLoadings'
import { apiNode } from '@api'
import { signAuthentication, checkIsAuthenticated } from '@api/auth'

const AuthContext = createContext({})

const defaultAuthState = {
  isAuthenticated: false,
  user: {
    email: '',
    nickname: '',
  },
  authToken: null,
}

function AuthProvider({ children }) {
  const [authState, setAuthState] = useLocalStorage(
    '@ShogiBattles:authState',
    defaultAuthState
  )
  const { loading, changeLoading } = useLoadings({
    isLoadingSession: true,
  })

  async function setAuthToken({ email, password }) {
    const {
      token: authToken,
      user,
      error,
    } = await signAuthentication({
      email,
      password,
    })
    apiNode.defaults.headers.common.Authorization = `Bearer ${authToken}`

    return { authToken, user, error }
  }

  function saveTokenState({ authToken, user }) {
    setAuthState((current) => {
      return {
        ...current,
        isAuthenticated: true,
        authToken,
        user,
      }
    })
  }

  async function saveLoginSession({ email, password }) {
    const { authToken, user, error } = await setAuthToken({ email, password })
    // updates the login session deadline expiration
    if (authToken) saveTokenState({ authToken, user })

    changeLoading({ isLoadingSession: false })

    return { authToken, error }
  }

  function isAuthenticated() {
    if (!authState?.user?._id) return false
    if (!authState?.authToken) return false
    return authState.isAuthenticated
  }

  function sessionLogout(next) {
    setAuthState((current) => {
      return {
        ...current,
        isAuthenticated: false,
        authToken: null,
      }
    })
    changeLoading({ isLoadingSession: false })

    if (typeof next === 'function') next()
  }

  async function handleIsSessionAuthenticated() {
    changeLoading({ isLoadingSession: true })

    const sessionAuthenticated = await checkIsAuthenticated()
    if (!sessionAuthenticated) sessionLogout()

    changeLoading({ isLoadingSession: false })
  }

  function areProtectedRoutesBlocked() {
    return loading.isLoadingSession || !isAuthenticated()
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        saveLoginSession,
        sessionLogout,
        isAuthenticated: isAuthenticated(),
        areProtectedRoutesBlocked,
        authToken: authState.authToken,
        saveTokenState,
        handleIsSessionAuthenticated,
        ...loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuthState() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthState must be used with AuthContext')

  return context
}

export { AuthProvider, useAuthState }
