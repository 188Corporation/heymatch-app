import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import React, { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { ButtonText } from 'ui/common/text'

export const BottomButton: React.FC<{
  text: string
  onPress?: () => void
  disabled?: boolean
  inverted?: boolean
  leftChildren?: ReactNode
}> = observer(
  ({ text, onPress, disabled = false, inverted = false, leftChildren }) => {
    const { keyboardStore } = useStores()
    return (
      <BottomButtonTouchable
        disabled={disabled}
        inverted={inverted}
        onPress={onPress}
      >
        <BottomButtonTextContainer>
          <Row style={{ alignItems: 'center' }}>
            {leftChildren}
            <BottomButtonText inverted={inverted}>{text}</BottomButtonText>
          </Row>
        </BottomButtonTextContainer>
        {!keyboardStore.isVisible && <BottomInsetSpace />}
      </BottomButtonTouchable>
    )
  },
)

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
