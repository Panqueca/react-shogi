import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import Logo from '@assets/app_logo.jpg'
import { useAuthState } from '@context/AuthContext'
import { PageContainer, GridBox } from './style'

const AuthLoadingController = () => {
  const {
    userId,
    isAuthenticated,
    isInitialLoading,
    sessionLogout,
    isLoadingSession,
  } = useAuthState()
  const history = useHistory()

  const showLoadingMessage =
    isAuthenticated && isLoadingSession && isInitialLoading
  const showLockedAppMessage = userId && !isAuthenticated

  function logout() {
    sessionLogout(() => {
      history.push('/login')
    })
  }

  function reload() {
    history.go(0)
  }

  const Container = ({ children }) => {
    return (
      <PageContainer>
        <center>
          <GridBox>
            <img src={Logo} alt='SHOGI BATTLES' height={150} />
            <div>{children}</div>
          </GridBox>
        </center>
      </PageContainer>
    )
  }

  if (showLoadingMessage)
    return (
      <Container>
        <h1>Loading your account...</h1>
        <Button
          gradient
          name='Refresh'
          onClick={() => {
            window.location.reload()
          }}
        />
      </Container>
    )

  if (showLockedAppMessage)
    return (
      <Container>
        <h1>You are not logged yet!</h1>
        <h4>Create here your account and start playing shogi</h4>
        <Link to='/login'>
          <Button>Create account</Button>
        </Link>
        <p>
          <a onClick={logout}>Already have an account?</a>
        </p>

        <p style={{ paddingTop: '30px', textAlign: 'center' }}>
          <a onClick={reload}>Reload page</a>
        </p>
      </Container>
    )

  return null
}

export default AuthLoadingController
