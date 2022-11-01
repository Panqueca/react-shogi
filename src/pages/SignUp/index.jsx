import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TextField, Grid, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { isValidLogin } from '@utils/login'
import useLoadings from '@hooks/useLoadings'
import { createAccount } from '@api/auth'
import { useAuthState } from '@context/AuthContext'
import Logo from '@assets/app_logo.jpg'

export default function SignUp() {
  const { saveTokenState } = useAuthState()
  const { loading, changeLoading } = useLoadings({ submit: false })
  const [form, setForm] = useState({ email: '', password: '' })

  const history = useHistory()

  function onChange(key, value) {
    setForm((current) => {
      return {
        ...current,
        [key]: value,
      }
    })
  }

  async function onSubmit() {
    if (isValidLogin(form)) {
      changeLoading({ submit: true })

      let hasErrors = false
      const defaultError = 'Unexpected error trying to create account'

      try {
        const { token, user, error } = await createAccount(form)

        if (token) {
          toast.success('Account created')
          saveTokenState({ authToken: token, user })
          history.push('/homepage')
        } else {
          hasErrors = error || defaultError
        }
      } catch (err) {
        hasErrors = defaultError
      }

      if (hasErrors) toast.error(hasErrors)
      changeLoading({ submit: false })
    }
  }

  function enterKeyPressed(e) {
    if (e.keyCode == 13) onSubmit()
  }

  const canSubmit = isValidLogin(form) && !loading.submit

  return (
    <Grid
      container
      gap={3}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      sx={{ height: '100%' }}
    >
      <Grid item sx={{ textAlign: 'center' }}>
        <img src={Logo} alt='' />
        <Typography variant='subtitle1' sx={{ p: 2, px: 0 }}>
          Create your Shogi Battles account
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
            onKeyDown={enterKeyPressed}
          />
          <TextField
            id='login-password'
            label='Password'
            variant='outlined'
            type='password'
            value={form.password}
            onChange={(e) => onChange('password', e.target.value)}
            onKeyDown={enterKeyPressed}
          />
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {`Create account${loading.submit ? '...' : ''}`}
          </Button>
          <Link to='/login'>
            <Button sx={{ width: '100%' }} color='secondary'>
              Already have an account?
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
