import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CgLogOut } from 'react-icons/cg'
import Logo from '@assets/app_logo.jpg'
import { useAuthState } from '@context/AuthContext'
import {
  Container,
  ButtonsContainer,
  ButtonBox,
  ButtonText,
  LogoBox,
} from './style'

export default function Sidebar(props) {
  const { sessionLogout } = useAuthState()
  const [position, setPosition] = useState('')

  let history = useHistory()

  const handleOnClick = (namePage) => {
    if (position === namePage) return
    history.push({ pathname: `${namePage}` })
  }

  useMemo(() => {
    const positionProps = props.selected ? props.selected : ''
    setPosition(positionProps)
  }, [props.selected])

  function handleLogout() {
    sessionLogout(() => {
      history.push('/login')
    })
  }

  return (
    <Container>
      <ButtonsContainer>
        <LogoBox>
          <img src={Logo} alt='Logo' />
        </LogoBox>
        <ButtonBox
          isSelected={position === '/games'}
          onClick={() => handleOnClick('/games')}
        >
          <ButtonText>
            <p>Games</p>
          </ButtonText>
        </ButtonBox>
      </ButtonsContainer>
      <div>
        <ButtonBox isSelected={position === '/'} onClick={handleLogout}>
          <CgLogOut size={30} />
          <ButtonText>
            <p>Logout</p>
          </ButtonText>
        </ButtonBox>
      </div>
    </Container>
  )
}
