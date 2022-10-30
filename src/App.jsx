import React from 'react'
import { HashRouter } from 'react-router-dom'
import GlobalStyle from './styles/global'
import { AuthProvider } from '@context/AuthContext'
import { UserConfigProvider } from '@context/UserConfigContext'
import TitleBar from './Components/Titlebar'
import Routes from './routes'
import AuthController from './AuthController'
import AuthLoadingController from './pages/AuthLoadingController'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AuthController />
        <AuthLoadingController />
        <TitleBar />
        <UserConfigProvider>
          <Routes />
        </UserConfigProvider>
      </AuthProvider>
      <GlobalStyle />
    </HashRouter>
  )
}

export default App
