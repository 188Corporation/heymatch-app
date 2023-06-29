import { useMy, useOnboardingStatus } from 'api/reads'
import { Colors } from 'infra/colors'
import { femaleBodyForm, maleBodyForm } from 'infra/constants'
import { FemaleBodyForm, MaleBodyForm } from 'infra/types'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { Dimensions, Platform, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
  const { data: myData } = useMy()
  const { data: onboardingStatusData } = useOnboardingStatus()
  const { userProfileStore, alertStore } = useStores()
  const insets = useSafeAreaInsets()
  const [height, setHeight] = useState(170)
  const heightItems = Array.from({ length: 91 }, (_, i) => i + 120).map((x) => {
    return {
      value: x,
      label: `${x}cm`,
    }
  })

  const handleOnPress = (v: MaleBodyForm | FemaleBodyForm) => {
    userProfileStore.setBodyForm(myData?.user.gender!, v)
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
            <Dropdown items={heightItems} value={height} setValue={setHeight} />
          </View>
          <View>
            <H2 style={{ marginBottom: 20 }}>체형</H2>
            <ScrollView
              style={{
                height:
                  Dimensions.get('window').height -
                  (392 + insets.bottom + insets.top + 78),
              }}
            >
              <RadioForm>
                {(myData?.user.gender === 'm'
                  ? maleBodyForm
                  : femaleBodyForm
                ).map((x, idx) => {
                  return (
                    <View key={x.value} style={{ marginBottom: 15 }}>
                      <RadioButton key={x.value}>
                        <RadioButtonInput
                          obj={x}
                          index={idx}
                          isSelected={
                            userProfileStore.getBodyForm(
                              myData?.user.gender!,
                            ) === x.value
                          }
                          onPress={handleOnPress}
                          buttonOuterSize={24}
                          buttonSize={12}
                          buttonInnerColor={Colors.white}
                          buttonOuterColor={
                            userProfileStore.getBodyForm(
                              myData?.user.gender!,
                            ) === x.value
                              ? Colors.primary.blue
                              : Colors.gray.v200
                          }
                          buttonStyle={{
                            backgroundColor:
                              userProfileStore.getBodyForm(
                                myData?.user.gender!,
                              ) === x.value
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
            </ScrollView>
          </View>
        </Container>
      </View>
      {onboardingStatusData?.status !== 'onboarding_completed' && (
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
      )}
      <BottomButton
        text={
          onboardingStatusData?.status === 'onboarding_completed'
            ? '수정하기'
            : '다음으로'
        }
        disabled={!userProfileStore.getBodyForm(myData?.user.gender!)}
        onPress={() => {
          userProfileStore.setHeight(height)
          if (onboardingStatusData?.status === 'onboarding_completed') {
            navigation.goBack()
          } else {
            navigation.navigate('JobInfoScreen')
          }
        }}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
`
