import { useOnboardingStatus } from 'api/reads'
import { checkUsername } from 'api/writes'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, Caption, DescBody2, H1 } from 'ui/common/text'

type InvalidReason = 'INVALID_LENGTH' | 'INVALID_INPUT'

export const UsernameScreen = observer(() => {
  const { data } = useOnboardingStatus()
  const { userProfileStore } = useStores()
  const [isUnique, setIsUnique] = useState<boolean | null>(null)
  const isEditing = data?.status === 'onboarding_completed'
  const [invalidUsername, setInvalidUsername] = useState<InvalidReason | null>(
    null,
  )

  const validateUsername = (username: string) => {
    if (username.length < 2 || username.length > 10) {
      setInvalidUsername('INVALID_LENGTH')
      return false
    }
    const regex = /^[가-힣a-zA-Z0-9]+$/
    if (regex.test(username)) {
      if (/^[가-힣]+$/.test(username)) {
        if (!/^[^가-힣]*[ㄱ-ㅎㅏ-ㅣ]*[^가-힣]*$/.test(username)) {
          setInvalidUsername(null)
          return true
        } else {
          setInvalidUsername('INVALID_INPUT')
          return false
        }
      } else {
        setInvalidUsername(null)
        return true
      }
    } else {
      setInvalidUsername('INVALID_INPUT')
      return false
    }
  }

  const getInvalidUsernameReason = () => {
    if (invalidUsername === 'INVALID_LENGTH') {
      return '닉네임은 2글자 이상으로 입력해주세요'
    } else if (invalidUsername === 'INVALID_INPUT') {
      return '한글, 영어, 숫자만 입력할 수 있어요. (자음, 모음만 있는 한글은 처리하지 않습니다.)'
    }
  }

  return (
    <KeyboardAvoidingView>
      {isEditing ? (
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
                setIsUnique(null)
                setInvalidUsername(null)
              }}
              letterCase='lower'
            />
            {invalidUsername && (
              <Body2 style={{ marginTop: 4, color: Colors.primary.red }}>
                {getInvalidUsernameReason()}
              </Body2>
            )}
            {isUnique === false && (
              <Body2 style={{ marginTop: 4, color: Colors.primary.red }}>
                이미 존재하는 닉네임이에요!
              </Body2>
            )}
            {isUnique === true && (
              <Body2 style={{ marginTop: 4, color: Colors.primary.blue }}>
                사용 가능한 닉네임이에요!
              </Body2>
            )}
            <SubButton
              onPress={async () => {
                if (!validateUsername(userProfileStore.username)) {
                  return
                }
                try {
                  await checkUsername(userProfileStore.username)
                  await mutate('/users/my/')
                  setIsUnique(true)
                } catch (e) {
                  setIsUnique(false)
                }
              }}
            >
              <Caption>중복 확인</Caption>
            </SubButton>
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text={isEditing ? '수정하기' : '다음으로'}
        disabled={!userProfileStore.username || !isUnique}
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
