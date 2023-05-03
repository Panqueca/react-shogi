import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Text } from 'react-native-paper'
import { getSpacing } from '@config/theme'

export default function LastTransactionsList() {
  const { t } = useTranslation()

  return (
    <Card mode="elevated" style={{ padding: getSpacing(4) }}>
      <Text variant="bodyMedium">{t('screen.home.last_games')}</Text>
    </Card>
  )
}
