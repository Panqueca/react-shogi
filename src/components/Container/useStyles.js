import { StyleSheet, useWindowDimensions } from 'react-native'
import { getPercentageWidth } from '@config/theme'

export default function useStyles(params) {
  const { width } = useWindowDimensions()
  const { percentage = 80, backgroundColor = 'transparent' } = params || {}

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      width: getPercentageWidth(width, percentage),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
    },
  })
}
