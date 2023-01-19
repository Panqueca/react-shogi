import { apiNode } from '@api'

export async function findUserGames({ _id }) {
  if (!_id) return

  try {
    const { data } = await apiNode.post(`/api/player/games`, { _id })

    return data
  } catch (err) {
    return {
      error:
        err?.response?.data?.message ||
        'Unexpected error trying to fetch player games by _id',
    }
  }
}
