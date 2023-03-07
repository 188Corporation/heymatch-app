import { PlusSvg } from 'image'
import { Colors } from 'infra/colors'
import { CURRENT_OS, OS } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { openSettings } from 'react-native-permissions'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, CaptionS, H1 } from 'ui/common/text'

export const ProfilePhotoRegisterScreen = observer(() => {
  const { permissionStore, alertStore, indivisualProfileStore } = useStores()

  useEffect(() => {
    if (permissionStore.camera === 'blocked') {
      alertStore.open({
        title: '헤이매치 필수 권한',
        body: '그룹 사진을 업로드하려면 갤러리 접근 권한이 필요해요.',
        buttonText: '권한 설정하러 가기',
        onPress: () => openSettings(),
      })
    } else {
      permissionStore.request(PermissionType.camera)
    }
  }, [alertStore, permissionStore])

  const openPhotoGallery = (photoType: 'main' | 'sub1' | 'sub2') => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: CURRENT_OS === OS.ANDROID,
      },
      (res) => {
        if (!res.assets) return
        const uri = res.assets[0].uri!
        if (photoType === 'main') {
          indivisualProfileStore.setPhotos(uri, 'main')
        } else if (photoType === 'sub1') {
          indivisualProfileStore.setPhotos(uri, 'sub1')
        } else {
          indivisualProfileStore.setPhotos(uri, 'sub2')
        }
      },
    )
  }

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>프로필 사진을 등록해주세요</H1>
            <Body2 style={{ color: Colors.gray.v400 }}>
              얼굴이 잘 보이는 사진으로 등록해주세요
            </Body2>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 218 }}>
            <MainTouchable onPress={() => openPhotoGallery('main')}>
              <Chip>
                <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
              </Chip>
              {indivisualProfileStore.getPhotos.mainPhoto ? (
                <Image
                  source={{ uri: indivisualProfileStore.getPhotos.mainPhoto }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              ) : (
                <PlusSvg />
              )}
            </MainTouchable>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <SubTouchable onPress={() => openPhotoGallery('sub1')}>
                {indivisualProfileStore.getPhotos.sub1Photo ? (
                  <Image
                    source={{ uri: indivisualProfileStore.getPhotos.sub1Photo }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <PlusSvg />
                )}
              </SubTouchable>
              <SubTouchable
                style={{ marginTop: 14 }}
                onPress={() => openPhotoGallery('sub2')}
              >
                {indivisualProfileStore.getPhotos.sub2Photo ? (
                  <Image
                    source={{ uri: indivisualProfileStore.getPhotos.sub2Photo }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <PlusSvg />
                )}
              </SubTouchable>
            </View>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='다음으로'
        disabled={!indivisualProfileStore.photos.mainPhoto}
        onPress={() => navigation.navigate('BirthdayScreen')}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
const MainTouchable = styled(TouchableOpacity)`
  background-color: ${Colors.gray.v100};
  flex: 2;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const SubTouchable = styled(TouchableOpacity)`
  background-color: ${Colors.gray.v100};
  flex: 1;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`
const Chip = styled(View)`
  width: 33px;
  height: 23px;
  border-radius: 8px;
  background-color: ${Colors.primary.blue};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  left: 26px;
`
