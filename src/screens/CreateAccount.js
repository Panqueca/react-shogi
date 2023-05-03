import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Logo from '@components/Logo'
import PageContainer from '@components/Container/PageContainer'

export default function CreateAccount() {
  const [form, setForm] = useState({
    email: 'gustavopereiragustavo190@gmail.com',
  })
  const { t } = useTranslation()

  function updateForm(slug, value) {
    setForm((current) => {
      return {
        ...current,
        [slug]: value,
      }
    })
  }

  return (
    <PageContainer percentage={80}>
      <Logo />
      <View style={{ alignSelf: 'stretch' }}>
        <TextInput
          label={t('screen.login.email')}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => updateForm('email', value)}
        />
      </View>
      <View>
        <Button mode="outlined" onPress={() => console.log('Create account')}>
          {t('screen.create_account.create_account_btn')}
        </Button>
      </View>
    </PageContainer>
  )
}
