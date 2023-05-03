import { createContext, useContext } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'
import { getPieceComponentsByTheme, getBoardConfigByTheme } from '@utils/skins'

const SkinContext = createContext({})
const defaultSkinState = {
  skin: 'skin_1',
  boardConfig: getBoardConfigByTheme(),
}

function SkinProvider({ children }) {
  const [skinState, setSkinState] = useLocalStorage(
    '@ShogiBattles:skinState',
    defaultSkinState
  )

  function changeSkin(newSkin) {
    setSkinState((current) => {
      const { showSquareNumbers } = current.boardConfig

      return {
        ...current,
        skin: newSkin,
        boardConfig: { ...getBoardConfigByTheme(newSkin), showSquareNumbers },
      }
    })
  }

  function setBoardConfigByKey(key, value) {
    setSkinState((current) => {
      return {
        ...current,
        boardConfig: {
          ...current.boardConfig,
          [key]: value,
        },
      }
    })
  }

  return (
    <SkinContext.Provider
      value={{
        ...skinState,
        setSkinState,
        displayPieces: getPieceComponentsByTheme(skinState.skin),
        changeSkin,
        setBoardConfigByKey,
      }}
    >
      {children}
    </SkinContext.Provider>
  )
}

function useSkinState() {
  const context = useContext(SkinContext)
  if (!context) throw new Error('useSkinState must be used with SkinContext')

  return context
}

export { SkinProvider, useSkinState }
