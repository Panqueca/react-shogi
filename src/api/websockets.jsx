import io from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SHOGI_BATTLES_API_HOST, {
  transports: ['websocket'],
})
