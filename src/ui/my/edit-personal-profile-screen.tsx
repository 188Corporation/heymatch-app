import { useMy } from 'api/reads'
import { editUserInfo } from 'api/writes'
import { PenSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { femaleBodyForm, maleBodyForm } from 'infra/constants'
import { getAge } from 'infra/util'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { ReactNode, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { ProfilePhotoEditor } from 'ui/auth/profile-photo-register-screen'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H3 } from 'ui/common/text'

export const EditPersonalProfileScreen = observer(() => {
  const { data } = useMy()
  const { userProfileStore, editPersonalInfoStore, alertStore } = useStores()
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

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <H3 style={{ marginBottom: 12 }}>프로필 사진</H3>
            <ProfilePhotoEditor photos={profilePhotos} />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>나이</H3>
            <ProfileInfo
              value={<Body>만 {getAge(userProfileStore.birthdate!)}세</Body>}
              onPress={() => {
                editPersonalInfoStore.setIsEditingNow(true)
                navigation.navigate('EditPersonalInfoStacks', {
                  screen: 'BirthdayScreen',
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
                editPersonalInfoStore.setIsEditingNow(true)
                navigation.navigate('EditPersonalInfoStacks', {
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
                    {userProfileStore.organizationNames
                      ? userProfileStore.organizationNames[0]
                      : '-'}
                  </Body>
                </View>
              }
            />
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text='수정하기'
        onPress={async () => {
          setLoading(true)
          try {
            await editUserInfo(
              userProfileStore.gender!,
              userProfileStore.birthdate!,
              profilePhotos.mainPhoto,
              profilePhotos.sub1Photo,
              profilePhotos.sub2Photo,
              userProfileStore.height,
              userProfileStore.maleBodyForm,
              userProfileStore.femaleBodyForm,
              data.user.job_title,
            )
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
    </KeyboardAvoidingView>
  )
})

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
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
