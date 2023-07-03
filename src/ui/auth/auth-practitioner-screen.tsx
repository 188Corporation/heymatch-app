import { useOnboardingStatus } from 'api/reads'
import { completeInputExtraInfo, editUserInfo } from 'api/writes'
import { SpecializedjobSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, H2 } from 'ui/common/text'

export const AuthPractitionerScreen = () => {
  const { userProfileStore, alertStore } = useStores()
  const { data } = useOnboardingStatus()

  const [loading, setLoading] = useState(false)
  const isEditing = data?.status === 'onboarding_completed'

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container style={{ height: '100%', justifyContent: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <SpecializedjobSvg />
              <H2
                style={{
                  marginBottom: 8,
                  color: Colors.gray.v500,
                  marginTop: 16,
                }}
              >
                특수직/전문직 인증하기
              </H2>
              <Row>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WebViewScreen', {
                      title: '특수직/전문직 인증 요청',
                      uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfODtArEBCC5sph_bC5Szjp46d6A36pNsEMbZN-H0hXVMacfQ/viewform',
                    })
                  }
                >
                  <Body2 style={{ color: Colors.primary.blue }}>구글폼</Body2>
                </TouchableOpacity>
                <Body2 style={{ color: Colors.gray.v400 }}>
                  을 통해 특수직/전문직 인증을 요청해주세요
                </Body2>
              </Row>
              <Body2 style={{ color: Colors.gray.v400 }}>
                영업일 기준 2-3일내 헤이매치 팀에서 응답드리겠습니다.
              </Body2>
            </View>
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text={isEditing ? '완료하기' : '다음으로'}
        onPress={async () => {
          if (isEditing) {
            navigation.setRootWithStack('MainTabs', 'MyScreen')
            return
          }
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
            await completeInputExtraInfo()
            await mutate('/users/my/onboarding/')
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
}

const Container = styled(View)`
  padding: 0px 28px 0px 28px;
`
