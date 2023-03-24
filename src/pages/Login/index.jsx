import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TextField, Grid, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { isValidLogin, validateEmail } from '@utils/login'
import { checkHaveAccount } from '@api/auth'
import useLoadings from '@hooks/useLoadings'
import { useAuthState } from '@context/AuthContext'
import Logo from '@assets/app_logo.jpg'

export default function Login() {
  const { saveLoginSession, isAuthenticated, user } = useAuthState()
  const { loading, changeLoading } = useLoadings({ submit: false })
  const [form, setForm] = useState({ email: user?.email || '', password: '' })
  const [userHasAccount, setUserHasAccount] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) history.push('/homepage')
  }, [isAuthenticated])

  function onChange(key, value) {
    setForm((current) => {
      return {
        ...current,
        [key]: value,
      }
    })
  }

  async function onCheckAccount() {
    changeLoading({ submit: true })

    const { hasAccount, error } = await checkHaveAccount({ email: form.email })

    if (error) toast.error(error)
    else if (!hasAccount) setUserHasAccount(false)
    if (hasAccount) setUserHasAccount(true)

    changeLoading({ submit: false })
  }

  function onCreateAccount() {
    history.push(`/signup/${form.email}`)
  }

  async function onSubmit() {
    if (isValidLogin({ ...form })) {
      changeLoading({ submit: true })

      let hasErrors = false
      const defaultError = 'Unexpected error trying to login'

      const { authToken, error } = await saveLoginSession(form)

      if (authToken) {
        toast.success('Logged in', { toastId: 'login-success-message' })
      } else {
        hasErrors = error || defaultError
      }

      if (hasErrors) toast.error(hasErrors, { toastId: 'login-error-message' })
      changeLoading({ submit: false })
    }
  }

  function enterKeyPressed(e) {
    if (e.keyCode == 13) {
      if (userHasAccount) {
        onSubmit()
      } else if (userHasAccount === false) {
        onCreateAccount()
      } else {
        onCheckAccount()
      }
    }
  }

  const canSubmit = isValidLogin({ ...form }) && !loading.submit

  return (
    <Grid
      container
      gap={3}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      style={{ height: '100%' }}
    >
      <Grid item sx={{ textAlign: 'center' }}>
        <img src={Logo} alt='' />
        <Typography variant='subtitle1' sx={{ p: 2, px: 0 }}>
          Play & Learn Shogi Online
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
      >
        <Grid
          item
          container
          flexDirection='column'
          gap={2}
          xs={10}
          sm={6}
          lg={2}
        >
          <TextField
            data-cy='login-email-input'
            label='Email'
            variant='outlined'
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            onKeyDown={enterKeyPressed}
            autoFocus
          />
          {userHasAccount && (
            <TextField
              data-cy='login-password-input'
              label='Password'
              type='password'
              variant='outlined'
              value={form.password}
              onChange={(e) => onChange('password', e.target.value)}
              onKeyDown={enterKeyPressed}
              autoFocus
            />
          )}
          {userHasAccount === null && (
            <Button
              sx={{ width: '100%' }}
              variant='contained'
              disabled={!validateEmail(form.email)}
              onClick={onCheckAccount}
              data-cy='login-continue-btn'
            >
              {`Continue${loading.submit ? '...' : ''}`}
            </Button>
          )}
          {userHasAccount === false && (
            <Button
              sx={{ width: '100%' }}
              variant='contained'
              onClick={onCreateAccount}
              data-cy='login-create-btn'
            >
              Create your account here
            </Button>
          )}
          {userHasAccount && (
            <Button
              sx={{ width: '100%' }}
              variant='contained'
              disabled={!canSubmit}
              onClick={onSubmit}
              data-cy='login-submit-btn'
            >
              {`Login${loading.submit ? '...' : ''}`}
            </Button>
          )}
          <Link to='/signup'>
            <Button sx={{ width: '100%' }}>Sign Up</Button>
          </Link>

          <Link to='/forgot-password'>
            <Typography variant='body1' color='secondary'>
              Forgot your password?
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
