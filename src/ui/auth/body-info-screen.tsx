import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { View } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { Dropdown } from 'ui/common/dropdown'
import { TopInsetSpace } from 'ui/common/inset-space'
import { DescBody2, H1, H2 } from 'ui/common/text'
export const BodyInfoScreen = () => {
  const heightItems = Array.from({ length: 61 }, (_, i) => i + 160).map((x) => {
    return {
      value: x,
      label: `${x}cm`,
    }
  })
  const [height, setHeight] = useState(160)
  const [bodyForm, setBodyForm] = useState()
  const maleBodyForm = [
    {
      label: '마른',
      value: 'thin',
    },
    {
      label: '날씬한',
      value: 'slender',
    },
    {
      label: '보통',
      value: 'normal',
    },
    {
      label: '통통한',
      value: 'chubby',
    },
    {
      label: '탄탄한',
      value: 'muscular',
    },
    {
      label: '근육질',
      value: 'bulky',
    },
  ]
  const femaleBodyForm = [
    {
      label: '마른',
      value: 'thin',
    },
    {
      label: '날씬한',
      value: 'slender',
    },
    {
      label: '보통',
      value: 'normal',
    },
    {
      label: '통통한',
      value: 'chubby',
    },
    {
      label: '글래머러스한',
      value: 'glamourous',
    },
    {
      label: '근육질',
      value: 'bulky',
    },
  ]
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
            <Dropdown items={heightItems} value={height} setValue={setHeight} />
          </View>
          <View>
            <H2 style={{ marginBottom: 20 }}>체형</H2>
            <RadioForm>
              {maleBodyForm.map((x, idx) => {
                return (
                  <View key={x.value} style={{ marginBottom: 15 }}>
                    <RadioButton key={x.value}>
                      <RadioButtonInput
                        obj={x}
                        index={idx}
                        isSelected={bodyForm === x.value}
                        onPress={setBodyForm}
                        buttonOuterSize={24}
                        buttonSize={12}
                        buttonInnerColor={Colors.white}
                        buttonOuterColor={
                          bodyForm === x.value
                            ? Colors.primary.blue
                            : Colors.gray.v200
                        }
                        buttonStyle={{
                          backgroundColor:
                            bodyForm === x.value
                              ? Colors.primary.blue
                              : Colors.gray.v200,
                        }}
                      />
                      <RadioButtonLabel
                        obj={x}
                        index={idx}
                        labelHorizontal={true}
                        onPress={setBodyForm}
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
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
      <BottomButton
        text='다음으로'
        disabled={!bodyForm}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
