import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '@context/AuthContext'
import { ThemeProvider } from '@context/ThemeContext'
import { UserConfigProvider } from '@context/UserConfigContext'
import { SkinProvider } from '@context/SkinContext'
import App from './App'

const queryClient = new QueryClient()

function AppProvider() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserConfigProvider>
          <ThemeProvider>
            <SkinProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </SkinProvider>
          </ThemeProvider>
        </UserConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppProvider
