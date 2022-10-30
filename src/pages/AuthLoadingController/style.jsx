import styled from 'styled-components'

export const PageContainer = styled.div`
  position: relative;
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #fff;

  input {
    color: #fff;
  }

  input:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: #4ba1f4;
    font-size: 12px;
    cursor: pointer;
  }
`

export const GridBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
