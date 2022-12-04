import React, { useEffect } from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { BlueContainer } from 'ui/group-create/blue-container'
import { Column, Row } from 'ui/common/layout'
import { SimpleInput } from 'ui/common/simple-input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { View } from 'react-native'
import { navigation } from 'navigation/global'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { GroupCreateH1 } from 'ui/group-create/group-create-h1'

const LabelNumberInput: React.FC<{
  label: string
  value: number | null
  onValueChange: (v: number) => void
}> = ({ label, value, onValueChange }) => {
  return (
    <Column style={{ alignItems: 'center' }}>
      <H2 style={{ color: Colors.white, marginBottom: 8 }}>{label}</H2>
      <SimpleInput
        style={{ width: 120, textAlign: 'center' }}
        keyboardType='number-pad'
        value={value === null ? '' : String(value)}
        onChangeText={(v) => onValueChange(Number(v) || 0)}
        maxLength={2}
      />
    </Column>
  )
}

export const GroupCreateGenderAgeScreen = observer(() => {
  const { groupCreateStore } = useStores()
  useEffect(() => {
    groupCreateStore.clearGenderAge()
  }, [groupCreateStore])
  return (
    <KeyboardAvoidingView>
      <FlexScrollView>
        <BlueContainer>
          <NavigationHeader />
          <GroupCreateH1 style={{ marginBottom: 80 }}>
            {'그룹 인원과 평균 나이를\n알려주세요 :)'}
          </GroupCreateH1>
          <Row style={{ marginBottom: 48 }}>
            <LabelNumberInput
              label='남자'
              value={groupCreateStore.maleCount}
              onValueChange={(v) => {
                groupCreateStore.setMaleCount(v)
              }}
            />
            <View style={{ width: 16 }} />
            <LabelNumberInput
              label='여자'
              value={groupCreateStore.femaleCount}
              onValueChange={(v) => {
                groupCreateStore.setFemaleCount(v)
              }}
            />
          </Row>
          <LabelNumberInput
            label='평균 나이'
            value={groupCreateStore.averageAge}
            onValueChange={(v) => {
              groupCreateStore.setAverageAge(v)
            }}
          />
        </BlueContainer>
      </FlexScrollView>
      <BottomButton
        inverted
        text='다음으로'
        onPress={() => {
          // 둘 중에 하나는 1 이상의 숫자가 되어야 함
          if (!groupCreateStore.maleCount && !groupCreateStore.femaleCount) {
            return
          }
          if (!groupCreateStore.averageAge) {
            return
          }
          navigation.navigate('GroupCreateTitleDescScreen')
        }}
      />
    </KeyboardAvoidingView>
  )
})
