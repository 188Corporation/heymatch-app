import { useMy } from 'api/reads'
import { PenSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { femaleBodyForm, maleBodyForm } from 'infra/constants'
import { getAge } from 'infra/util'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { ReactNode, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { ProfilePhotoEditor } from 'ui/auth/profile-photo-register-screen'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H3 } from 'ui/common/text'

export const EditPersonalProfileScreen = observer(() => {
  const { data } = useMy()
  const { userProfileStore, editPersonalInfoStore } = useStores()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data) return
    userProfileStore.setGender(data.user.gender!)
  }, [data, userProfileStore])

  if (!data) return <LoadingOverlay />

  const getBodyForm = () => {
    if (!data) return
    if (data.user.gender === 'm') {
      return (
        maleBodyForm.find(
          (v) =>
            v.value === userProfileStore.maleBodyForm ??
            data.user.male_body_form,
        )?.label ?? '-'
      )
    } else {
      return (
        femaleBodyForm.find(
          (v) =>
            v.value === userProfileStore.femaleBodyForm ??
            data.user.female_body_form,
        )?.label ?? '-'
      )
    }
  }

  const profilePhotos = {
    mainPhoto: data.user.user_profile_images[0].image,
    // sub1Photo: data.user.user_profile_images[1].image ?? '',
    // sub2Photo: data.user.user_profile_images[2].image ?? '',
  }

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <H3 style={{ marginBottom: 12 }}>프로필 사진</H3>
            <ProfilePhotoEditor
              photos={profilePhotos ?? userProfileStore.photos}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>나이</H3>
            <ProfileInfo
              value={
                <Body>
                  만{' '}
                  {getAge(userProfileStore.birthdate ?? data.user.birthdate!)}세
                </Body>
              }
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
                  {userProfileStore.height ?? data.user.height_cm}cm /{' '}
                  {getBodyForm()}
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
                  <Body>{}</Body>
                </View>
              }
              onPress={() =>
                navigation.navigate('EditPersonalInfoStacks', {
                  screen: 'JobInfoScreen',
                })
              }
            />
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text='다음으로'
        disabled={!userProfileStore.email}
        onPress={async () => {}}
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
  onPress,
}: {
  value: ReactNode
  onPress: () => void
}) => {
  return (
    <ProfileInfoContainer onPress={onPress}>
      {value}
      <View style={{ marginLeft: 'auto' }}>
        <PenSvg />
      </View>
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
