import { useMy } from 'api/reads'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body, DescBody2, H1, H3 } from 'ui/common/text'

export const AgreementScreen = () => {
  const { data } = useMy()
  const [isServiceChecked, setIsServiceChecked] = useState(false)
  const [isPersonalInfoChecked, setIsPersonalInfoChecked] = useState(false)
  const [isGeoChecked, setIsGeoChecked] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(
    isServiceChecked && isPersonalInfoChecked && isGeoChecked,
  )

  useEffect(() => {
    if (isServiceChecked && isPersonalInfoChecked && isGeoChecked) {
      setIsAllChecked(true)
    } else {
      setIsAllChecked(false)
    }
  }, [isGeoChecked, isPersonalInfoChecked, isServiceChecked])

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>필수 동의사항을 확인해주세요</H1>
            <DescBody2>안전하고 편리한 서비스 제공을 위해 필요해요</DescBody2>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 0,
              marginBottom: 30,
            }}
            onPress={() => {
              if (isAllChecked) {
                setIsServiceChecked(false)
                setIsPersonalInfoChecked(false)
                setIsGeoChecked(false)
              } else {
                setIsServiceChecked(true)
                setIsPersonalInfoChecked(true)
                setIsGeoChecked(true)
              }
            }}
          >
            <BouncyCheckbox
              isChecked={
                isServiceChecked && isPersonalInfoChecked && isGeoChecked
              }
              fillColor={Colors.primary.blue}
              size={24}
              disabled
              disableText
              disableBuiltInState
              style={{ marginRight: 16 }}
              innerIconStyle={{
                borderRadius: 6,
              }}
              iconStyle={{
                borderRadius: 6,
              }}
            />
            <H3>모두 동의</H3>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              marginTop: 8,
              marginBottom: 30,
              backgroundColor: Colors.gray.v200,
            }}
          />
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 0,
              }}
              onPress={() => setIsServiceChecked((prev) => !prev)}
            >
              <BouncyCheckbox
                isChecked={isServiceChecked}
                fillColor={Colors.primary.blue}
                size={24}
                disabled
                disableText
                disableBuiltInState
                style={{ marginRight: 16 }}
                innerIconStyle={{
                  borderRadius: 6,
                }}
                iconStyle={{
                  borderRadius: 6,
                }}
              />
              <AgreementItem
                text='서비스 이용약관'
                uri={data?.app_info?.terms_of_service_url!}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 0,
              }}
              onPress={() => setIsPersonalInfoChecked((prev) => !prev)}
            >
              <BouncyCheckbox
                isChecked={isPersonalInfoChecked}
                fillColor={Colors.primary.blue}
                size={24}
                disabled
                disableText
                disableBuiltInState
                style={{ marginRight: 16 }}
                innerIconStyle={{
                  borderRadius: 6,
                }}
                iconStyle={{
                  borderRadius: 6,
                }}
              />
              <AgreementItem
                text='개인정보 수집 및 이용 동의'
                uri={data?.app_info?.privacy_policy_url!}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 0,
              }}
              onPress={() => setIsGeoChecked((prev) => !prev)}
            >
              <BouncyCheckbox
                isChecked={isGeoChecked}
                fillColor={Colors.primary.blue}
                size={24}
                disabled
                disableText
                disableBuiltInState
                style={{ marginRight: 16 }}
                innerIconStyle={{
                  borderRadius: 6,
                }}
                iconStyle={{
                  borderRadius: 6,
                }}
              />
              <AgreementItem
                text='위치기반 서비스 이용약관'
                uri={data?.app_info?.terms_of_location_service_url!}
              />
            </TouchableOpacity>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='시작할게요!'
        disabled={!isAllChecked}
        onPress={() => navigation.navigate('GenderScreen')}
      />
    </>
  )
}

const AgreementItem: React.FC<{
  text: string
  uri: string
}> = ({ text, uri }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goToWebView(text, uri)}
      style={{ paddingVertical: 10, flexDirection: 'row' }}
    >
      <Body
        style={{
          textDecorationLine: 'underline',
          marginRight: 10,
          color: Colors.gray.v400,
        }}
      >
        (필수) {text}
      </Body>
    </TouchableOpacity>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
