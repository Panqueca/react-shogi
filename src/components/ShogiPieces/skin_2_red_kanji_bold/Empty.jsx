import React from 'react'
import PieceDisplay from '../PieceDisplay'

function Empty() {
  return null
}

const Piece = (props) => {
  return <PieceDisplay Piece={Empty} {...props} />
}

export default Piece
