import axios from 'axios'

const authState = localStorage.getItem('@ShogiBattles:authState')
const { authToken } = JSON.parse(authState) || {}

const configApiNode = {
  headers: {
    common: { Authorization: authToken ? `Bearer ${authToken}` : '' },
  },
  withCredentials: true,
}

export const apiNode = axios.create(configApiNode)
