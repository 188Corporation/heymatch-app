import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const GroupCreateNameScreen = () => {
  const [text, setText] = useState('')

  return (
    <>
      <KeyboardAvoidingView>
        <NavigationHeader backButtonStyle='black' title='' />
        <View style={{ flexGrow: 1 }}>
          <FlexScrollView>
            <Container>
              <View style={{ marginBottom: 60 }}>
                <H1 style={{ marginBottom: 12 }}>그룹 이름을 정해볼까요?</H1>
                <DescBody2>
                  센스 있는 그룹 이름으로 좋은 인상을 남겨봐요 :)
                </DescBody2>
              </View>
              <Input
                label='그룹명'
                placeholder='ex) 압구정보이즈'
                keyboardType='default'
                value={text}
                onValueChange={(v) => {
                  setText(v)
                }}
                letterCase='lower'
              />
            </Container>
          </FlexScrollView>
        </View>
        <BottomButton text='다음으로' disabled={!text} onPress={() => {}} />
      </KeyboardAvoidingView>
    </>
  )
}

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
