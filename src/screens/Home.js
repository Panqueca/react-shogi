import React, { useState } from 'react'
import { View } from 'react-native'
import PageContainer from '@components/Container/PageContainer'
import HomeWelcome from '@components/HomeWelcome'
import HomeQuickAccessWidgets from '@components/HomeQuickAccessWidgets'
import LastGamesList from '@components/LastGamesList'

export default function Home() {
  const [user] = useState({ name: 'GustavoOBrabo' })

  return (
    <PageContainer>
      <View style={{ flex: 1, alignSelf: 'stretch', gap: 15 }}>
        <HomeWelcome user={user} />
        <HomeQuickAccessWidgets />
        <LastGamesList />
      </View>
    </PageContainer>
  )
}
