import { FemaleSvg, MaleSvg } from 'image'
import { Colors } from 'infra/colors'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, H1, H3 } from 'ui/common/text'

export const GenderScreen = () => {
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>(undefined)

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>성별을 알려주세요</H1>
            <Body2 style={{ color: Colors.gray.v400 }}>
              다른 그룹에게 보여줄 성별을 선택해주세요
            </Body2>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <GenderTouchable
              onPress={() => setGender('Male')}
              selected={gender === 'Male'}
            >
              <MaleSvg />
              <H3 style={{ marginTop: 25 }}>남성</H3>
            </GenderTouchable>
            <GenderTouchable
              onPress={() => setGender('Female')}
              selected={gender === 'Female'}
              style={{ marginLeft: 12 }}
            >
              <FemaleSvg />
              <H3 style={{ marginTop: 25 }}>여성</H3>
            </GenderTouchable>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton text='다음으로' disabled={!gender} onPress={() => {}} />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
const GenderTouchable = styled(TouchableOpacity)<{ selected: boolean }>`
  background-color: ${(p) =>
    p.selected ? Colors.primary.blue : Colors.gray.v100};
  flex: 1;
  border-radius: 24px;
  height: 220px;
  padding: 24px;
  align-items: center;
`
