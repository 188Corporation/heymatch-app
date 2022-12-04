import styled from 'styled-components'
import { TouchableOpacity, View } from 'react-native'
import { GpsFixedSvg } from 'image'
import React from 'react'
import { Colors } from 'infra/colors'
import { useStores } from 'store/globals'

export const ButtonGroupOverlay = () => {
  const { locationStore, mapStore } = useStores()
  return (
    <Container pointerEvents='box-none'>
      <FloatingButton
        onPress={() =>
          locationStore.getLocation(true).then((v) => mapStore.focusLocation(v))
        }
      >
        <GpsFixedSvg />
      </FloatingButton>
    </Container>
  )
}

const Container = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 48px 24px;
`

const FloatingButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  border: 1px solid ${Colors.gray.v100};
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
`
