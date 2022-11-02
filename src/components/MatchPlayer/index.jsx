import { Grid, Box, Badge, Typography } from '@mui/material'
import PlayerTimer from '@components/PlayerTimer'

const getStyles = ({ width, viewBox }) => ({
  playerDisplay: {
    width,
    backgroundColor: 'background.paper',
    p: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hand: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    alignItems: 'center',
  },
  pieceSVG: {
    viewBox,
    width: '50px',
    height: '50px',
  },
})

const MatchPlayer = ({
  name,
  clock,
  turn,
  width = '100%',
  hands,
  fetchSetGameData,
  displayPieces,
  selectHandPiece,
  viewBox,
}) => {
  const styles = getStyles({ width, viewBox })

  function displayHandPieces() {
    const playerHand = hands[turn] || []

    if (playerHand) {
      const groupByKind = []
      playerHand.forEach((pieceInfo) => {
        const { kind } = pieceInfo
        groupByKind[kind] = groupByKind[kind] || []
        groupByKind[kind].push(pieceInfo)
      })

      return Object.keys(groupByKind).map((kind) => {
        const Piece = displayPieces[kind]
        const count = groupByKind[kind].length

        if (Piece)
          return (
            <Box key={kind}>
              <Piece
                forceProps={{
                  title: `${kind}`,
                  onClick: () => selectHandPiece({ kind, turn }),
                  'data-cy': `piece-at-hand-${turn}-${kind}`,
                }}
                svgProps={styles.pieceSVG}
              />
              {count > 1 && <Badge color='success'>{count}</Badge>}
            </Box>
          )
        return null
      })
    }

    return null
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item container sx={styles.playerDisplay}>
        <Grid item>
          <Typography variant='subtitle2'>
            ({`${turn === 0 ? 'SENTE' : 'GOTE'}`}) {name}
          </Typography>
        </Grid>
        <Grid item sx={styles.hand}>
          <Grid item>{displayHandPieces(hands, turn)}</Grid>
          <PlayerTimer clock={clock} onExpire={fetchSetGameData} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MatchPlayer
