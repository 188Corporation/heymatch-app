import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Menu } from 'ui/my/menu'
import { Body, Body2 } from 'ui/common/text'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { Colors } from 'infra/colors'
import { TouchableOpacity } from 'react-native'

export const UserManagementScreen = () => {
  const { alertStore, authStore } = useStores()
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='회원정보 관리' />
      <Menu
        onPress={() =>
          alertStore.open({
            title: '로그아웃할까요?',
            buttonText: '로그아웃하기',
            cancelText: '다음에',
            onPress: () => authStore.logout(),
          })
        }
      >
        <Body>로그아웃</Body>
      </Menu>
      <TouchableOpacity>
        <LinkText>회원탈퇴하기</LinkText>
      </TouchableOpacity>
    </>
  )
}

const LinkText = styled(Body2)`
  color: ${Colors.gray.v400};
  text-decoration: underline;
  margin-top: 12px;
  margin-left: 28px;
`
