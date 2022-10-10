import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { NavigationHeader } from 'ui/common/navigation-header'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { Alert, TouchableOpacity, View } from 'react-native'
import { Camera, PhotoFile, useCameraDevices } from 'react-native-vision-camera'
import { PhotoShotCircleSvg } from 'image'
import { useStores } from 'store/globals'
import { openSettings } from 'react-native-permissions'
import { PermissionType } from 'store/permission'
import { H2 } from 'ui/common/text'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'

export const GroupCreatePhotoScreen = () => {
  // handle camera permission
  const { permissionStore } = useStores()
  useEffect(() => {
    if (permissionStore.camera === 'blocked') {
      Alert.alert(
        '헤이매치 필수 권한',
        '그룹 사진을 촬영하려면 카메라 권한이 필요해요.',
        [{ text: '권한 설정하러 가기 ', onPress: () => openSettings() }],
      )
    } else {
      permissionStore.request(PermissionType.camera)
    }
  }, [permissionStore])
  const devices = useCameraDevices()
  const width = WINDOW_DIMENSIONS.width
  const height = (width / 3) * 4
  const cameraRef = useRef<Camera | null>(null)
  const [photo, setPhoto] = useState<PhotoFile>()
  return (
    <Container>
      <NavigationHeader />
      <View
        style={{
          width,
          height,
          marginTop: 16,
          backgroundColor: Colors.gray.v500,
        }}
      >
        {devices.back && (
          <Camera ref={cameraRef} device={devices.back} isActive photo />
        )}
      </View>
      {!photo ? (
        <TouchableOpacity
          style={{ marginTop: 60 }}
          onPress={async () => {
            // TODO: for test only
            // @ts-ignore
            setPhoto(true)
            // const camera = cameraRef.current
            // if (!camera) return
            // const snapshot = await camera.takeSnapshot({
            //   quality: 85,
            //   skipMetadata: true,
            // })
            // setPhoto(snapshot)
          }}
        >
          <PhotoShotCircleSvg />
        </TouchableOpacity>
      ) : (
        <>
          <H2 style={{ color: Colors.white, marginVertical: 40 }}>
            이 사진으로 등록할까요?
          </H2>
          <BottomButton
            text='프로필에 등록'
            onPress={() => navigation.navigate('GroupCreateGenderAgeScreen')}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled(Column)`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
`
