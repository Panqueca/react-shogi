import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next'
import Spinner from 'react-native-loading-spinner-overlay'
import { Provider as PaperProvider } from 'react-native-paper'
import { useFonts } from 'expo-font'
import store from 'store'
import { theme } from '@config/theme'
import i18n from './src/i18n'
import RouterContainer from './src/RouterContainer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 100,
    },
  },
})

function App() {
  const [areFontsLoaded] = useFonts({
    quicksand: require('./src/assets/fonts/Quicksand-Regular.ttf'),
  })

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <Spinner visible={!areFontsLoaded} animation="slide" size="large" />
            <RouterContainer ready={areFontsLoaded} />
          </PaperProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default App
