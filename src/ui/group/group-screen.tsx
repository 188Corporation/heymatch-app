import React, { useEffect } from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
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
import { useMy } from 'api/reads'

export const GroupScreen = () => {
  const { data: myData } = useMy()
  const { permissionStore, locationStore, mapStore, alertStore } = useStores()
  useEffect(() => {
    if (permissionStore.location === 'blocked') {
      alertStore.open({
        title: '헤이매치 필수 권한',
        body: '헤이매치를 시작하려면 위치 권한이 필요해요.',
        buttonText: '권한 설정하러 가기',
        onPress: () => openSettings(),
      })
    } else {
      permissionStore
        .request(PermissionType.location)
        .then(() => locationStore.getLocation(true))
        .then((l) => mapStore.focusLocation(l))
    }
  }, [permissionStore, locationStore, mapStore, alertStore])
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
        // https://github.com/QuadFlask/react-native-naver-map/issues/117
        useTextureView={true}
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
        <SelectedGroupOverlay hasJoinedGroup={!!myData?.joined_group?.id} />
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
