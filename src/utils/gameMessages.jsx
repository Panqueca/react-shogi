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

  if (notificationSlug === 'GAME_STARTED')
    return {
      type: 'effect',
      display: <CheckEffect text='Opponent Found, the game will start...' />,
      delay: 1500,
    }

  if (notificationSlug === 'YOUR_TURN')
    return {
      type: 'sound',
    }

  if (notificationSlug === 'OPPONENT_TURN')
    return {
      type: 'sound',
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

  if (notificationSlug === 'SEARCHING')
    return {
      open: true,
      type: 'SEARCHING',
      title: 'Searching for players...',
    }

  if (notificationSlug === 'ABORTED')
    return {
      open: true,
      type: 'ABORTED',
      title: 'Find a new game...',
    }

  if (notificationSlug === 'GAME_FINISHED')
    return {
      open: true,
      type: 'GAME_FINISHED',
    }

  return { type: null }
}
