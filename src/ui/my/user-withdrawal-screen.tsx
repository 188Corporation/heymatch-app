import React, { useState } from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body2, H1 } from 'ui/common/text'
import { SimpleInput } from 'ui/common/simple-input'
import { Column } from 'ui/common/layout'
import styled from 'styled-components'
import { Colors } from 'infra/colors'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { useStores } from 'store/globals'
import { withdraw } from 'api/writes'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'

export const UserWithdrawalScreen = () => {
  const { alertStore, authStore } = useStores()
  const [reason, setReason] = useState('')
  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='회원탈퇴하기' />
      <FlexScrollView>
        <Column
          style={{ paddingHorizontal: 28, marginBottom: 24, marginTop: 12 }}
        >
          <H1 style={{ marginBottom: 12 }}>
            우리 이제 이별인가요? 아쉬워요...
          </H1>
          <DescText>
            {'계정을 삭제해도 7일 안에 돌아오면 복구가 가능해요!'}
          </DescText>
          <DescText style={{ textDecorationLine: 'underline' }}>
            {'7일이 지나면 아래의 정보가 모두 삭제돼요.'}
          </DescText>
          <DescText>
            {'\n· 회원 기본정보\n' +
              '· 구매 내역, 캔디 사용내역\n' +
              '· 그룹 생성, 매칭 및 채팅 기록'}
          </DescText>
        </Column>
        <Column style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <SimpleInput
            style={{ flex: 1, height: 200, lineHeight: 28 }}
            value={reason}
            onChangeText={(v) => setReason(v)}
            placeholder={
              '탈퇴하려는 이유를 알려주세요 🥺\n' +
              '소중한 의견을 반영하여\n' +
              '더 좋은 서비스를 만들어갈게요!'
            }
            multiline
            textAlignVertical='top'
          />
        </Column>
      </FlexScrollView>
      <BottomButton
        text='탈퇴하기'
        onPress={() => {
          const v = reason.trim()
          if (v.length === 0) {
            alertStore.open({
              title: '탈퇴 이유를 입력해주세요!',
            })
            return
          }
          alertStore.open({
            title: '정말로 탈퇴할까요?',
            body: '구매한 캔디와 모든 매칭, 채팅 기록이 사라져요!',
            buttonText: '바이매치~!',
            cancelText: '다시 한번 생각하기',
            onPress: async () => {
              try {
                await withdraw(v)
                alertStore.open({
                  title: '회원탈퇴에 성공했어요!',
                  body: '7일 안에 돌아오면 언제든 계정을 복구할 수 있어요. 다음에 또 만나요 👋',
                  preventBackdropClose: true,
                  onPress: () => authStore.logout(),
                })
              } catch (e) {
                alertStore.error(e)
              }
            },
          })
        }}
      />
    </KeyboardAvoidingView>
  )
}

const DescText = styled(Body2)`
  color: ${Colors.gray.v400};
`
