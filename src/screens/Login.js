import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Logo from '@components/Logo'
import PageContainer from '@components/Container/PageContainer'
import NativePaperInput from '@components/NativePaperInput'
import { apiNode } from '@api'
import { signAuthentication } from '@api/auth'

export default function Login() {
  const [form, setForm] = useState({
    email: 'gustavopereiragustavo190@gmail.com',
    password: 'Gustavinho*123',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const navigation = useNavigation()

  function updateForm(slug, value) {
    setForm((current) => {
      return {
        ...current,
        [slug]: value,
      }
    })
  }

  async function setAuthToken({ email, password }) {
    const {
      token: authToken,
      user,
      error,
    } = await signAuthentication({
      email,
      password,
    })
    apiNode.defaults.headers.common.Authorization = `Bearer ${authToken}`
    console.log({ authToken, user })

    return { authToken, user, error }
  }

  async function handleLoginSubmit() {
    console.log('handleLoginSubmit', { form })

    setIsLoading(true)

    try {
      await setAuthToken({ email: form.email, password: form.password })
      navigation.navigate('Home')
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  return (
    <PageContainer percentage={80}>
      <Logo />
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.login.email')}
          keyboardType="email-address"
          returnKeyType="next"
          value={form.email}
          onChangeText={(value) => updateForm('email', value)}
        />
      </View>
      <View style={{ alignSelf: 'stretch' }}>
        <NativePaperInput
          label={t('screen.login.password')}
          secureTextEntry={!showPassword}
          returnKeyType="go"
          value={form.password}
          right={
            <TextInput.Icon
              onPress={() => setShowPassword(!showPassword)}
              icon={showPassword ? 'eye-off' : 'eye'}
            />
          }
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
        >
          {t('screen.login.create_account')}
        </Button>
      </View>
    </PageContainer>
  )
}
