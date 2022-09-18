import React, { useRef, useState } from 'react'
import {
  TextInput as _TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import styled from 'styled-components'
import { Colors } from 'infra/colors'

export const Input: React.FC<{
  value: string
  onChange: (v: string) => void
  placeholder: string
  isError: boolean
}> = ({ value, onChange, placeholder, isError }) => {
  const inputRef = useRef<null | _TextInput>(null)
  const [isFocused, setIsFocused] = useState(false)
  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <Container isFocused={isFocused} isError={isError}>
        <TextInput
          ref={inputRef}
          autoComplete='tel-device'
          keyboardType='phone-pad'
          textContentType='telephoneNumber'
          placeholder={placeholder}
          placeholderTextColor={Colors.gray.v500}
          onChangeText={(v) => onChange(v)}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled(View)<{
  isFocused: boolean
  isError: boolean
}>`
  padding: 28px 20px;
  border: 2px solid
    ${(p) => (p.isFocused ? Colors.primary.blue : Colors.gray.v100)};
  border-radius: 16px;
  background-color: ${(p) => (p.isFocused ? Colors.white : Colors.gray.v100)};
`

const TextInput = styled(_TextInput)`
  font-size: 16px;
  color: ${Colors.gray.v600};
`
