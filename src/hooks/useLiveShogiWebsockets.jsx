import { useEffect } from 'react'
import { socket } from '@api/websockets'

const useLiveShogiWebsockets = ({
  GAME_ID,
  findGameState,
  listenNotification,
  setRunningGame,
}) => {
  useEffect(() => {
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

  return null
}

export default useLiveShogiWebsockets
