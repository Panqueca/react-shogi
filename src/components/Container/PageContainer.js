import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Container from './Container'

export default function PageContainer({ children, percentage = 90, gap = 15 }) {
  const theme = useTheme()

  return (
    <Container
      backgroundColor={theme.colors.background}
      percentage={percentage}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap,
        }}
      >
        {children}
      </View>
    </Container>
  )
}
