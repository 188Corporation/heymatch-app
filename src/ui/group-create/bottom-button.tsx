import React from 'react'
import { Button } from 'ui/common/button'
import { Colors } from 'infra/colors'
import { Row } from 'ui/common/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { CURRENT_OS, OS } from 'infra/constants'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'

export const BottomButton: React.FC<{
  text: string
  onPress: () => void
}> = observer(({ text, onPress }) => {
  const { keyboardStore } = useStores()
  const insets = useSafeAreaInsets()
  if (keyboardStore.isVisible) return null
  return (
    <Container
      style={{ bottom: insets.bottom + (CURRENT_OS === OS.ANDROID ? 16 : 0) }}
    >
      <Button
        text={text}
        onPress={onPress}
        color={Colors.white}
        textColor={Colors.primary.blue}
      />
    </Container>
  )
})

const Container = styled(Row)`
  position: absolute;
  margin: 0 28px;
`
