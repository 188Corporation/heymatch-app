import { Colors } from 'infra/colors'
import React, { useState } from 'react'
import { View } from 'react-native'
import { DatePicker } from 'react-native-wheel-pick'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, H1 } from 'ui/common/text'

export const BirthdayScreen = () => {
  const [birthday, setBirthday] = useState<Date>()

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>생일을 알려주세요</H1>
            <Body2 style={{ color: Colors.gray.v400 }}>
              본인 확인을 위해 생년월일을 알려주세요
            </Body2>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <DatePicker
              style={{ height: 215, width: 300 }}
              // TODO: 안드로이드일 때 스타일 적용
              // if (CURRENT_OS === OS.ANDROID) {
              //   mapStore.setIsReady(true)
              // }
              minimumDate={new Date('1950-01-01')}
              maximumDate={new Date('2003-12-31')}
              onDateChange={(date) => {
                setBirthday(date)
              }}
            />
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton text='다음으로' onPress={() => {}} />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
