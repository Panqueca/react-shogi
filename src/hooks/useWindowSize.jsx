import { useState, useEffect } from 'react'

const TILES = 9
const DEFAULT_OFFSET = {
  width: 100,
  height: 220,
}

function useWindowSize(params) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    vw: undefined,
    vh: undefined,
    boardSize: undefined,
    windowSize: undefined,
  })

  const {
    offsetWidth = DEFAULT_OFFSET.width,
    offsetHeight = DEFAULT_OFFSET.height,
  } = params || {}

  useEffect(() => {
    function handleResize() {
      const newVW = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )

      const newVH = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )

      const newTotalVH = newVH - offsetHeight
      const newTotalVW = newVW - offsetWidth
      const boardSize = newTotalVH <= newTotalVW ? newTotalVH : newTotalVW

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        vw: newVW,
        vh: newVH,
        boardSize: `${boardSize}px`,
        tileSize: `${boardSize / TILES - 2}px`,
      })
    }
    window.addEventListener('resize', handleResize)

    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
