import React from 'react'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { ThemeProvider } from '@context/ThemeContext'
import { UserConfigProvider } from '@context/UserConfigContext'
import App from './App'

function AppProvider() {
  return (
    <HashRouter>
      <AuthProvider>
        <UserConfigProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UserConfigProvider>
      </AuthProvider>
    </HashRouter>
  )
}

export default AppProvider
