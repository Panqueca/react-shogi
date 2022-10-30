import styled from 'styled-components'

export const TitlebarContainer = styled.div`
  z-index: 20;
`

export const TitlebarDragRegion = styled.div`
  top: 0;
  left: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-app-region: drag;
`

export const Resizer = styled.div`
  -webkit-app-region: no-drag;
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%;
`

export const TitleBarActive = styled.div`
  top: 0px;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    90deg,
    rgba(43, 43, 43, 0.29) 0%,
    rgba(43, 43, 43, 0) 100%
  );
  display: flex;
  font-family: 'Open Sans', sans-serif;
  position: relative;
  z-index: 99999;
`

export const TitleBarInactive = styled.div`
  top: 0px;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    90deg,
    rgba(43, 43, 43, 0.29) 0%,
    rgba(43, 43, 43, 0) 100%
  );
  display: flex;
  font-family: 'Open Sans', sans-serif;
  position: relative;
`

export const TitleBarSectionIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 120px;
  position: relative;
`

export const TitleBarSectionMenubar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 165px;
`

export const TitleBarSectionCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`

export const TitleBarSectionWindowsControl = styled.div`
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90px;
  padding-right: 12px;
  /* needs no-drag for color changing div*/
  -webkit-app-region: no-drag;

  & > div > svg {
    fill: #575757;
    transition: all 0.05s ease-in;
    cursor: pointer;
  }

  & > div:first-child > svg:hover {
    fill: #f8b92b;
    transition: all 0.05s ease-in;
  }

  & > div:nth-child(2) > svg:hover {
    fill: #2bc73b;
    transition: all 0.05s ease-in;
  }

  & > div:last-child > svg:hover {
    fill: #f35d58;
    transition: all 0.05s ease-in;
  }
`

export const SectionWwindowsControlBox = styled.div`
  width: 30px;
  height: 30px;
  /* background-color: purple; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.05s ease-in;
`
