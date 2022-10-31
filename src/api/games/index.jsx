import { apiNode } from '@api'

export async function findGameById(GAME_ID) {
  console.log({ GAME_ID })
  try {
    return await apiNode.get(`/api/games/find/${GAME_ID}`).then((res) => res)
  } catch (err) {
    return {
      error:
        err?.response?.data?.message || 'Unexpected error trying to find game',
    }
  }
}

export async function playGame(GAME_TYPE) {
  try {
    return await apiNode
      .post('/api/games/play', {
        gameType: GAME_TYPE,
      })
      .then((res) => res)
  } catch (err) {
    return {
      error:
        err?.response?.data?.message || 'Unexpected error trying to play game',
    }
  }
}
