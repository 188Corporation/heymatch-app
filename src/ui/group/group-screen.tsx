import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
import _NaverMap from 'react-native-nmap'
import { CURRENT_OS, DONGSEONGRO_CENTER, OS } from 'infra/constants'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import { openSettings } from 'react-native-permissions'
import { LocationMarker } from 'ui/group/location-marker'
import { ButtonGroupOverlay } from 'ui/group/button-group-overlay'
import { GroupMarkerList } from 'ui/group/group-marker-list'
import { HotPlacePolygon } from 'ui/group/hotplace-polygon'
import { SelectedGroupOverlay } from 'ui/group/selected-group-overlay'
import { useHotPlaceList, useMy } from 'api/reads'
import { CandyOverlay } from 'ui/group/candy-overlay'
import { NoticeOverlay } from 'ui/group/notice-overlay'
import { observer } from 'mobx-react'
import { getDistance } from 'geolib'
import { geoinfoToGpsLocation, getLatLngDeltaFromBounds } from 'infra/util'

const InitialMapFocusProvider: React.FC = observer(() => {
  const [isInitialFocus, setInitialFocus] = useState(true)
  const { locationStore, mapStore } = useStores()
  const { data: hotPlaces } = useHotPlaceList()
  useEffect(() => {
    const location = locationStore._location
    if (
      !isInitialFocus ||
      !mapStore.isReady ||
      !hotPlaces ||
      !hotPlaces.length ||
      !location
    )
      return
    // get the nearest hot place
    const nearest = hotPlaces
      .map((x) => {
        const center = geoinfoToGpsLocation(x.zone_center_geoinfo)
        const distance = getDistance(center, location)
        return { center, distance, boundsRaw: x.zone_boundary_geoinfos }
      })
      .reduce((p, v) => {
        return p.distance < v.distance ? p : v
      })
    // set flag
    setInitialFocus(false)
    // give focus
    const { center, boundsRaw } = nearest
    const bounds = boundsRaw.map((bound) => geoinfoToGpsLocation(bound))
    mapStore.focusLocation(center, getLatLngDeltaFromBounds(bounds))
  }, [
    isInitialFocus,
    mapStore,
    mapStore.isReady,
    locationStore._location,
    hotPlaces,
  ])
  return null
})

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
    }
  }, [permissionStore, locationStore, mapStore, alertStore])
  useEffect(() => {
    // ios map init flow
    if (CURRENT_OS === OS.IOS) {
      setTimeout(() => mapStore.setIsReady(true))
    }
    return () => {
      mapStore.setIsReady(false)
    }
  }, [mapStore])
  return (
    <Container>
      {/* @ts-ignore */}
      <NaverMap
        ref={mapStore.mapRef}
        center={DONGSEONGRO_CENTER}
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
        onInitialized={() => {
          // android map init flow
          if (CURRENT_OS === OS.ANDROID) {
            mapStore.setIsReady(true)
          }
        }}
        minZoomLevel={10}
      >
        <HotPlacePolygon />
        <GroupMarkerList />
        <LocationMarker />
      </NaverMap>
      <MapOverlay pointerEvents='box-none'>
        <ButtonGroupOverlay />
        <SelectedGroupOverlay hasJoinedGroup={!!myData?.joined_group?.id} />
        <CandyOverlay />
        <NoticeOverlay />
      </MapOverlay>
      <InitialMapFocusProvider />
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
