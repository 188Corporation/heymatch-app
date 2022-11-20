import React from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { TouchableOpacity } from 'react-native'
import { CurrentCandy } from 'ui/common/current-candy'
import { navigation } from 'navigation/global'

export const CandyOverlay: React.FC = () => {
  return (
    <Overlay pointerEvents='box-none'>
      <Button onPress={() => navigation.navigate('PurchaseScreen')}>
        <CurrentCandy />
      </Button>
    </Overlay>
  )
}

const Overlay = styled(Row)`
  position: absolute;
  z-index: 3;
  top: 24px;
  right: 16px;
`

const Button = styled(TouchableOpacity)`
  padding: 8px 16px;
  background-color: white;
  border-radius: 16px;
`
