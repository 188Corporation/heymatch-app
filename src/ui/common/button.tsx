import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ColorValue, TouchableOpacity } from 'react-native'
import { Colors } from 'infra/colors'
import { ButtonText } from 'ui/common/text'
import { Row } from 'ui/common/layout'

export const Button: React.FC<{
  text: string
  onPress?: () => void
  color?: ColorValue
  textColor?: ColorValue
  paddingVertical?: number
  paddingHorizontal?: number
  leftChildren?: ReactNode
  disabled?: boolean
}> = ({
  text,
  onPress,
  color = Colors.primary.red,
  textColor = Colors.white,
  paddingVertical = 16,
  paddingHorizontal,
  leftChildren,
  disabled = false,
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{
        backgroundColor: disabled ? Colors.gray.v300 : color,
        paddingVertical,
        paddingHorizontal,
      }}
      disabled={disabled}
    >
      <Row style={{ alignItems: 'center' }}>
        {leftChildren}
        <ButtonText style={{ color: textColor }}>{text}</ButtonText>
      </Row>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 12px;
  align-items: center;
`
