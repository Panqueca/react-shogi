import { apiNode } from '@api'

export async function signAuthentication() {
  try {
    const { data: response } = await apiNode.post('/api/authenticate/login', {})

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
