import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigation } from '@react-navigation/native'
import { createAccount, signAuthentication } from '@api/auth'

export default function useAuthentication() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const signAuthenticationQuery = useQuery(
    ['signAuthentication', email, password],
    () => signAuthentication({ email, password }),
    {
      enabled: false,
      onSuccess: () => {
        navigation.navigate('Home')
      },
    },
  )

  const createAccountQuery = useQuery(
    ['createAccount', email, password],
    () => createAccount({ email, password }),
    {
      enabled: false,
      onSuccess: () => {
        signAuthenticationQuery.refetch({
          throwOnError: true,
        })
      },
    },
  )

  function createAccountHandler() {
    createAccountQuery.refetch({
      throwOnError: true,
    })
  }

  function signAuthenticationHandler() {
    signAuthenticationQuery.refetch({
      throwOnError: true,
    })
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    createAccountHandler,
    signAuthenticationHandler,
    isLoading:
      createAccountQuery.isLoading || signAuthenticationQuery.isLoading,
  }
}
