import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Grid } from '@mui/material'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider } from '@mui/material/styles'
import { useThemeState } from '@context/ThemeContext'
import Routes from './routes'
import AuthController from './AuthController'
import AuthLoadingController from './pages/AuthLoadingController'

function App() {
  const { theme, globalStyles } = useThemeState()

  return (
    <ThemeProvider theme={theme}>
      <AuthController />
      <AuthLoadingController />
      <Grid
        container
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'background.default',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <Routes />
        <GlobalStyles styles={globalStyles} />
      </Grid>
    </ThemeProvider>
  )
}

export default App
