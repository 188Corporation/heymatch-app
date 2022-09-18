import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import styled from 'styled-components'
import { DescBody2, H1 } from 'ui/common/text'
import { Input } from 'ui/common/input'

export const AuthScreen = () => {
  const [phone, setPhone] = useState('')
  return (
    <SafeAreaView>
      <Container>
        <TextArea>
          <H1>반가워요 :)</H1>
          <H1 style={{ marginBottom: 12 }}>휴대폰 번호를 입력해주세요!</H1>
          <DescBody2>등록된 회원인지 확인하고 가입을 진행할게요 :)</DescBody2>
        </TextArea>
        <Input
          placeholder='- 없이 숫자만 입력해주세요'
          value={phone}
          onChange={(v) => setPhone(v)}
        ></Input>
      </Container>
    </SafeAreaView>
  )
}

const Container = styled(View)`
  padding: 72px 20px 0 20px;
`

const TextArea = styled(View)`
  padding: 0 8px;
  margin-bottom: 40px;
`
