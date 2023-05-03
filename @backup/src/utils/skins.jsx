import * as skin_1 from '@components/ShogiPieces/skin_1_3d'
import * as skin_2 from '@components/ShogiPieces/skin_2_red_kanji_bold'

const skins = { skin_1, skin_2 }

export const getPieceComponentsByTheme = (skinTheme) => {
  return skins[skinTheme]
}

export const getBoardConfigByTheme = (skinTheme) => {
  let boardConfig = {
    squaresColor: '#f4c64e',
    pieceViewBox: { hand: '0 4 32 32', board: '1.5 3 33 33' },
    showSquareNumbers: false,
  }

  if (skinTheme === 'skin_2') {
    boardConfig.squaresColor = '#cba84b'
    boardConfig.pieceViewBox = { hand: '2 0 50 50', board: '1 4 50 50' }
  }

  return boardConfig
}
