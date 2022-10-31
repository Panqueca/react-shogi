import { useState, useEffect } from 'react'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    vw: undefined,
    vh: undefined,
    boardSize: undefined,
  })

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

      const orderBy = newVH > newVW ? 'WIDTH' : 'HEIGHT'
      const boardView = orderBy === 'WIDTH' ? newVW : newVH
      const minusOffsets = orderBy === 'WIDTH' ? 85 : 380

      const boardSize = `${boardView - minusOffsets}px`

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        vw: newVW,
        vh: newVH,
        boardSize,
      })
    }
    window.addEventListener('resize', handleResize)

    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
