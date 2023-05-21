import { useMy } from 'api/reads'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Caption, DescBody2, H1 } from 'ui/common/text'

export const UsernameScreen = observer(() => {
  const { data } = useMy()
  const { userProfileStore } = useStores()
  const isUnique = false
  const isEditing = !!data?.user.has_account
  return (
    <KeyboardAvoidingView>
      {!data?.user.has_account ? (
        <NavigationHeader backButtonStyle='black' title='' />
      ) : (
        <TopInsetSpace />
      )}

      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container isEditing={isEditing}>
            <View style={{ marginBottom: 60 }}>
              <H1 style={{ marginBottom: 12 }}>닉네임을 정해주세요</H1>
              <DescBody2>개성있는 닉네임으로 매력을 어필하세요</DescBody2>
            </View>
            <Input
              label='닉네임'
              placeholder='닉네임을 입력해주세요'
              value={userProfileStore.username}
              onValueChange={(v) => {
                userProfileStore.setUsername(v)
              }}
              letterCase='lower'
            />
            <SubButton onPress={() => {}}>
              <Caption>중복 확인</Caption>
            </SubButton>
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text={isEditing ? '수정하기' : '다음으로'}
        disabled={!userProfileStore.username && isUnique}
        onPress={() => {
          if (isEditing) {
            navigation.goBack()
          } else {
            navigation.navigate('GenderScreen')
          }
        }}
      />
    </KeyboardAvoidingView>
  )
})

const Container = styled(View)<{ isEditing: boolean }>`
  padding: ${(p) => (p.isEditing ? '12px' : '72px')} 28px 0px 28px;
`

const SubButton = styled(TouchableOpacity)`
  margin-top: 12px;
  width: 108px;
  height: 38px;
  border-radius: 10px;
  padding: 10px 24px 10px 24px;
  background-color: #f4f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`
