import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Body2, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'

export const ScreenPlaceholder: React.FC<{
  image: ReactNode
  text1: string
  text2: string
}> = ({ image, text1, text2 }) => {
  return (
    <Container>
      {image}
      <Column style={{ alignItems: 'center', marginTop: 8 }}>
        <H3 style={{ color: Colors.gray.v500, marginBottom: 4 }}>{text1}</H3>
        <Body2 style={{ color: Colors.gray.v400 }}>{text2}</Body2>
      </Column>
    </Container>
  )
}

const Container = styled(Column)`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: -60px;
`
