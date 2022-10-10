import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { H1, H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { BlueContainer } from 'ui/group-create/blue-container'
import { Column, Row } from 'ui/common/layout'
import { SimpleInput } from 'ui/common/simple-input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { View } from 'react-native'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'

const LabelNumberInput: React.FC<{
  label: string
  value: number
  onValueChange: (v: number) => void
}> = ({ label, value, onValueChange }) => {
  return (
    <Column style={{ alignItems: 'center' }}>
      <H2 style={{ color: Colors.white, marginBottom: 8 }}>{label}</H2>
      <SimpleInput
        style={{ width: 120, textAlign: 'center' }}
        keyboardType='number-pad'
        value={value === 0 ? '' : String(value)}
        onChangeText={(v) => onValueChange(Number(v))}
      />
    </Column>
  )
}

export const GroupCreateGenderAgeScreen = observer(() => {
  const { groupCreateStore } = useStores()
  return (
    <>
      <KeyboardAvoidingView>
        <BlueContainer>
          <NavigationHeader />
          <H1
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginTop: 56,
              marginBottom: 80,
            }}
          >
            {'그룹 인원과 평균 나이를\n알려주세요 :)'}
          </H1>
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
      </KeyboardAvoidingView>
      <BottomButton
        text='다음으로'
        onPress={() => navigation.navigate('GroupCreateTitleDescScreen')}
      />
    </>
  )
})
