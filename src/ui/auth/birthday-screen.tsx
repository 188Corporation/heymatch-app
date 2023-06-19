import { useOnboardingStatus } from 'api/reads'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { DescBody2, H1 } from 'ui/common/text'

export const BirthdayScreen = observer(() => {
  const { data } = useOnboardingStatus()
  const { userProfileStore } = useStores()
  const [birthday, setBirthday] = useState<Date>(new Date('2003-12-31'))

  const convertBirthdate = useCallback(() => {
    const month =
      birthday.getMonth() < 9
        ? `0${birthday.getMonth() + 1}`
        : `${birthday.getMonth() + 1}`

    return `${birthday.getFullYear()}-${month}-${birthday.getDate()}`
  }, [birthday])

  useEffect(() => {
    userProfileStore.setBirthdate(convertBirthdate())
  }, [convertBirthdate, userProfileStore])

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>생일을 알려주세요</H1>
            <DescBody2>본인 확인을 위해 생년월일을 알려주세요</DescBody2>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <DatePicker
              date={birthday}
              onDateChange={(date) => {
                setBirthday(date)
                userProfileStore.setBirthdate(convertBirthdate())
              }}
              minimumDate={new Date('1950-01-01')}
              maximumDate={new Date('2003-12-31')}
              mode='date'
              locale='ko'
              androidVariant='nativeAndroid'
              theme='light'
            />
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text={data?.status === 'onboarding_completed' ? '수정하기' : '다음으로'}
        onPress={() => {
          if (data?.status === 'onboarding_completed') {
            navigation.goBack()
          } else {
            navigation.navigate('ProfilePhotoRegisterScreen')
          }
        }}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
`
