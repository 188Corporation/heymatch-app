import React from 'react'
import styled from 'styled-components'
import { ColorValue, TouchableOpacity } from 'react-native'
import { Colors } from 'infra/colors'
import { ButtonText } from 'ui/common/text'

export const Button: React.FC<{
  text: string
  onPress: () => void
  color?: ColorValue
  textColor?: ColorValue
  paddingVertical?: number
  paddingHorizontal?: number
}> = ({
  text,
  onPress,
  color = Colors.primary.red,
  textColor = Colors.white,
  paddingVertical = 16,
  paddingHorizontal,
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{ backgroundColor: color, paddingVertical, paddingHorizontal }}
    >
      <ButtonText style={{ color: textColor }}>{text}</ButtonText>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 12px;
  align-items: center;
`

export const FullWidthButton: React.FC<{
  text: string
  onPress: () => void
  disabled?: boolean
}> = ({ text, onPress, disabled = false }) => {
  return (
    <FullWidthButtonContainer onPress={onPress} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </FullWidthButtonContainer>
  )
}

const FullWidthButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  padding: 18px 0;
  align-items: center;
  background-color: ${(p) =>
    p.disabled ? Colors.primary.blueDisabled : Colors.primary.blue};
`
