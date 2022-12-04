import React from 'react'
import { RightArrowSvg } from 'image'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { navigation } from 'navigation/global'
import { Body } from 'ui/common/text'

export const Menu: React.FCC<{
  onPress?: () => void
}> = ({ children, onPress }) => {
  return (
    <MenuLayout onPress={onPress}>
      {children}
      <RightArrowSvg />
    </MenuLayout>
  )
}

const MenuLayout = styled(TouchableOpacity)`
  padding: 16px 28px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const WebViewMenu: React.FC<{
  title: string
  uri: string
}> = ({ title, uri }) => {
  return (
    <Menu onPress={() => navigation.navigate('WebViewScreen', { title, uri })}>
      <Body>{title}</Body>
    </Menu>
  )
}
