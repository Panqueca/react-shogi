import React from 'react'
import { Image } from 'react-native'
import { useAssets } from 'expo-asset'
import logo from '../../assets/logo-shogi-battles.png'

export default function Logo(params) {
  const [assets] = useAssets([logo])

  const { width = 145, height = 45 } = params || {}

  return assets ? <Image source={assets[0]} style={{ width, height }} /> : null
}
