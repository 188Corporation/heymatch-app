import { PersonalBgSVG, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H2 } from 'ui/common/text'

export const PersonalProfileScreen = () => {
  return (
    <View>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <View style={{ position: 'absolute' }}>
          <PersonalBgSVG />
        </View>
        <Container>
          <TouchableOpacity
            style={{
              position: 'relative',
              width: 116,
              marginBottom: 16,
              marginTop: 47,
            }}
            onPress={() => {}}
          >
            <AvatarRing>
              <Avatar
                side={102}
                source={{
                  uri: '',
                }}
              />
            </AvatarRing>
          </TouchableOpacity>
          <H2>수수, 만 27세</H2>
          <Row style={{ alignItems: 'center', marginBottom: 64 }}>
            <VerifiedSvg fill={Colors.primary.blue} />
            <Body style={{ color: Colors.gray.v400 }}>
              삼성전자 | UX디자이너
            </Body>
          </Row>
          <View
            style={{
              width: '100%',
              height: 120,
              borderRadius: 16,
              backgroundColor: Colors.gray.v100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <H2>키 168CM에</H2>
            <H2>슬림 탄탄 몸매를 소유했어요</H2>
          </View>
        </Container>
      </View>
    </View>
  )
}

const Container = styled(View)`
  padding-horizontal: 20px;
  align-items: center;
`
