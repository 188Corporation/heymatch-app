import React, { useEffect } from 'react'
import { TextInput as _TextInput, View } from 'react-native'
import styled from 'styled-components'
import { Colors } from 'infra/colors'

export const Input: React.FC<{
  value: string
  onChange: (v: string) => void
  placeholder: string
}> = ({ value, onChange, placeholder }) => {
  return (
    <Container>
      <TextInput
        autoComplete='tel-device'
        keyboardType='phone-pad'
        textContentType='telephoneNumber'
        placeholder={placeholder}
        placeholderTextColor={Colors.gray.v300}
        onChangeText={(v) => onChange(v)}
      >
        {value}
      </TextInput>
    </Container>
  )
}

const Container = styled(View)`
  padding: 28px 20px;
  border: 1px solid ${Colors.primary.blue};
  border-radius: 16px;
`

const TextInput = styled(_TextInput)`
  font-size: 16px;
  color: ${Colors.gray.v600};
`
