import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Text, IconButton, Chip } from 'react-native-paper'
import { getUserName } from '@utils/userUtils'

function BalanceToggle({ value }) {
  const [showBalance, setShowBalance] = useState(false)

  if (!showBalance)
    return (
      <IconButton
        onPress={() => setShowBalance(true)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          height: 35,
          margin: 0,
          borderRadius: 4,
          width: 80,
          justifyContent: 'center',
        }}
        size={15}
        icon="eye-off"
      />
    )

  return (
    <Chip
      onPress={() => setShowBalance(false)}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 35 }}
    >
      $ {value}
    </Chip>
  )
}

export default function BalanceWelcome({ user, balance, showLastName }) {
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
      <View style={{ alignItems: 'flex-end', gap: 5 }}>
        <Text variant="bodyMedium">{t('screen.home.balance')}</Text>
        <BalanceToggle value={balance} />
      </View>
    </View>
  )
}
