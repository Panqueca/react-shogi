import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import SelectLanguageButton from '@components/SelectLanguageButton'
import { routes } from '@config/routes'

const Stack = createNativeStackNavigator()

export default function RouterContainer({ ready }) {
  const theme = useTheme()
  const { t } = useTranslation()

  const navigatorTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.headerBackground,
      card: theme.colors.background,
      text: theme.colors.onBackground,
    },
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <NavigationContainer theme={navigatorTheme}>
        {ready && (
          <Stack.Navigator
            screenOptions={{
              headerRight: () => <SelectLanguageButton />,
            }}
          >
            {routes.map(({ name, translationId, component, options }) => {
              return (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={component}
                  options={{ headerTitle: t(translationId), ...options }}
                />
              )
            })}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  )
}
