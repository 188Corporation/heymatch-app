import { Colors } from 'infra/colors'
import { femaleBodyForm, maleBodyForm } from 'infra/constants'
import { FemaleBodyForm, MaleBodyForm } from 'infra/types'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { Dropdown } from 'ui/common/dropdown'
import { TopInsetSpace } from 'ui/common/inset-space'
import { DescBody2, H1, H2 } from 'ui/common/text'
export const BodyInfoScreen = observer(() => {
  const { userProfileStore, alertStore } = useStores()

  const heightItems = Array.from({ length: 61 }, (_, i) => i + 160).map((x) => {
    return {
      value: x,
      label: `${x}cm`,
    }
  })

  const handleOnPress = (v: MaleBodyForm | FemaleBodyForm) => {
    userProfileStore.setBodyForm(userProfileStore.gender!, v)
  }

  return (
    <>
      <View style={{ flexGrow: 1 }}>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>회원님에 대해 더 알려주세요!</H1>
            <DescBody2>
              정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
            </DescBody2>
          </View>
          <View style={{ marginBottom: 40, zIndex: 100 }}>
            <H2 style={{ marginBottom: 10 }}>키</H2>
            <Dropdown
              items={heightItems}
              value={userProfileStore.height}
              setValue={userProfileStore.setHeight}
            />
          </View>
          <View>
            <H2 style={{ marginBottom: 20 }}>체형</H2>
            <RadioForm>
              {(userProfileStore.gender === 'm'
                ? maleBodyForm
                : femaleBodyForm
              ).map((x, idx) => {
                return (
                  <View key={x.value} style={{ marginBottom: 15 }}>
                    <RadioButton key={x.value}>
                      <RadioButtonInput
                        obj={x}
                        index={idx}
                        isSelected={userProfileStore.getBodyForm === x.value}
                        onPress={handleOnPress}
                        buttonOuterSize={24}
                        buttonSize={12}
                        buttonInnerColor={Colors.white}
                        buttonOuterColor={
                          userProfileStore.getBodyForm === x.value
                            ? Colors.primary.blue
                            : Colors.gray.v200
                        }
                        buttonStyle={{
                          backgroundColor:
                            userProfileStore.getBodyForm === x.value
                              ? Colors.primary.blue
                              : Colors.gray.v200,
                        }}
                      />
                      <RadioButtonLabel
                        obj={x}
                        index={idx}
                        labelHorizontal={true}
                        onPress={handleOnPress}
                        labelStyle={{ fontSize: 16 }}
                      />
                    </RadioButton>
                  </View>
                )
              })}
            </RadioForm>
          </View>
        </Container>
      </View>

      <Button
        text='건너뛰기'
        color={Colors.white}
        textColor={Colors.gray.v400}
        onPress={() => {
          alertStore.open({
            title: '추가 정보 입력을 건너뛸까요?',
            body: '지금까지 작성해주신 정보만 저장돼요!',
            mainButton: '계속 이어서 할게요!',
            subButton: '네 건너뛸게요',
            onSubPress: () => navigation.navigate('JobInfoScreen'),
          })
        }}
      />
      <BottomButton
        text='다음으로'
        disabled={!userProfileStore.getBodyForm}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
`
