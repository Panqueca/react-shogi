import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import useLoadings from '@hooks/useLoadings'
import { playGame } from '@api/games'
import { useAuthState } from '@context/AuthContext'

const WaitGame = () => {
  const { handleIsSessionAuthenticated } = useAuthState()
  const { loading, changeLoading } = useLoadings({
    game: true,
  })
  const { GAME_TYPE } = useParams()
  const history = useHistory()

  async function findGameToPlay() {
    changeLoading({ game: true })

    const { data: response, status, error } = await playGame(GAME_TYPE)
    if (response?._id) history.push(`/play/${response._id}`)
    if (error) toast.error(error)
    if (status === 401) handleIsSessionAuthenticated()

    changeLoading({ game: false })
  }

  useEffect(() => {
    if (GAME_TYPE) findGameToPlay()
  }, [])

  return <Container>{loading.game && 'loading...'}</Container>
}

export default WaitGame
