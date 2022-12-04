import React, { useEffect, useRef, useState } from 'react'
import { Colors } from 'infra/colors'
import { NavigationHeader } from 'ui/common/navigation-header'
import { TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { PhotoShotCircleSvg } from 'image'
import { useStores } from 'store/globals'
import { openSettings } from 'react-native-permissions'
import { PermissionType } from 'store/permission'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { navigation } from 'navigation/global'
import { useIsFocused } from '@react-navigation/native'
import {
  PHOTO_SCREEN_HEIGHT,
  PHOTO_SCREEN_WIDTH,
  PhotoScreenContainer,
} from 'ui/group-create/group-create-photo-common'

export const GroupCreatePhotoScreen = observer(() => {
  const [isFront, setIsFront] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { permissionStore, groupCreateStore, alertStore } = useStores()
  // handle camera permission
  useEffect(() => {
    if (permissionStore.camera === 'blocked') {
      alertStore.open({
        title: '헤이매치 필수 권한',
        body: '그룹 사진을 촬영하려면 카메라 권한이 필요해요.',
        buttonText: '권한 설정하러 가기',
        onPress: () => openSettings(),
      })
    } else {
      permissionStore.request(PermissionType.camera)
    }
  }, [permissionStore, alertStore])
  // clear photo upon entering
  useEffect(() => {
    groupCreateStore.clearPhoto()
  }, [groupCreateStore])
  // camera setup
  const devices = useCameraDevices()
  const device = isFront ? devices.front : devices.back
  const cameraRef = useRef<Camera | null>(null)
  const isFocused = useIsFocused()
  return (
    <PhotoScreenContainer>
      <NavigationHeader />
      <View style={{ width: PHOTO_SCREEN_WIDTH, height: PHOTO_SCREEN_HEIGHT }}>
        {device ? (
          <Camera
            ref={cameraRef}
            device={device}
            isActive={isFocused}
            photo
            style={{
              width: PHOTO_SCREEN_WIDTH,
              height: PHOTO_SCREEN_HEIGHT,
            }}
          />
        ) : (
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
        )}
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}
          onPress={async () => {
            const camera = cameraRef.current
            if (!camera) return
            setIsLoading(true)
            try {
              const snapshot = await camera.takePhoto()
              groupCreateStore.setPhoto(`file://${snapshot.path}`)
              navigation.navigate('GroupCreatePhotoCheckScreen')
            } finally {
              setIsLoading(false)
            }
          }}
        >
          <PhotoShotCircleSvg />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 16,
            padding: 20,
          }}
          onPress={() => setIsFront(!isFront)}
        >
          <Icon name='flip-camera-ios' size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {isLoading && <LoadingOverlay />}
    </PhotoScreenContainer>
  )
})
