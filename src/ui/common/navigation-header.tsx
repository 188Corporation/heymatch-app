import React from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackArrowBlackSvg, BackArrowSvg } from 'image'
import { TouchableOpacity } from 'react-native'
import { navigation } from 'navigation/global'
import { CURRENT_OS, OS } from 'infra/constants'
import { H3 } from 'ui/common/text'

export const NavigationHeader: React.FC<{
  backButton?: boolean
  backButtonStyle?: 'white' | 'black'
  title?: string
}> = ({ backButton = true, backButtonStyle = 'white', title }) => {
  const insets = useSafeAreaInsets()
  return (
    <Container
      style={{
        marginTop: insets.top + (CURRENT_OS === OS.ANDROID ? 8 : 0),
        marginBottom: 8,
      }}
    >
      {backButton && (
        <BackButton onPress={() => navigation.goBack()}>
          {
            { white: <BackArrowSvg />, black: <BackArrowBlackSvg /> }[
              backButtonStyle
            ]
          }
        </BackButton>
      )}
      {title && (
        <TitleTextContainer>
          <H3>{title}</H3>
        </TitleTextContainer>
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

const TitleTextContainer = styled(Row)`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
`
