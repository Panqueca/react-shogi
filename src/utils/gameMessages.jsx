import React from 'react'
import CheckEffect from '@components/CheckEffect'

export const getDialogInfoByNotificationSlug = (notificationSlug, callback) => {
  if (notificationSlug === 'PieceMovedToPromotionZone')
    return {
      type: 'dialog',
      title: 'Promote?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => callback('PROMOTE'),
      onCancel: () => callback('DONT_PROMOTE'),
    }

  if (notificationSlug === 'KingInCheck')
    return {
      type: 'effect',
      display: <CheckEffect text='Your King is In Check' />,
      delay: 500,
    }

  if (notificationSlug === 'OpponentKingInCheck')
    return {
      type: 'effect',
      display: <CheckEffect text='CHECK' />,
      delay: 500,
    }

  if (notificationSlug === 'GAME_STARTED')
    return {
      type: 'effect',
      display: <CheckEffect text='Opponent Found, the game will start...' />,
      delay: 1500,
    }

  if (notificationSlug === 'YOUR_TURN')
    return {
      type: 'effect',
      display: <CheckEffect text="It's your turn to play" />,
      delay: 1500,
    }

  if (notificationSlug === 'OPPONENT_TURN')
    return {
      type: 'effect',
      display: <CheckEffect text='Waiting for opponent to play' />,
      delay: 1500,
    }

  if (notificationSlug === 'YOU_WON')
    return {
      type: 'effect',
      display: <CheckEffect text='Victory. You won!' />,
      delay: 1500,
    }

  if (notificationSlug === 'YOU_LOST')
    return {
      type: 'effect',
      display: <CheckEffect text='Game over. You lost!' />,
      delay: 1500,
    }

  return { type: null }
}
