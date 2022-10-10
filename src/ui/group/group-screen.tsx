import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Alert, View } from 'react-native'
import _NaverMap from 'react-native-nmap'
import { KOREA_CENTER } from 'infra/constants'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import { openSettings } from 'react-native-permissions'
import { LocationMarker } from 'ui/group/location-marker'
import { ButtonGroupOverlay } from 'ui/group/button-group-overlay'
import { GroupMarkerList } from 'ui/group/group-marker-list'
import { HotPlacePolygon } from 'ui/group/hotplace-polygon'
import { SelectedGroupOverlay } from 'ui/group/selected-group-overlay'

export const GroupScreen = () => {
  const { permissionStore, locationStore, mapStore } = useStores()
  useEffect(() => {
    if (permissionStore.location === 'blocked') {
      Alert.alert(
        '헤이매치 필수 권한',
        '헤이매치를 시작하려면 위치 권한이 필요해요.',
        [{ text: '권한 설정하러 가기 ', onPress: () => openSettings() }],
      )
    } else {
      permissionStore
        .request(PermissionType.location)
        .then(() => locationStore.getLocation(true))
        .then((l) => mapStore.focusLocation(l))
    }
  }, [permissionStore, locationStore, mapStore])
  return (
    <Container>
      {/* @ts-ignore */}
      <NaverMap
        ref={mapStore.mapRef}
        center={mapStore.mapCenter || KOREA_CENTER}
        compass={true}
        scaleBar={false}
        zoomControl={false}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={true}
        onCameraChange={(c) => {
          mapStore.setCamera(c)
        }}
        onMapClick={() => {
          mapStore.onNonMarkerTouch()
        }}
      >
        <HotPlacePolygon />
        <GroupMarkerList />
        <LocationMarker />
      </NaverMap>
      <MapOverlay pointerEvents='box-none'>
        <ButtonGroupOverlay />
        <SelectedGroupOverlay />
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
`
