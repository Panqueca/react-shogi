import { createContext, useContext, useState } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'

const UserConfigContext = createContext({})
const defaultUserConfigState = {}

function UserConfigProvider({ children }) {
  const [userConfigState, setUserConfigState] = useLocalStorage(
    '@ShogiBattles:userConfigState',
    defaultUserConfigState
  )
  const [isLoading, setIsLoading] = useState(false)

  function updateSingleConfigState(key, value) {
    setUserConfigState({
      ...userConfigState,
      [key]: value,
    })
  }

  function getUserConfig() {
    if (!userConfigState) setUserConfigState(defaultUserConfigState)
    return userConfigState
  }

  const userConfig = getUserConfig()

  return (
    <UserConfigContext.Provider
      value={{
        userConfig,
        updateSingleConfigState,
        setUserConfigState,
        hasIntegrations: () => {
          return userConfig?.web3Integrations?.length > 0
        },
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserConfigContext.Provider>
  )
}

function useUserConfigState() {
  const context = useContext(UserConfigContext)
  if (!context)
    throw new Error('useUserConfigState must be used with UserConfigContext')

  return context
}

export { UserConfigProvider, useUserConfigState }
