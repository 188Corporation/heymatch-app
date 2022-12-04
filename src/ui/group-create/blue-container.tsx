import React from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Image } from 'ui/common/image'
import { GroupCreateBg } from 'image'
import { View } from 'react-native'

const Container = styled(Column)`
  flex: 1;
  position: relative;
  align-items: center;
`

const BgImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const BottomPadding = styled(View)`
  height: 24px;
`

export const BlueContainer: React.FCC = ({ children }) => {
  return (
    <Container>
      <BgImage source={GroupCreateBg} />
      {children}
      <BottomPadding />
    </Container>
  )
}
