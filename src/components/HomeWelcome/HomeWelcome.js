import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { getUserName } from '@utils/userUtils'

export default function HomeWelcome({ user, showLastName }) {
  const { t } = useTranslation()

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 15,
      }}
    >
      <Text variant="bodyMedium">
        {t('screen.home.hi')},{' '}
        <Text variant="titleMedium">
          {getUserName(user.name, showLastName)}
        </Text>
      </Text>
    </View>
  )
}
