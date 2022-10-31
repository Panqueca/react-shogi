import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TextField, Grid, Button, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { isValidLogin } from '@utils/login'
import useLoadings from '@hooks/useLoadings'
import { useAuthState } from '@context/AuthContext'
import Logo from '@assets/app_logo.jpg'

export default function Login() {
  const { saveLoginSession, isAuthenticated } = useAuthState()
  const { loading, changeLoading } = useLoadings({ submit: false })
  const [form, setForm] = useState({ email: '', password: '' })
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) history.push('/games')
  }, [isAuthenticated])

  function onChange(key, value) {
    setForm((current) => {
      return {
        ...current,
        [key]: value,
      }
    })
  }

  async function onSubmit() {
    changeLoading({ submit: true })

    let hasErrors = false
    const defaultError = 'Unexpected error trying to login'

    const { authToken, error } = await saveLoginSession(form)

    if (authToken) {
      toast.success('Logged in')
    } else {
      hasErrors = error || defaultError
    }

    if (hasErrors) toast.error(hasErrors)
    changeLoading({ submit: false })
  }

  const canSubmit = isValidLogin({ ...form }) && !loading.submit

  return (
    <Grid
      container
      gap={3}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
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
            id='login-email'
            label='Email'
            variant='outlined'
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <TextField
            id='login-password'
            label='Password'
            type='password'
            variant='outlined'
            value={form.password}
            onChange={(e) => onChange('password', e.target.value)}
          />
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {`Login${loading.submit ? '...' : ''}`}
          </Button>
          <Link to='/signup'>
            <Button sx={{ width: '100%' }}>Sign Up</Button>
          </Link>
        </Grid>
      </Grid>
      <ToastContainer />
    </Grid>
  )
}
