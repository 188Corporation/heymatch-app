import { useOnboardingStatus } from 'api/reads'
import { UnregisteredDomainSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, H2 } from 'ui/common/text'

export const UnregisteredDomainScreen = () => {
  const { userProfileStore } = useStores()
  const { data } = useOnboardingStatus()

  const isEditing = data?.status === 'onboarding_completed'

  const schoolOrCompany = () => {
    if (userProfileStore.jobTitle === 'employee') return '회사'
    else if (userProfileStore.jobTitle === 'college_student') return '학교'
  }

  const studentOrEmployee = () => {
    if (userProfileStore.jobTitle === 'employee') return '직장인'
    else if (userProfileStore.jobTitle === 'college_student')
      return '대학(원)생'
  }
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container style={{ height: '100%', justifyContent: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <UnregisteredDomainSvg />
              <H2
                style={{
                  marginBottom: 8,
                  color: Colors.gray.v500,
                  marginTop: 16,
                }}
              >
                {schoolOrCompany()}를 찾을 수 없어요 😥
              </H2>
              <Row>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WebViewScreen', {
                      title: '회사(학교) 등록 요청',
                      uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdDuQq4Mzkr5x4CIo2FJg1G9Umawd_33yJscna7_I5lNTe5fg/viewform',
                    })
                  }
                >
                  <Body2 style={{ color: Colors.primary.blue }}>구글폼</Body2>
                </TouchableOpacity>
                <Body2 style={{ color: Colors.gray.v400 }}>
                  을 작성해주시면 빠른 시일 내로 도메인을 추가할게요!
                </Body2>
              </Row>
              <Body2 style={{ color: Colors.gray.v400 }}>
                가입 후 마이페이지에서 재인증이 가능하며, 인증 전까지는
              </Body2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                {studentOrEmployee()}으로 표시돼요
              </Body2>
            </View>
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text={isEditing ? '완료하기' : '다음으로'}
        onPress={() => {
          navigation.navigate('ProfilePhotoRegisterScreen')
        }}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 0px 28px 0px 28px;
`
