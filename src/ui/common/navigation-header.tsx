import React from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackArrowSvg } from 'image'
import { TouchableOpacity } from 'react-native'
import { navigation } from 'navigation/global'

export const NavigationHeader: React.FC<{
  backButton?: boolean
}> = ({ backButton = true }) => {
  const insets = useSafeAreaInsets()
  return (
    <Container style={{ marginTop: insets.top }}>
      {backButton && (
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrowSvg />
        </BackButton>
      )}
    </Container>
  )
}

const HEADER_HEIGHT = 52 // 28(arrow) + 12(vertical padding) * 2

const Container = styled(Row)`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
`

const BackButton = styled(TouchableOpacity)`
  padding: 12px;
  margin-left: 12px;
`
