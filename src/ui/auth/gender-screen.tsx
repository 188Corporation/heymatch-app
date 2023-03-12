import { FemaleSvg, MaleSvg } from 'image'
import { Colors } from 'infra/colors'
import { Gender } from 'infra/types'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { DescBody2, H1, H3 } from 'ui/common/text'

export const GenderScreen = () => {
  const [gender, setGender] = useState<Gender | undefined>(undefined)

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>성별을 알려주세요</H1>
            <DescBody2>다른 그룹에게 보여줄 성별을 선택해주세요</DescBody2>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <GenderTouchable
              onPress={() => setGender('Male')}
              selected={gender === 'Male'}
            >
              <MaleSvg />
              <H3
                style={{
                  marginTop: 25,
                  color: gender === 'Male' ? Colors.white : Colors.black,
                }}
              >
                남성
              </H3>
            </GenderTouchable>
            <GenderTouchable
              onPress={() => setGender('Female')}
              selected={gender === 'Female'}
              style={{ marginLeft: 12 }}
            >
              <FemaleSvg />
              <H3
                style={{
                  marginTop: 25,
                  color: gender === 'Female' ? Colors.white : Colors.black,
                }}
              >
                여성
              </H3>
            </GenderTouchable>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='다음으로'
        disabled={!gender}
        onPress={() => navigation.navigate('BirthdayScreen')}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
const GenderTouchable = styled(TouchableOpacity)<{ selected: boolean }>`
  background-color: ${(p) =>
    // TODO: selected 컬러 수정 필요
    p.selected ? Colors.primary.blue : Colors.gray.v100};
  flex: 1;
  border-radius: 24px;
  height: 220px;
  padding: 24px;
  align-items: center;
`
