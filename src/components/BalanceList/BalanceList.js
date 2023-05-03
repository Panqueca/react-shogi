import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder'

export default function BalanceList({
  amounts = [],
  type = 'amount',
  isLoading,
  onSelectItem,
}) {
  const theme = useTheme()

  function handleSelectItem(item) {
    if (onSelectItem) onSelectItem(item)
  }

  const darkLoadingStyle = {
    backgroundColor: theme.colors.loadingColor,
    height: 25,
  }

  if (isLoading)
    return (
      <View>
        {[1, 2, 3].map((item) => {
          return (
            <Placeholder
              key={item}
              Animation={(props) => (
                <Fade
                  {...props}
                  style={{ backgroundColor: theme.colors.loadingPlaceholder }}
                />
              )}
              Right={(props) => (
                <PlaceholderMedia
                  {...props}
                  style={[props.style, darkLoadingStyle]}
                />
              )}
            >
              <PlaceholderLine style={darkLoadingStyle} />
            </Placeholder>
          )
        })}
      </View>
    )

  return (
    <View>
      {amounts
        .filter((b) => b.type === type)
        .map((item) => {
          return (
            <TouchableOpacity
              key={item.currency}
              onPress={() => handleSelectItem(item)}
            >
              <Card mode="contained">
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}
                >
                  <Text variant="bodyMedium">{item.currency}</Text>
                  <Text variant="bodyMedium">{item.balance}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )
        })}
    </View>
  )
}
