import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 0 20px;
  -webkit-box-pack: left;
  -webkit-justify-content: left;
  -ms-flex-pack: left;
  justify-content: left;
  align-items: bottom;
  background: linear-gradient(180deg, rgba(28, 28, 28, 0) 0%, #212121 100%);
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 190px;
  z-index: 2;
  /* box-shadow: 6px 4px 23px 4px rgba(0, 0, 0, 0.15); */

  div:nth-child(1) {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  color: #9b9b9b;

  p {
    font-family: 'HomepageBaukastenBold';
    font-size: 18px;
  }

  .address {
    font-size: 12px;
    padding: 5px;
  }
`

export const GasBox = styled.div``

export const ButtonsContainer = styled.div`
  max-height: 470px;
`

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  max-width: 120px;
  height: 50px;
  margin: 0px 0 0px;
  padding: 0 0 0 5px;
  border-radius: 5px;
  transition: ease-in-out 0.2s;
  cursor: pointer;

  ${(props) =>
    props.isSelected &&
    css`
      ${ButtonText} p {
        color: #fff;
        text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.25);
      }

      img {
        filter: brightness(0) invert(1)
          drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.25));
      }
    `}

  &:hover {
    background-color: rgba(78, 78, 78, 0.1);
    /* rgba(55, 55, 55, 0.1) */
    transition: ease-in-out 0.2s;
  }

  ${(props) =>
    props.enabled === false &&
    css`
      ${ButtonText} p {
        color: #414141;
      }

      img {
        opacity: 0.3;
        drop-shadow(0px 0px 0px rgba(255, 255, 255, 0));
      }

      &:hover {
        background-color: rgba(78, 78, 78, 0);
        transition: ease-in-out 0.2s;
      }
    `}
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;

  margin: 0 10px 0 0px;

  img {
    src: ${(props) => props.src};
  }
`

export const LogoBox = styled.div`
  img {
    max-width: 130px;
    height: 80px;
  }
`

export const ButtonText = styled.div``

export const CurrentGasBox = styled.div`
  position: absolute;
  bottom: 70px;
  display: flex;
  align-items: left;
  justify-content: left;
  flex-direction: column;

  & > div {
    display: flex;
    align-items: center;
  }

  ${Icon} {
    width: 35px;
    height: 35px;
  }

  p {
    margin-bottom: 0px;
    margin-top: 0px;
    font-size: 18px;
  }

  & > div:first-child {
    margin-bottom: 0px;

    svg {
      margin: 0 10px 0 0px;
      color: #9b9b9b;
    }

    svg:hover {
      color: #fff;
    }
  }

  & > div:last-child {
    p:last-child {
      color: #ffc222;
      font-size: 16px;
      font-family: 'HomepageBaukastenBook';
      margin-top: 4px;
    }
  }
`

export const CurrentGasText = styled.div``
