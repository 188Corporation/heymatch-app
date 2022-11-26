import React from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { TouchableOpacity } from 'react-native'
import { CurrentCandy } from 'ui/common/current-candy'
import { navigation } from 'navigation/global'
import { TopInsetSpace } from 'ui/common/inset-space'

export const CandyOverlay = () => {
  return (
    <Overlay pointerEvents='box-none'>
      <TopInsetSpace />
      <Button onPress={() => navigation.navigate('PurchaseScreen')}>
        <CurrentCandy />
      </Button>
    </Overlay>
  )
}

const Overlay = styled(Column)`
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
`

const Button = styled(TouchableOpacity)`
  padding: 8px 16px;
  background-color: white;
  border-radius: 16px;
  margin-top: 16px;
  margin-right: 16px;
`
