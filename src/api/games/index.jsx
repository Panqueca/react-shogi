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

export async function playGame(GAME_TYPE) {
  try {
    return await apiNode.post('/api/games/play', {
      gameType: GAME_TYPE,
    })
  } catch (err) {
    return {
      error:
        err?.response?.data?.message || 'Unexpected error trying to play game',
      status: err.response?.status,
    }
  }
}

export async function savePlayerMove({ _id, sfen, squareX, squareY, kind }) {
  try {
    const { data } = await apiNode.post('/api/games/save-move', {
      _id,
      sfen,
      squareX,
      squareY,
      kind,
    })

    return { success: data.success }
  } catch (err) {
    return {
      error:
        err?.response?.data?.message ||
        'Unexpected error trying to update game',
    }
  }
}

export async function resignGame({ _id }) {
  try {
    const { data } = await apiNode.post('/api/games/resign', {
      _id,
    })

    return data
  } catch (err) {
    return {
      error:
        err?.response?.data?.message ||
        'Unexpected error trying to resign game',
    }
  }
}
