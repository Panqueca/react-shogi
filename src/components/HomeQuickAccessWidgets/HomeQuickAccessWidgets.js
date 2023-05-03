import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Card, Text, IconButton } from 'react-native-paper'
import { getSpacing } from '@config/theme'

export default function HomeQuickAccessWidgets() {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const widgets = [
    {
      title: t('screen.home.play'),
      icon: 'gamepad-variant',
      onPress: () => {
        navigation.navigate('Play')
      },
    },
    {
      title: t('screen.home.learn'),
      icon: 'chart-line-stacked',
      onPress: () => {
        console.log('learn')
      },
    },
    {
      title: t('screen.home.config'),
      icon: 'cog',
      onPress: () => {
        console.log('config')
      },
    },
  ]

  return (
    <Card mode="elevated" style={{ padding: getSpacing(4) }}>
      <Text variant="bodyMedium">{t('screen.home.quick_access')}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 10,
          marginTop: 10,
        }}
      >
        {widgets.map(({ title, icon, onPress }) => {
          return (
            <TouchableOpacity
              key={title}
              onPress={onPress}
              style={{ flexBasis: '30%' }}
            >
              <Card
                mode="contained"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Card.Content
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton icon={icon} size={30} />
                  <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
                    {title}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        })}
      </View>
    </Card>
  )
}
