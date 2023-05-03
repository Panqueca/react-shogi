import { MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper'

export function valueMultiplier(value, MULTIPLIER) {
  return value * MULTIPLIER
}

export function getSpacing(spacing) {
  return valueMultiplier(spacing, 4)
}

export function getPercentageWidth(width, percentage) {
  return (width * percentage) / 100
}

export const theme = {
  ...DefaultDarkTheme,
  dark: true,
  colors: {
    primary: 'rgb(234, 194, 72)',
    onPrimary: 'rgb(61, 47, 0)',
    primaryContainer: 'rgb(87, 68, 0)',
    onPrimaryContainer: 'rgb(255, 224, 138)',
    secondary: 'rgb(191, 194, 255)',
    onSecondary: 'rgb(32, 37, 120)',
    secondaryContainer: 'rgb(56, 62, 143)',
    onSecondaryContainer: 'rgb(224, 224, 255)',
    tertiary: 'rgb(173, 207, 174)',
    onTertiary: 'rgb(25, 55, 31)',
    tertiaryContainer: 'rgb(47, 77, 52)',
    onTertiaryContainer: 'rgb(200, 236, 201)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(30, 27, 22)',
    backgroundHeader: 'rgb(23,21,17)',
    onBackground: 'rgb(232, 226, 217)',
    surface: 'rgb(30, 27, 22)',
    onSurface: 'rgb(232, 226, 217)',
    surfaceVariant: 'rgb(76, 70, 57)',
    onSurfaceVariant: 'rgb(207, 198, 180)',
    outline: 'rgb(152, 144, 128)',
    outlineVariant: 'rgb(76, 70, 57)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(232, 226, 217)',
    inverseOnSurface: 'rgb(51, 48, 42)',
    inversePrimary: 'rgb(116, 91, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(40, 35, 25)',
      level2: 'rgb(46, 40, 26)',
      level3: 'rgb(52, 45, 28)',
      level4: 'rgb(55, 47, 28)',
      level5: 'rgb(59, 50, 29)',
    },
    surfaceDisabled: 'rgba(232, 226, 217, 0.12)',
    onSurfaceDisabled: 'rgba(232, 226, 217, 0.38)',
    backdrop: 'rgba(53, 48, 36, 0.4)',
    loadingPlaceholder: 'rgb(76, 70, 57)',
    loadingColor: 'rgba(232, 226, 217, 0.38)',
    buyColor: 'rgb(16, 176, 116)',
    sellColor: 'rgb(255, 99, 71)',
  },
  roundness: 1,
}

export const headerStyles = {
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}
