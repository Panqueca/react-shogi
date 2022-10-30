import styled, { css } from 'styled-components'
import BottomLeftLight from '@assets/bottom-left-blue-light.png'

export const ContentContainer = styled.div`
  position: relative;
  height: calc(100vh - 0%);
  /* height: calc(100vh - 20%); */
  /* overflow-y: scroll; */

  h1 {
    color: #fff;
  }
`

export const PageContainer = styled.div`
  position: relative;
  flex: 4;
  background: url(${BottomLeftLight}) left bottom no-repeat;
  overflow: auto;

  &:after {
    content: '';
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    height: 6px;
    background: #1f2022;
    /* box-shadow: 0px 0px 8px 5px rgb(0 0 0 / 30%); */
  }

  & > h1 {
    padding: 30px 0 0 0;
  }

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #2b2b2b;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #383838;
    transition: ease-in-out 0.2s;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #4d4d4d;
    transition: ease-in-out 0.2s;
  }
`

export const Content = styled.div`
  position: relative;
  margin-top: 0px;
  padding-top: 0px;
  padding-bottom: 60px;

  label {
    color: #fff;
    font-family: 'HomepageBaukastenBold';
    font-size: 16px;
  }

  label svg {
    transition: ease-in-out 0.2s;
    cursor: pointer;
  }

  label svg:hover {
    box-shadow: 0px 0px 12px rgba(53, 97, 255, 0.6);
    transition: ease-in-out 0.2s;
  }
`

export const Icon = styled.img`
  width: 45px;
  height: 45px;
  margin: 0 15px 0 0px;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  img {
    src: ${(props) => props.src};
  }
`

export const PageHeader = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  padding: 0 40px 30px;
  transition: ease-in-out 0.25s;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(81deg, rgb(29 30 35) 0%, #1c1c1c 100%);
    transition: ease-in-out 0.25s;
    opacity: 0;
    z-index: -1;
  }

  ${(props) =>
    props.scroll
      ? css`
          box-shadow: 0px 13px 8px -15px rgba(0, 0, 0, 0.4);
          transition: ease-in-out 0.25s;

          &::after {
            opacity: 1;
          }
        `
      : css`
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0);
          transition: ease-in-out 0.25s;

          &::after {
            opacity: 0;
          }
        `}
`

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 0 0px;

  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    width: 270px;
  }

  h1 {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.25);
  }

  input {
    max-width: 130px;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
  }

  & > div:first-child h1 {
    padding-left: 0px;
  }

  img {
    filter: brightness(0) invert(1)
      drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.25));
  }
`

export const IconButton = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-right: 30px;

  svg {
    position: relative;
    padding: 0.5rem;
    border-radius: 8px;
    margin-right: 15px;
    color: #fff;
    background: #3561ff;
    cursor: pointer;
    transition: ease-in-out 0.2s;
  }

  svg:hover {
    background: #456eff;
    box-shadow: 0px 0px 8px rgba(53, 97, 255, 0.8);
    transition: ease-in-out 0.2s;
  }

  &:first-child img {
    width: 35px;
    height: 35px;
  }
`

export const HeaderButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 42px 0 0 0;

  p {
    color: #fff;
    font-family: 'HomepageBaukastenBold';
    font-size: 16px;
  }

  & > div:first-child {
    display: flex;
  }

  & > div:first-child > div:first-child {
    padding-right: 50px;
  }

  & > div:first-child > ${IconButton}:first-child svg {
    border-radius: 12px;
  }

  & > div:last-child > div:nth-child(2) {
    width: 200px;
  }
`

export const PageBody = styled.div`
  min-height: calc(100vh - 300px);
  margin: 0 40px;
  padding: 15px 2rem;
  border: 1px solid #323232;
  box-sizing: border-box;
  border-radius: 20px;
  background: linear-gradient(108.68deg, #1f1f20 0%, rgba(27, 28, 31, 0) 100%);

  svg {
    cursor: pointer;
  }
`

export const ResponsiveTable = styled.div`
  width: 100%;
  display: table;
  color: #fff;
  font-family: 'HomepageBaukastenBook';
  font-size: 16px;
`

export const TableHeader = styled.div`
  display: table-header-group;
  color: #9b9b9b;
`

export const TableHeaderCell = styled.div`
  padding: 10px 10px 10px 0px;
  text-align: justify;
  border-bottom: 1px solid #3f3e3e;
`

export const TableBody = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
`

export const TableBodyCell = styled.div`
  display: table-cell;
  height: 60px;
  vertical-align: middle;
  padding: 10px 10px 5px 0px;
  border-bottom: 1px solid #3f3e3e;

  ${(props) =>
    props.showBalance
      ? css`
          & > div:first-child > p:first-child:after {
            display: none;
          }

          & > div:first-child > p:first-child {
            color: white;
          }
        `
      : css`
          & > div:first-child > p:first-child:after {
            content: '';
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: linear-gradient(180deg, #242425 0%, #222222 100%);
          }

          & > div:first-child > p:first-child {
            color: transparent;
          }
        `}

  svg {
    color: #9b9b9b;
    transition: ease-in-out 0.2s;
  }

  svg:hover {
    color: #cecece;
    transition: ease-in-out 0.2s;
  }

  span {
    font-family: 'HomepageBaukastenBold';
    color: #a9a9a9;
    padding-left: 8px;
    transition: ease-in-out 0.2s;
    cursor: pointer;
  }

  span:hover {
    color: #cecece;
    transition: ease-in-out 0.2s;
  }

  &:nth-child(2) > p > span > svg {
    transform: translateY(2px);
  }

  &:nth-child(2) > p {
    display: flex;
    align-items: center;
  }
`

export const TableBodyRow = styled.div`
  display: table-row;

  & > div:nth-child(3) > div {
    display: flex;
    align-items: center;
  }

  & > div:nth-child(3) svg {
    padding-left: 1rem;
  }

  & > div:nth-child(3) > div p {
    position: relative;
    /* box-shadow: inset 0px 0px 13px 155px #000000; */
    color: transparent;
    padding: 0.6rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
  }

  & > div:last-child svg:first-child {
    padding-right: 0.5rem;
  }

  &:first-child > ${TableBodyCell} {
    padding: 15px 10px 5px 0px;
  }

  /* &:last-child > ${TableBodyCell} {
    border-bottom: 0;
  } */
`
