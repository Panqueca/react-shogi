import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import EmojiFlags from '@mui/icons-material/EmojiFlags'
import Chat from '@mui/icons-material/Chat'
import { getSquareByXYBoard } from '@utils/board'
import { checkIsPossibleMove } from '@utils/match'
import { useSkinState } from '@context/SkinContext'
import MatchPlayer from '@components/MatchPlayer'

const MatchDisplay = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const blinkTile = keyframes`
0% {
  background-color: rgba(255, 126, 126, 0.3);
}
25% {
  background-color: rgba(255, 126, 126, 0.4);
}
50% {
  background-color: rgba(255, 126, 126, 0.5);
}
75% {
  background-color: rgba(255, 126, 126, 0.4);
}
100% {
  background-color: rgba(255, 126, 126, 0.3);
}
`

const BoardSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ tileSize }) => tileSize};
  height: ${({ tileSize }) => tileSize};
  border: 1px solid #6b5313;
  position: relative;
  animation: ${({ blink }) =>
    blink
      ? css`
          ${blinkTile} 2s infinite
        `
      : 'none'};
  div {
    width: 100%;
    height: 100%;
  }

  .square-number {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 10pt;
    color: #6b5313;
    font-weight: bold;
    opacity: 0.5;
    padding: 2px;
  }
`

const ShogiBoard = styled.div`
  position: relative;
  display: flex;
  margin: 0;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '100%' }) => height};
  background-color: ${({ squaresColor }) => squaresColor};

  .overlay {
    display: ${({ showOverlay }) => (showOverlay ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 110;
  }

  .config {
    position: absolute;
    top: 0px;
    right: -40px;
    display: flex;
    flex-direction: column;
  }
`

const EffectDialog = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto auto;
  left: 0;
  right: 0;
  z-index: 101;
  top: 0;
  bottom: 0;
`

const MatchBoard = ({
  game,
  hands,
  handleMovePiece,
  lastMove,
  targetTile,
  selectHandPiece,
  possibleMoves,
  board,
  effectDialog,
  callSurrender,
  currentPlayer,
  opponentPlayer,
  clocks = {},
  fetchSetGameData,
  width,
  height,
  tileSize,
}) => {
  const { skin, displayPieces, changeSkin, boardConfig, setBoardConfigByKey } =
    useSkinState()
  const { squaresColor, pieceViewBox } = boardConfig

  const [settings, setSettings] = useState(false)

  function closeDialogs() {
    setSettings(false)
  }

  function selectTile({ square, pieceInfo }) {
    if (game?.turn === currentPlayer?.turn)
      handleMovePiece({ square, pieceInfo })
  }

  function updateSkin(e) {
    changeSkin(e.target.value)
  }

  function getOrderedColTiles(colTiles) {
    return colTiles.map((pieceInfo, y) => {
      return { pieceInfo, y }
    })
  }

  function getBoardOrderedByRows(matchBoard) {
    const orderedBoardPositions = matchBoard
      .map((colTiles, x) => {
        return {
          colTiles: getOrderedColTiles(colTiles),
          x,
        }
      })
      .reverse()

    const byCols =
      currentPlayer?.turn === 1
        ? orderedBoardPositions
        : orderedBoardPositions.reverse()

    const rows = []
    byCols.forEach(({ colTiles, x }) => {
      colTiles.forEach(({ pieceInfo, y }) => {
        rows[y] = rows[y] || []
        rows[y].push({ pieceInfo, y, x })
      })
    })

    const byRows = currentPlayer?.turn === 1 ? rows.reverse() : rows
    return byRows
  }

  const getToogle = (fieldKey) => {
    return (
      <Switch
        checked={boardConfig[fieldKey]}
        onChange={() => setBoardConfigByKey(fieldKey, !boardConfig[fieldKey])}
      />
    )
  }

  const orderedByRows = getBoardOrderedByRows(board)
  const matchPlayersProps = {
    hands,
    displayPieces,
    selectHandPiece,
    fetchSetGameData,
    width,
    viewBox: pieceViewBox.hand,
  }

  return (
    <MatchDisplay>
      <MatchPlayer
        player={opponentPlayer}
        hide={!opponentPlayer}
        clock={clocks.opponentPlayer}
        {...matchPlayersProps}
      />
      <ShogiBoard
        width={width}
        height={height}
        squaresColor={squaresColor}
        showOverlay={settings}
      >
        <div className='config'>
          <IconButton onClick={() => setSettings(!settings)}>
            <Settings />
          </IconButton>
          <IconButton
            onClick={callSurrender}
            disabled={!game?.status === 'STARTED'}
          >
            <EmojiFlags />
          </IconButton>
          <IconButton disabled>
            <Chat />
          </IconButton>
        </div>
        <div className='overlay' onClick={closeDialogs}></div>
        <EffectDialog open={effectDialog.open}>
          {effectDialog.display}
        </EffectDialog>
        {settings && (
          <Grid
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'background.paper',
              zIndex: 1000,
              p: 3,
            }}
          >
            <Typography variant='subtitle1'>Settings</Typography>
            <FormGroup sx={{ gap: 2 }}>
              <FormControlLabel
                control={getToogle('showSquareNumbers')}
                label='Show square numbers'
              />
              <FormControl>
                <InputLabel id='skin-options-select'>Skins</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={skin}
                  onChange={updateSkin}
                >
                  <MenuItem value='skin_1'>3D Light Skin</MenuItem>
                  <MenuItem value='skin_2'>Red Kanji Wood</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
        )}
        {displayPieces &&
          orderedByRows.map((rowTiles) => {
            if (Array.isArray(rowTiles)) {
              return rowTiles.map(({ pieceInfo, x, y }) => {
                const { color, kind } = pieceInfo || {}
                const { squareNumber, squareName, squareX, squareY, square } =
                  getSquareByXYBoard({ x, y })

                const displayKind = kind || 'Empty'
                const PieceSelection = displayPieces[displayKind]

                const isPossibleMove = checkIsPossibleMove(
                  { squareX, squareY },
                  possibleMoves
                )

                const isPreviousMove =
                  lastMove &&
                  lastMove.squareX === squareX &&
                  lastMove.squareY === squareY

                return (
                  <BoardSquare
                    key={squareNumber}
                    blink={isPreviousMove}
                    tileSize={tileSize}
                  >
                    <PieceSelection
                      y={squareX}
                      x={squareY}
                      squareNumber={squareNumber}
                      squareName={squareName}
                      onClick={() =>
                        selectTile({
                          square,
                          pieceInfo,
                        })
                      }
                      isSelected={
                        isPossibleMove || squareName === targetTile.square
                      }
                      player={color === 1 ? 2 : 1}
                      transform={
                        currentPlayer?.turn === 0
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)'
                      }
                      isOponnent={
                        currentPlayer?.turn === 0 ? color === 1 : color === 0
                      }
                      svgProps={{ viewBox: pieceViewBox.board }}
                    />
                    {boardConfig.showSquareNumbers && (
                      <div className='square-number'>{squareNumber}</div>
                    )}
                  </BoardSquare>
                )
              })
            }

            return null
          })}
      </ShogiBoard>
      <MatchPlayer
        player={currentPlayer}
        clock={clocks.currentPlayer}
        hands={hands}
        {...matchPlayersProps}
      />
    </MatchDisplay>
  )
}

MatchBoard.propTypes = {
  effectDialog: PropTypes.object,
  targetTile: PropTypes.object,
  handleMovePiece: PropTypes.func,
}

MatchBoard.defaultProps = {
  effectDialog: { open: false },
  targetTile: {},
  handleMovePiece: () => {},
}

export default MatchBoard