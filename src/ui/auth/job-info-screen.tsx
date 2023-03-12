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
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, H1 } from 'ui/common/text'

export const JobInfoScreen = () => {
  const [jobTitle, setJobTitle] = useState()
  const jobTitleForm = [
    {
      label: '대학(원)생',
      value: 'college_student',
    },
    {
      label: '직장인',
      value: 'employee',
    },
    {
      label: '자영업',
      value: 'self_employed',
    },
    {
      label: '아르바이트',
      value: 'part_time',
    },
    {
      label: '사업가',
      value: 'businessman',
    },
    {
      label: '기타',
      value: 'etc',
    },
  ]

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <FlexScrollView>
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>직업을 선택해주세요</H1>
            <Body2 style={{ color: Colors.gray.v400 }}>
              정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
            </Body2>
          </View>
          <RadioForm>
            {jobTitleForm.map((x, idx) => {
              return (
                <View key={x.value} style={{ marginBottom: 15 }}>
                  <RadioButton key={x.value}>
                    <RadioButtonInput
                      obj={x}
                      index={idx}
                      isSelected={jobTitle === x.value}
                      onPress={setJobTitle}
                      buttonOuterSize={24}
                      buttonSize={12}
                      buttonInnerColor={Colors.white}
                      buttonOuterColor={
                        jobTitle === x.value
                          ? Colors.primary.blue
                          : Colors.gray.v200
                      }
                      buttonStyle={{
                        backgroundColor:
                          jobTitle === x.value
                            ? Colors.primary.blue
                            : Colors.gray.v200,
                      }}
                    />
                    <RadioButtonLabel
                      obj={x}
                      index={idx}
                      labelHorizontal={true}
                      onPress={setJobTitle}
                      labelStyle={{ fontSize: 16 }}
                    />
                  </RadioButton>
                </View>
              )
            })}
          </RadioForm>
        </Container>
      </FlexScrollView>
      <Button
        text='건너뛰기'
        color={Colors.white}
        textColor={Colors.gray.v400}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
      <BottomButton
        text='다음으로'
        disabled={!jobTitle}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 0px 28px 0 28px;
`
