import { useMy } from 'api/reads'
import { editUserInfo } from 'api/writes'
import { PenSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { femaleBodyForm, maleBodyForm } from 'infra/constants'
import { getAge } from 'infra/util'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { ReactNode, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { ProfilePhotoEditor } from 'ui/auth/profile-photo-register-screen'
import { BottomButton } from 'ui/common/bottom-button'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H3 } from 'ui/common/text'

export const EditUserProfileScreen = observer(() => {
  const { data } = useMy()
  const { userProfileStore, alertStore } = useStores()
  const [loading, setLoading] = useState(false)

  if (!data) return <LoadingOverlay />

  const getBodyForm = () => {
    if (!data) return
    if (data.user.gender === 'm') {
      return maleBodyForm.find((v) => v.value === userProfileStore.maleBodyForm)
        ?.label
    } else {
      return femaleBodyForm.find(
        (v) => v.value === userProfileStore.femaleBodyForm,
      )?.label
    }
  }

  const profilePhotos = {
    mainPhoto: userProfileStore.photos.mainPhoto,
    sub1Photo: userProfileStore.photos.sub1Photo,
    sub2Photo: userProfileStore.photos.sub2Photo,
  }

  const isEdited = () => {
    if (
      profilePhotos.mainPhoto !== data.user_profile_images[0].image ||
      profilePhotos.sub1Photo !== data.user_profile_images[1]?.image ||
      profilePhotos.sub2Photo !== data.user_profile_images[2]?.image
    ) {
      return false
    }
    if (userProfileStore.birthdate !== data.user.birthdate) {
      return false
    }
    if (userProfileStore.height !== data.user.height_cm) {
      return false
    }
    if (
      userProfileStore.maleBodyForm !== data.user.male_body_form ||
      userProfileStore.femaleBodyForm !== data.user.female_body_form
    ) {
      return false
    }
    return true
  }

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <Container>
          <H3 style={{ marginBottom: 12 }}>프로필 사진</H3>
          <ProfilePhotoEditor photos={profilePhotos} />
          <View style={{ height: 20 }} />
          <ScrollView style={{ height: 350 }}>
            <H3 style={{ marginBottom: 12 }}>나이</H3>
            <ProfileInfo
              value={<Body>만 {getAge(userProfileStore.birthdate!)}세</Body>}
              onPress={() => {
                navigation.navigate('EditUserInfoStacks', {
                  screen: 'BirthdayScreen',
                })
              }}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>닉네임</H3>
            <ProfileInfo
              value={<Body>{userProfileStore.username}</Body>}
              onPress={() => {
                navigation.navigate('EditUserInfoStacks', {
                  screen: 'UsernameScreen',
                })
              }}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>체형</H3>
            <ProfileInfo
              value={
                <Body>
                  {userProfileStore.height}cm / {getBodyForm()}
                </Body>
              }
              onPress={() => {
                navigation.navigate('EditUserInfoStacks', {
                  screen: 'BodyInfoScreen',
                })
              }}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>직업</H3>
            <ProfileInfo
              editable={false}
              value={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {(data.user.verified_company_name ||
                    data.user.verified_school_name) && (
                    <View style={{ marginRight: 4 }}>
                      <VerifiedSvg fill={Colors.primary.blue} />
                    </View>
                  )}
                  <Body>
                    {userProfileStore.verifiedOrganizationNames
                      ? userProfileStore.verifiedOrganizationNames[0]
                      : '-'}
                  </Body>
                </View>
              }
            />
          </ScrollView>
        </Container>
      </View>
      <BottomButton
        text='수정하기'
        // 체형, 키, 나이, 프사가 바뀌었을 때
        disabled={isEdited()}
        onPress={async () => {
          setLoading(true)
          try {
            profilePhotos.mainPhoto !== data.user_profile_images[0].image ||
              profilePhotos.sub1Photo !== data.user_profile_images[1]?.image ||
              profilePhotos.sub2Photo !== data.user_profile_images[2]?.image

            await editUserInfo({
              username: userProfileStore.username,
              gender: userProfileStore.gender!,
              birthdate: userProfileStore.birthdate!,
              mainProfileImage: profilePhotos.mainPhoto,

              // !== data.user_profile_images[0].image
              //   ? profilePhotos.mainPhoto
              //   : undefined,
              otherProfileImage1: profilePhotos.sub1Photo,
              // !== data.user_profile_images[1]?.image
              //   ? profilePhotos.sub1Photo
              //   : undefined,
              otherProfileImage2: profilePhotos.sub2Photo,
              //  !== data.user_profile_images[2]?.image
              //   ? profilePhotos.sub2Photo
              //   : undefined,
              heightCm: userProfileStore.height,
              maleBodyForm: userProfileStore.maleBodyForm,
              femaleBodyForm: userProfileStore.femaleBodyForm,
              jobTitle: userProfileStore.jobTitle,
            })
            await mutate('/users/my/')
            // TODO: 프로필 인증 대기 화면으로 가야함.
            navigation.goBack()
          } catch (e) {
            alertStore.error(e, '정보 수정에 실패했어요!')
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})

const Container = styled(View)`
  padding: 12px 28px 12px 28px;
`

const ProfileInfo = ({
  value,
  editable = true,
  onPress,
}: {
  value: ReactNode
  editable?: boolean
  onPress?: () => void
}) => {
  return (
    <ProfileInfoContainer onPress={onPress}>
      {value}
      <View style={{ marginLeft: 'auto' }}>{editable && <PenSvg />}</View>
    </ProfileInfoContainer>
  )
}
const ProfileInfoContainer = styled(TouchableOpacity)`
  border-radius: 12px;
  background-color: ${Colors.gray.v100};
  padding: 20px;
  display: flex;
  flex-direction: row
  align-items: center;
`
