import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Logo from '@components/Logo'
import PageContainer from '@components/Container/PageContainer'
import NativePaperInput from '@components/NativePaperInput'
import useAuthentication from '@hooks/useAuthentication'
import { isValidLogin } from '@utils/login'

export default function CreateAccount() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const {
    email,
    password,
    setEmail,
    setPassword,
    createAccountHandler,
    isLoading,
  } = useAuthentication()

  function handleCreateAccountSubmit() {
    createAccountHandler()
  }

  const cantSubmit = !isValidLogin({ email, password }) || isLoading

  return (
    <PageContainer percentage={80}>
      <Logo />
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.create_account.email')}
          keyboardType="email-address"
          returnKeyType="next"
          value={email}
          onChangeText={(value) => setEmail(value)}
          testID="create_account-email-input"
        />
      </View>
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.create_account.password')}
          secureTextEntry
          returnKeyType="go"
          value={password}
          onChangeText={(value) => setPassword(value)}
          testID="create_account-password-input"
        />
      </View>
      <View style={{ alignSelf: 'stretch', gap: 10 }}>
        <Button
          mode="contained"
          onPress={handleCreateAccountSubmit}
          disabled={cantSubmit}
          loading={isLoading}
          testID="create_account-submit-btn"
        >
          {t('screen.create_account.submit')}
        </Button>
      </View>
      <View>
        <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
          {t('screen.create_account.already_have_account')}
        </Button>
      </View>
    </PageContainer>
  )
}
