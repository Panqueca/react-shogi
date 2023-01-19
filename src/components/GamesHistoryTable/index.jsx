import React from 'react'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ShareIcon from '@mui/icons-material/Share'

function VictoryIcon(props) {
  if (props?.victory === true) return 'Winner!'
  return 'Loser!'
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.type}
        </TableCell>
        <TableCell component='th' scope='row'></TableCell>
        <TableCell component='th' scope='row'>
          {row.startTime}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.VictoryIcon}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Actions
              </Typography>
              <Button variant='contained' color='success'>
                Game Analysis
              </Button>
              <Button variant='contained' endIcon={<ShareIcon />}>
                Share
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const GamesHistoryTable = ({ games }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Type</TableCell>
            <TableCell>Opponent</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Victory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games?.map(({ game, details }) => {
            const row = {
              ...game,
              VictoryIcon: <VictoryIcon victory={details.isWinner} />,
            }

            return <Row key={game._id} row={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GamesHistoryTable
