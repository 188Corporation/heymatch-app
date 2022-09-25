import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Colors } from 'infra/colors'
import { ButtonText } from 'ui/common/text'

export const RedButton: React.FC<{
  text: string
  onPress: () => void
}> = ({ text, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 12px;
  background-color: ${Colors.primary.red};
  padding: 12px 0;
  align-items: center;
`
