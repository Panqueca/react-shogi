import { createContext, useContext } from 'react'
import { createTheme } from '@mui/material/styles'
import useLocalStorage from '@hooks/useLocalStorage'
import themesConfig from '@styles/themesConfig'
import { getGlobalStyles } from '@styles/globalStyles'

const ThemeContext = createContext({})
const defaultThemeState = {
  theme: 'default',
}

function ThemeProvider({ children }) {
  const [themeState, setThemeState] = useLocalStorage(
    '@ShogiBattles:themeState',
    defaultThemeState
  )

  function getThemeByName(name) {
    if (themesConfig[name]) return themesConfig[name]

    return themesConfig.default
  }

  const theme = createTheme(getThemeByName(themeState.theme))

  return (
    <ThemeContext.Provider
      value={{
        theme,
        globalStyles: getGlobalStyles(theme),
        setThemeState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

function useThemeState() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeState must be used with ThemeContext')

  return context
}

export { ThemeProvider, useThemeState }
