import { useState, useEffect } from 'react'
import { socket } from '@api/websockets'

const useLiveShogiWebsockets = ({
  GAME_ID,
  findGameState,
  listenNotification,
  setRunningGame,
  onReconnect,
}) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('reconnect', () => {
      setIsConnected(true)
      if (typeof onReconnect === 'function') onReconnect()
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on(`GAME_STARTED${GAME_ID}`, async () => {
      await findGameState()
      listenNotification('GAME_STARTED')
    })

    socket.on(`GAME_UPDATE${GAME_ID}`, async ({ game, secondsLeft }) => {
      setRunningGame(game, secondsLeft)
    })

    socket.on(`GAME_FINISHED${GAME_ID}`, async () => {
      await findGameState()
    })

    socket.on(`GAME_ABORTED${GAME_ID}`, async () => {
      await findGameState()
    })
  }, [])

  return { isConnected }
}

export default useLiveShogiWebsockets
