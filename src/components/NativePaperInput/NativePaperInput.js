import React, { useRef } from 'react'
import { TextInput } from 'react-native-paper'

export default function NativePaperInput({ label, value, ...props }) {
  const textInputRef = useRef(null)

  return <TextInput ref={textInputRef} label={label} value={value} {...props} />
}
