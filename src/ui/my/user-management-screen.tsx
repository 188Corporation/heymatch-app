import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Body2 } from 'ui/common/text'
import { Menu } from 'ui/my/menu'

export const UserManagementScreen = () => {
  const { alertStore, authStore } = useStores()
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='회원정보 관리' />
      <Menu
        onPress={() =>
          alertStore.open({
            title: '로그아웃할까요?',
            mainButton: '로그아웃하기',
            subButton: '다음에',
            onMainPress: () => authStore.logout(),
          })
        }
      >
        <Body>로그아웃</Body>
      </Menu>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserWithdrawalScreen')}
      >
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
