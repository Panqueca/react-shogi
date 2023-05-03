import React from 'react'
import { View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { getSpacing } from '@config/theme'
import BalanceList from '@components/BalanceList'

export default function BalanceListCard({
  title,
  amounts,
  isLoading,
  type,
  actionButtons,
  onSelectItem,
}) {
  return (
    <Card mode="elevated" style={{ padding: getSpacing(4) }}>
      <Card.Content style={{ gap: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="titleMedium">{title}</Text>
          <View>{actionButtons}</View>
        </View>
        <BalanceList
          amounts={amounts}
          isLoading={isLoading}
          type={type}
          onSelectItem={onSelectItem}
        />
      </Card.Content>
    </Card>
  )
}
