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

    return { token: response?.token, error: response.message }
  } catch (err) {
    return { token: null }
  }
}

export async function signAuthentication({ email, password }) {
  try {
    const { data: response } = await apiNode.post('/api/authenticate/login', {
      email,
      password,
    })

    return response?.token
  } catch (err) {
    console.error(err)
  }

  return null
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
