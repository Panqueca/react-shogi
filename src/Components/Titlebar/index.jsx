import React, { useState } from 'react'

import {
  TitlebarContainer,
  TitlebarDragRegion,
  Resizer,
  TitleBarActive,
  TitleBarSectionIcon,
  TitleBarSectionMenubar,
  TitleBarSectionCenter,
  TitleBarSectionWindowsControl,
  SectionWwindowsControlBox,
} from './style'

export default function Titlebar() {
  const [maximized, setMaximized] = useState(true)

  const minimizeHandler = () => {
    window.ipcRenderer.invoke('minimize')
  }

  const maximizeHandler = () => {
    setMaximized(!maximized)
    window.ipcRenderer.invoke('maximize')
  }

  const unmaximizeHandler = () => {
    setMaximized(!maximized)
    window.ipcRenderer.invoke('unmaximize')
  }

  const closeHandler = () => {
    window.ipcRenderer.invoke('close')
  }

  return (
    <TitlebarContainer>
      <TitleBarActive>
        <TitlebarDragRegion />
        <TitleBarSectionIcon />
        <TitleBarSectionMenubar />
        <TitleBarSectionCenter />
        <TitleBarSectionWindowsControl>
          <SectionWwindowsControlBox onClick={() => minimizeHandler()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              strokeLinejoin='round'
            >
              <circle cx='11.6' cy='11.6' r='11.4' />
            </svg>
          </SectionWwindowsControlBox>
          <SectionWwindowsControlBox
            onClick={() =>
              maximized === true ? maximizeHandler() : unmaximizeHandler()
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              strokeLinejoin='round'
            >
              <circle cx='11.6' cy='11.6' r='11.4' />
            </svg>
          </SectionWwindowsControlBox>
          <SectionWwindowsControlBox onClick={() => closeHandler()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              strokeLinejoin='round'
            >
              <circle cx='11.6' cy='11.6' r='11.4' />
            </svg>
          </SectionWwindowsControlBox>
        </TitleBarSectionWindowsControl>
        {maximized === true ? <Resizer /> : <></>}
      </TitleBarActive>
    </TitlebarContainer>
  )
}
