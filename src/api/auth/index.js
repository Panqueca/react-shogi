import { apiNode } from '@api'

export async function createAccount({ email, password }) {
  try {
    const { data: response } = await apiNode.post(
      '/api/authenticate/create-account',
      {
        email,
        password,
      }
    )

    return {
      token: response.token,
      error: response.message,
      user: response.user,
    }
  } catch (err) {
    return {
      token: null,
      error:
        err?.response?.data?.message ||
        'Unexpected error trying to create account',
    }
  }
}

export async function signAuthentication({ email, password }) {
  try {
    const { data: response } = await apiNode.post('/api/authenticate/login', {
      email,
      password,
    })

    return response
  } catch (err) {
    return {
      token: null,
      error: err?.response?.data?.message || 'Unexpected error trying to login',
    }
  }
}

export async function checkIsAuthenticated() {
  try {
    const { data: response } = await apiNode.get(
      '/api/authenticate/is-authenticated'
    )

    return response?.isAuthenticated
  } catch (err) {
    return false
  }
}

export async function checkHaveAccount({ email }) {
  try {
    const { data: response } = await apiNode.post(
      '/api/authenticate/have-account',
      {
        email,
      }
    )

    return { hasAccount: response }
  } catch (err) {
    return {
      hasAccount: false,
      error:
        err?.response?.data?.message ||
        'Unexpected error trying to check email address',
    }
  }
}
