import { FemaleSvg, MaleSvg } from 'image'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { DescBody2, H1, H3 } from 'ui/common/text'

export const GenderScreen = observer(() => {
  const { userProfileStore } = useStores()
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
              onPress={() => userProfileStore.setGender('m')}
              selected={userProfileStore.gender === 'm'}
            >
              <MaleSvg />
              <H3
                style={{
                  marginTop: 25,
                  color:
                    userProfileStore.gender === 'm'
                      ? Colors.white
                      : Colors.black,
                }}
              >
                남성
              </H3>
            </GenderTouchable>
            <GenderTouchable
              onPress={() => userProfileStore.setGender('f')}
              selected={userProfileStore.gender === 'f'}
              style={{ marginLeft: 12 }}
            >
              <FemaleSvg />
              <H3
                style={{
                  marginTop: 25,
                  color:
                    userProfileStore.gender === 'f'
                      ? Colors.white
                      : Colors.black,
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
        disabled={!userProfileStore.gender}
        onPress={() => navigation.navigate('BirthdayScreen')}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
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
