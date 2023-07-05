import { useOnboardingStatus } from 'api/reads'
import { SpecializedjobSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, H2 } from 'ui/common/text'

export const AuthPractitionerScreen = () => {
  const { data } = useOnboardingStatus()

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
