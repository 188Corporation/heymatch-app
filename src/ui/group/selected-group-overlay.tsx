import React from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { Image as _Image, TouchableWithoutFeedback, View } from 'react-native'
import { BaseText, Caption, H3 } from 'ui/common/text'
import { UsersFillSvg } from 'image'

export const SelectedGroupOverlay = () => {
  return (
    <Overlay>
      <TouchableWithoutFeedback>
        <Container>
          <Image source={{ uri: 'https://picsum.photos/62' }} />
          <Column style={{ flex: 1 }}>
            <Caption style={{ color: Colors.primary.red }}>550m</Caption>
            <H3 style={{ color: Colors.gray.v600, marginBottom: 2 }}>
              로데오훈남들
            </H3>
            <Row>
              <UsersFillSvg style={{ marginRight: 4 }} />
              <Caption style={{ color: Colors.gray.v400, lineHeight: 16 }}>
                남 5명·평균 30
              </Caption>
            </Row>
          </Column>
          <ArrowRight>{'>'}</ArrowRight>
        </Container>
      </TouchableWithoutFeedback>
    </Overlay>
  )
}

const Overlay = styled(View)`
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 0;
  left: 0;
`

const Container = styled(Row)`
  padding: 30px 36px;
  background-color: ${Colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  align-items: center;
`

const Image = styled(_Image)`
  width: 62px;
  height: 62px;
  border-radius: 62px;
  border: 4px solid ${Colors.gray.v200};
  margin-right: 16px;
`

const ArrowRight = styled(BaseText)`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: ${Colors.gray.v600};
`
