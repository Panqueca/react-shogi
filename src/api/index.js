import axios from 'axios'

const configApiNode = {
  baseURL: 'http://localhost:8000',
  headers: {
    common: { Authorization: null },
  },
  withCredentials: true,
}

export const apiNode = axios.create(configApiNode)
