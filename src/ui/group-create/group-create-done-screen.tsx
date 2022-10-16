import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, H1, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'
import { BlueContainer } from 'ui/group-create/blue-container'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Shadow } from 'react-native-shadow-2'
import { UsersFillSvg } from 'image'
import { Image } from 'ui/common/image'
import { Circle } from 'ui/common/circle'
import { useMy } from 'api/reads'
import { formatMaleFemaleInfo } from 'infra/util'

export const GroupCreateDoneScreen = () => {
  const { data } = useMy()
  if (!data) return null
  const { joined_group: group } = data
  return (
    <BlueContainer>
      <NavigationHeader backButton={false} />
      <H1
        style={{
          textAlign: 'center',
          color: Colors.white,
          marginTop: 40,
          marginBottom: 100,
        }}
      >
        {'그룹을 완성했어요!\n바로 매칭할 그룹을 찾아보세요 👀'}
      </H1>
      <GroupBoxShadow>
        <GroupBox>
          <Circle
            side={70}
            color={Colors.primary.red}
            style={{ marginBottom: 16 }}
          >
            <Circle side={60} color={Colors.white}>
              <Image
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 54,
                  backgroundColor: Colors.gray.v500,
                }}
                source={{ uri: group.group_profile_images[0].thumbnail }}
              />
            </Circle>
          </Circle>
          <H3 style={{ marginBottom: 4 }}>{group.title}</H3>
          <Row style={{ marginBottom: 24 }}>
            <UsersFillSvg style={{ marginRight: 4 }} />
            <Caption style={{ color: Colors.gray.v400, lineHeight: 16 }}>
              {formatMaleFemaleInfo(group)}·평균 {group.member_average_age}세
            </Caption>
          </Row>
          <Body>{group.introduction}</Body>
        </GroupBox>
      </GroupBoxShadow>
      <BottomButton
        text='가자가자!'
        onPress={() => navigation.setRootWithStack('MainScreen', 'GroupScreen')}
      />
    </BlueContainer>
  )
}

const GroupBoxShadow = styled(Shadow).attrs({
  distance: 4,
})`
  border-radius: 24px;
`

const GroupBox = styled(Column)`
  background-color: ${Colors.white};
  border-radius: 24px;
  width: 320px;
  padding: 28px 24px;
  align-items: center;
`
