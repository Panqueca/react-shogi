import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Logo from '@components/Logo'
import PageContainer from '@components/Container/PageContainer'
import NativePaperInput from '@components/NativePaperInput'
import useAuthentication from '@hooks/useAuthentication'

export default function Login() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const {
    email,
    password,
    setEmail,
    setPassword,
    signAuthenticationHandler,
    isLoading,
  } = useAuthentication()

  function handleLoginSubmit() {
    signAuthenticationHandler()
  }

  return (
    <PageContainer percentage={80}>
      <Logo />
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.login.email')}
          keyboardType="email-address"
          returnKeyType="next"
          value={email}
          onChangeText={(value) => setEmail(value)}
          testID="login-email-input"
          disabled={false}
        />
      </View>
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.login.password')}
          secureTextEntry
          returnKeyType="go"
          value={password}
          onChangeText={(value) => setPassword(value)}
          testID="login-password-input"
        />
      </View>
      <View style={{ alignSelf: 'stretch', gap: 10 }}>
        <Button
          mode="contained"
          onPress={handleLoginSubmit}
          disabled={isLoading}
          loading={isLoading}
        >
          {t('screen.login.submit')}
        </Button>
        <Button mode="text" onPress={() => console.log('Forgot password')}>
          {t('screen.login.forgot_password')}
        </Button>
      </View>
      <View>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Create Account')}
          testID="login-create_account-btn"
        >
          {t('screen.login.create_account')}
        </Button>
      </View>
    </PageContainer>
  )
}
