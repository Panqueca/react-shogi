import React from 'react'
import { IconButton } from 'react-native-paper'

export default function SelectLanguageButton(props) {
  const { size = 25 } = props || {}

  return (
    <IconButton
      onPress={() => {}}
      size={size}
      style={{ width: size, height: size }}
      icon="earth"
    />
  )
}
