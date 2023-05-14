import { BackArrowBlackSvg, BackArrowSvg } from 'image'
import { navigation } from 'navigation/global'
import React, { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Row } from 'ui/common/layout'
import { H3 } from 'ui/common/text'

export const NavigationHeader: React.FC<{
  backButton?: boolean
  backButtonStyle?: 'white' | 'black'
  title?: string
  rightChildren?: ReactNode
}> = ({
  backButton = true,
  backButtonStyle = 'white',
  title,
  rightChildren,
}) => {
  return (
    <>
      <TopInsetSpace />
      <Container>
        {backButton ? (
          <BackButton onPress={() => navigation.goBack()}>
            {
              { white: <BackArrowSvg />, black: <BackArrowBlackSvg /> }[
                backButtonStyle
              ]
            }
          </BackButton>
        ) : (
          <View style={{ height: 52 }} />
        )}
        {title && (
          <TitleTextContainer pointerEvents='none'>
            <H3>{title}</H3>
          </TitleTextContainer>
        )}
        {rightChildren && <RightContainer>{rightChildren}</RightContainer>}
      </Container>
    </>
  )
}

const Container = styled(Row)`
  width: 100%;
  margin: 4px 0;
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

const RightContainer = styled(Row)`
  position: absolute;
  height: 100%;
  align-items: center;
  justify-content: center;
  right: 0;
`
