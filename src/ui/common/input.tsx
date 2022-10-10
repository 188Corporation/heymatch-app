import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import {
  TextInput as _TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import styled from 'styled-components'
import { Colors } from 'infra/colors'
import { Caption, DEFAULT_FONT_FAMILY } from 'ui/common/text'

interface Props extends React.ComponentProps<typeof _TextInput> {
  value: string
  onValueChange: (v: string) => void
  label: string
  placeholder: string
  errorMessage?: string
  inputRef?: React.MutableRefObject<_TextInput | null>
  setIsFocused?: Dispatch<SetStateAction<boolean>>
}

export const Input: React.FC<Props> = ({
  value,
  onValueChange,
  label,
  placeholder,
  errorMessage,
  autoComplete,
  keyboardType,
  textContentType,
  maxLength,
  inputRef,
  setIsFocused,
}) => {
  const _inputRef = useRef<_TextInput | null>(null)
  const [_isFocused, _setIsFocused] = useState(false)
  const isError = !!errorMessage && errorMessage.length > 0
  return (
    <TouchableWithoutFeedback onPress={() => _inputRef.current?.focus()}>
      <Container isFocused={_isFocused} isError={isError}>
        {!isError && !_isFocused && value.length > 0 && (
          <LabelText>{label}</LabelText>
        )}
        <TextInput
          ref={(v) => {
            _inputRef.current = v
            if (inputRef) inputRef.current = v
          }}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          textContentType={textContentType}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray.v500}
          value={value}
          onChangeText={(v) => onValueChange(v)}
          onFocus={() => {
            _setIsFocused(true)
            if (setIsFocused) setIsFocused(true)
          }}
          onBlur={() => {
            _setIsFocused(false)
            if (setIsFocused) setIsFocused(false)
          }}
        />
        {isError && <ErrorText>{errorMessage}</ErrorText>}
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled(View)<{
  isFocused: boolean
  isError: boolean
}>`
  padding: 0 20px;
  height: 80px;
  justify-content: center;
  border: 2px solid
    ${(p) =>
      p.isError
        ? Colors.primary.red
        : p.isFocused
        ? Colors.primary.blue
        : Colors.gray.v100};
  border-radius: 16px;
  background-color: ${(p) => (p.isFocused ? Colors.white : Colors.gray.v100)};
`

const TextInput = styled(_TextInput)`
  font-size: 16px;
  color: ${Colors.gray.v600};
  font-family: ${DEFAULT_FONT_FAMILY};
`

const LabelText = styled(Caption)`
  color: ${Colors.gray.v500};
  margin-bottom: 4px;
`

const ErrorText = styled(Caption)`
  color: ${Colors.primary.red};
  margin-top: 4px;
`
