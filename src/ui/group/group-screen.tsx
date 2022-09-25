import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, View } from 'react-native'
import _NaverMap from 'react-native-nmap'
import { KOREA_CENTER } from 'infra/constants'
import { Shadow } from 'react-native-shadow-2'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GpsFixed } from 'image/index'
import { Colors } from 'infra/colors'

export const GroupScreen = () => {
  return (
    <Container>
      <NaverMap
        center={KOREA_CENTER}
        compass={false}
        scaleBar={false}
        zoomControl={false}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
      ></NaverMap>
      <MapOverlay pointerEvents='box-none'>
        <FloatingButtonShadow>
          <FloatingButton>
            <GpsFixed />
          </FloatingButton>
        </FloatingButtonShadow>
      </MapOverlay>
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
`

const NaverMap = styled(_NaverMap)`
  flex: 1;
`

const MapOverlay = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 28px 24px;
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

const FloatingButtonShadow = styled(Shadow).attrs({
  distance: 4,
})`
  border-radius: 56px;
`
