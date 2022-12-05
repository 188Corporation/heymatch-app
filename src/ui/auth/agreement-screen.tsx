import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Body, H1, H3 } from 'ui/common/text'
import { TopInsetSpace } from 'ui/common/inset-space'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { useStores } from 'store/globals'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Colors } from 'infra/colors'
import { useMy } from 'api/reads'
import { navigation } from 'navigation/global'

export const AgreementScreen = () => {
  const { authStore } = useStores()
  const { data } = useMy()
  const [isChecked, setIsChecked] = useState(false)
  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <H1 style={{ marginBottom: 48 }}>필수 동의사항을 체크해주세요!</H1>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              paddingHorizontal: 8,
              paddingVertical: 16,
              flexDirection: 'row',
            }}
            onPress={() => setIsChecked(!isChecked)}
          >
            <BouncyCheckbox
              isChecked={isChecked}
              fillColor={Colors.primary.blue}
              size={32}
              disabled
              disableText
              disableBuiltInState
              style={{ marginRight: 16 }}
            />
            <H3>모두 동의합니다</H3>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              marginTop: 8,
              marginBottom: 24,
              backgroundColor: Colors.gray.v200,
            }}
          />
          <View style={{ paddingHorizontal: 12 }}>
            <AgreementItem
              text='서비스 이용약관'
              uri={data?.app_info?.terms_of_service_url!}
            />
            <AgreementItem
              text='개인정보 수집 및 이용 동의'
              uri={data?.app_info?.privacy_policy_url!}
            />
            <AgreementItem
              text='위치기반 서비스 이용약관'
              uri={data?.app_info?.terms_of_location_service_url!}
            />
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='시작하기'
        disabled={!isChecked}
        onPress={() => authStore.checkAgreement()}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`

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
        {text} (필수)
      </Body>
      <Body style={{ color: Colors.gray.v400 }}>{'>'}</Body>
    </TouchableOpacity>
  )
}
