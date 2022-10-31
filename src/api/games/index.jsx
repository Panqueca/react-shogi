import { apiNode } from '@api'

export async function findGameById(GAME_ID) {
  try {
    return await apiNode.get(`/api/games/find/${GAME_ID}`).then((res) => res)
  } catch (err) {
    return {
      error:
        err?.response?.data?.message || 'Unexpected error trying to find game',
    }
  }
}

export async function playGame({ gameType }) {
  try {
    return await apiNode
      .post('/api/games/play', {
        gameType,
      })
      .then((res) => res)
  } catch (err) {
    return {
      error:
        err?.response?.data?.message || 'Unexpected error trying to play game',
    }
  }
}
