import React from 'react'
import { Button } from 'ui/common/button'
import { Colors } from 'infra/colors'
import { Row } from 'ui/common/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'

export const BottomButton: React.FC<{
  text: string
  onPress: () => void
}> = ({ text, onPress }) => {
  const insets = useSafeAreaInsets()
  return (
    <Container style={{ bottom: insets.bottom }}>
      <Button
        text={text}
        onPress={onPress}
        color={Colors.white}
        textColor={Colors.primary.blue}
      />
    </Container>
  )
}

const Container = styled(Row)`
  position: absolute;
  margin: 0 28px;
`
