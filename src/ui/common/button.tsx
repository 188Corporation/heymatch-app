import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ColorValue, TouchableOpacity } from 'react-native'
import { Colors } from 'infra/colors'
import { ButtonText } from 'ui/common/text'
import { Row } from 'ui/common/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'

export const Button: React.FC<{
  text: string
  onPress: () => void
  color?: ColorValue
  textColor?: ColorValue
  paddingVertical?: number
  paddingHorizontal?: number
  leftChildren?: ReactNode
}> = ({
  text,
  onPress,
  color = Colors.primary.red,
  textColor = Colors.white,
  paddingVertical = 16,
  paddingHorizontal,
  leftChildren,
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{ backgroundColor: color, paddingVertical, paddingHorizontal }}
    >
      <Row>
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

interface FullWidthButtonProps {
  text: string
  onPress: () => void
  disabled?: boolean
}

export const FullWidthButton: React.FC<FullWidthButtonProps> = ({
  text,
  onPress,
  disabled = false,
}) => {
  return (
    <FullWidthButtonContainer onPress={onPress} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </FullWidthButtonContainer>
  )
}

export const FullWidthButtonHeight = 18 * 2 + 20

const FullWidthButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  padding: 18px 0;
  align-items: center;
  background-color: ${(p) =>
    p.disabled ? Colors.primary.blueDisabled : Colors.primary.blue};
`

export const BottomButton: React.FC<FullWidthButtonProps> = observer(
  (props) => {
    const { keyboardStore } = useStores()
    const { bottom } = useSafeAreaInsets()
    return (
      <BottomBox
        style={!keyboardStore.isVisible ? { paddingBottom: bottom - 12 } : {}}
        disabled={!!props.disabled}
      >
        <FullWidthButton {...props} />
      </BottomBox>
    )
  },
)

const BottomBox = styled(Row)<{
  disabled: boolean
}>`
  position: absolute;
  bottom: 0;
  background-color: ${(p) =>
    p.disabled ? Colors.primary.blueDisabled : Colors.primary.blue};
`
