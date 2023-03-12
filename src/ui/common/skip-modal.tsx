import { Colors } from 'infra/colors'
import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { Button } from './button'
import { DescBody2, H2 } from './text'

export const SkipModal = () => {
  return (
    <View>
      <Modal>
        <Container>
          <H2 style={{ marginBottom: 8 }}>추가 정보 입력을 건너뛸까요?</H2>
          <DescBody2 style={{ marginBottom: 24 }}>
            지금까지 작성해주신 정보만 저장돼요!
          </DescBody2>
          <Button text='계속 이어서 할게요!' />
          <Button
            text='네 건너뛸게요'
            color={Colors.white}
            textColor={Colors.gray.v400}
          />
        </Container>
      </Modal>
    </View>
  )
}

const Container = styled(View)`
  background-color: ${Colors.white};
  border-radius: 24px;
  padding: 28px 16px 20px 16px;
  align-items: center;
`
