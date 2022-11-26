import styled from 'styled-components'
import { ButtonText } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { TouchableOpacity } from 'react-native'
import { Column, Row } from 'ui/common/layout'
import React, { ReactNode } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { BottomInsetSpace } from 'ui/common/inset-space'

export const BottomButton: React.FC<{
  text: string
  onPress: () => void
  disabled?: boolean
  inverted?: boolean
}> = observer(({ text, onPress, disabled = false, inverted = false }) => {
  const { keyboardStore } = useStores()
  return (
    <BottomButtonTouchable
      disabled={disabled}
      inverted={inverted}
      onPress={onPress}
    >
      <BottomButtonTextContainer>
        <BottomButtonText inverted={inverted}>{text}</BottomButtonText>
      </BottomButtonTextContainer>
      {!keyboardStore.isVisible && <BottomInsetSpace />}
    </BottomButtonTouchable>
  )
})

const BottomButtonTouchable = styled(TouchableOpacity)<{
  inverted: boolean
}>`
  width: 100%;
  background-color: ${(p) =>
    p.inverted
      ? p.disabled
        ? Colors.gray.v200
        : Colors.white
      : p.disabled
      ? Colors.primary.blueDisabled
      : Colors.primary.blue};
`

const BottomButtonTextContainer = styled(Row)`
  justify-content: center;
  padding: 18px 0;
`

const BottomButtonText = styled(ButtonText)<{
  inverted: boolean
}>`
  color: ${(p) => (p.inverted ? Colors.primary.blue : Colors.white)};
`

export const withBottomButton = (
  children: ReactNode,
  bottomButton: ReactNode,
) => {
  return (
    <Column style={{ flex: 1, backgroundColor: 'purple' }}>
      <Column style={{ flex: 1, backgroundColor: 'green' }}>{children}</Column>
      {bottomButton}
    </Column>
  )
}
