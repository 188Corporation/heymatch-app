import { editUserInfo } from 'api/writes'
import { CloseSvg, PlusSvg } from 'image'
import { Colors } from 'infra/colors'
import { CURRENT_OS, OS } from 'infra/constants'
import { storage } from 'infra/storage'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { openSettings } from 'react-native-permissions'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { Body2, CaptionS, DescBody2, H1 } from 'ui/common/text'

export const ProfilePhotoRegisterScreen = observer(() => {
  const { permissionStore, alertStore, userProfileStore } = useStores()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (permissionStore.camera === 'blocked') {
      alertStore.open({
        title: '헤이매치 필수 권한',
        body: '프로필 사진을 업로드하려면 갤러리 접근 권한이 필요해요.',
        mainButton: '권한 설정하러 가기',
        onMainPress: () => openSettings(),
      })
    } else {
      permissionStore.request(PermissionType.camera)
    }
  }, [alertStore, permissionStore])

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>프로필 사진을 등록해주세요</H1>
            <DescBody2>얼굴이 잘 보이는 사진으로 등록해주세요</DescBody2>
          </View>
          <ProfilePhotoEditor
            photos={{
              mainPhoto: userProfileStore.getPhotos.mainPhoto,
              sub1Photo: userProfileStore.getPhotos.sub1Photo,
              sub2Photo: userProfileStore.getPhotos.sub2Photo,
            }}
          />
          <Warning style={{ marginTop: 12 }}>
            • 본인 얼굴 하나만 나온 사진이여야 해요!
          </Warning>
          <Warning>• 얼굴이 최대한 정면으로 나온 사진을 올려주세요!</Warning>
          <Warning>• 얼굴이 너무 작게 나온 사진은 안되요!</Warning>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='다음으로'
        disabled={!userProfileStore.photos.mainPhoto}
        onPress={async () => {
          setLoading(true)
          try {
            await editUserInfo({
              username: userProfileStore.username,
              gender: userProfileStore.gender!,
              birthdate: userProfileStore.birthdate!,
              mainProfileImage: userProfileStore.photos.mainPhoto,
              otherProfileImage1: userProfileStore.photos.sub1Photo,
              otherProfileImage2: userProfileStore.photos.sub2Photo,
              heightCm: userProfileStore.height,
              maleBodyForm: userProfileStore.maleBodyForm,
              femaleBodyForm: userProfileStore.femaleBodyForm,
              jobTitle: userProfileStore.jobTitle,
            })
            await mutate('/users/my/')
            await mutate('/users/my/onboarding/')
            await storage.setItem(
              'main-profile-photo',
              userProfileStore.getPhotos.mainPhoto,
            )
          } catch (e) {
            alertStore.error(e, '회원정보 등록에 실패했어요!')
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})

const Warning = styled(Body2)`
  color: ${Colors.primary.blueD1};
`

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
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
  z-index: 100;
`

export const ProfilePhotoEditor = observer(
  ({
    photos,
  }: {
    photos: {
      mainPhoto: string
      sub1Photo?: string
      sub2Photo?: string
    }
  }) => {
    const { userProfileStore } = useStores()
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
            userProfileStore.setPhotos(uri, 'main')
          } else if (photoType === 'sub1') {
            userProfileStore.setPhotos(uri, 'sub1')
          } else {
            userProfileStore.setPhotos(uri, 'sub2')
          }
        },
      )
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 218,
        }}
      >
        <MainTouchable onPress={() => openPhotoGallery('main')}>
          <Chip>
            <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
          </Chip>
          {photos.mainPhoto ? (
            <>
              <Image
                source={{ uri: photos.mainPhoto }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
              />
            </>
          ) : (
            <PlusSvg />
          )}
        </MainTouchable>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <SubTouchable onPress={() => openPhotoGallery('sub1')}>
            {photos.sub1Photo ? (
              <>
                <CloseButton
                  style={{
                    top: 8,
                    right: 8,
                  }}
                  onPress={() => {
                    userProfileStore.setPhotos('', 'sub1')
                  }}
                >
                  <CloseSvg />
                </CloseButton>
                <Image
                  source={{ uri: photos.sub1Photo }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </>
            ) : (
              <PlusSvg />
            )}
          </SubTouchable>
          <SubTouchable
            style={{ marginTop: 14 }}
            onPress={() => {
              openPhotoGallery(!photos.sub1Photo ? 'sub1' : 'sub2')
            }}
          >
            {photos.sub2Photo ? (
              <>
                <CloseButton
                  style={{
                    top: 8,
                    right: 8,
                  }}
                  onPress={() => {
                    userProfileStore.setPhotos('', 'sub2')
                  }}
                >
                  <CloseSvg />
                </CloseButton>
                <Image
                  source={{ uri: photos.sub2Photo }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </>
            ) : (
              <PlusSvg />
            )}
          </SubTouchable>
        </View>
      </View>
    )
  },
)

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 100;
`
