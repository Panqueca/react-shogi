import styled, { css } from 'styled-components'

export const ModalContainer = styled.div`
  ${(props) =>
    props.active === true
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: linear-gradient(130.6deg, #3562ff -90.56%, #1b1b1bbf 48.62%);
  z-index: 10;
`

export const ModalBox = styled.div`
  position: relative;
  justify-content: center;
  position: relative;
  display: flex;
  /* width: 400px; */
  height: auto;
  max-height: 730px;
  border-radius: 8px;
  z-index: 12;
`

export const ModalCloseButtonBox = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: 10px;
  top: 10px;
  font-size: 24px;
  border-radius: 50px;

  button {
    background: transparent;
    border: 0 solid;
    box-shadow: none;
  }

  button:hover {
    background: transparent;
    box-shadow: none;
  }

  button > svg {
    width: 1.7em;
    height: 1.7em;
    border-radius: 50%;
    transition: ease-in-out 0.2s;
    cursor: pointer;
  }

  button > svg:hover {
    background: #505069;
    transition: ease-in-out 0.2s;
  }
`

export const ModalContentContainer = styled.div`
  padding-top: 0px;

  & > div:first-child {
    border: 0px solid;
    padding: 0px 8px 0 0px;
    margin-top: 0;
    margin-bottom: 30px;
  }

  & > div:nth-child(5) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    margin-top: 0;
  }

  & > div:nth-child(5) label {
    width: 100%;
    max-width: 48%;
    text-align: left;
  }

  & > div:first-child > input {
    font-size: 2rem;
  }

  & > div:first-child > input::placeholder {
    font-size: 2rem;
  }

  input::placeholder {
    color: #9291bd;
  }

  div {
    text-align: center;
  }

  h2 {
    font-weight: 400;
  }
`

export const ModalBoxBack = styled.div`
  width: 100%;
  padding: 55px 50px;
  background: linear-gradient(99.58deg, #3562ff -2433.88%, #090909 83.07%);
  border: 1px solid #464646;
  box-sizing: border-box;
  /* modals_shadow_01 */
  box-shadow: 0px 0px 47px 14px rgba(0, 0, 0, 0.35);
  border-radius: 20px;

  h2 {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    font-size: 20px;
    line-height: 28px;
    color: #fff;
    font-family: 'HomepageBaukastenBold';
  }

  button > svg > path {
    stroke: #fff;
  }
`

export const ModalOptionButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 385px;
  margin: 0 auto;
  margin-bottom: 0;
`

export const InputModal = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`
