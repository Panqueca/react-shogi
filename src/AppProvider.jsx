import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { ThemeProvider } from '@context/ThemeContext'
import { UserConfigProvider } from '@context/UserConfigContext'
import App from './App'

function AppProvider() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserConfigProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UserConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppProvider
