import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { NavigationHeader } from 'ui/common/navigation-header'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { PhotoShotCircleSvg } from 'image'
import { useStores } from 'store/globals'
import { openSettings } from 'react-native-permissions'
import { PermissionType } from 'store/permission'
import { H2 } from 'ui/common/text'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'
import { observer } from 'mobx-react'

export const GroupCreatePhotoScreen = observer(() => {
  // handle camera permission
  const { permissionStore, groupCreateStore } = useStores()
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
  // clear photo upon entering
  useEffect(() => {
    groupCreateStore.clearPhoto()
  }, [groupCreateStore])
  const devices = useCameraDevices()
  const width = WINDOW_DIMENSIONS.width
  const height = (width / 3) * 4
  const cameraRef = useRef<Camera | null>(null)
  const { photo } = groupCreateStore
  return (
    <Container>
      <NavigationHeader />
      <View
        style={{
          width,
          height,
          marginTop: 16,
        }}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={{ width, height }} />
        ) : devices.front ? (
          <Camera
            ref={cameraRef}
            device={devices.front}
            isActive
            photo
            style={{ flex: 1 }}
          />
        ) : (
          devices && (
            <View
              style={{
                backgroundColor: Colors.gray.v500,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/*<H3 style={{ color: Colors.white }}>*/}
              {/*  카메라 권한을 허용해주세요!*/}
              {/*</H3>*/}
              {/*<Row style={{ width: 200, marginTop: 24 }}>*/}
              {/*  <Button*/}
              {/*    text='허용하기'*/}
              {/*    onPress={async () => {*/}
              {/*      await permissionStore.checkAll()*/}
              {/*      if (permissionStore.camera === 'blocked') {*/}
              {/*        await openSettings()*/}
              {/*      } else {*/}
              {/*        await permissionStore.request(PermissionType.camera)*/}
              {/*      }*/}
              {/*    }}*/}
              {/*    color={Colors.primary.blue}*/}
              {/*  />*/}
              {/*</Row>*/}
            </View>
          )
        )}
      </View>
      {!photo ? (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 24 }}
          onPress={async () => {
            const camera = cameraRef.current
            if (!camera) return
            const snapshot = await camera.takeSnapshot({
              quality: 85,
              skipMetadata: true,
            })
            groupCreateStore.setPhoto(`file://${snapshot.path}`)
          }}
        >
          <PhotoShotCircleSvg />
        </TouchableOpacity>
      ) : (
        <>
          <H2 style={{ color: Colors.white, marginTop: 16 }}>
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
})

const Container = styled(Column)`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
`
