import React from 'react'
import { GroupDetail } from 'infra/types'
import { Column, Row } from 'ui/common/layout'
import styled from 'styled-components'
import { Caption, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { useStores } from 'store/globals'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { TouchableOpacity, View } from 'react-native'
import { CheckSvg, CloseSvg, UsersFillSvg } from 'image'
import { Image } from 'ui/common/image'
import { formatMaleFemaleInfo, geoinfoToGpsLocation } from 'infra/util'

const CARD_DISTANCE = 14
const CARD_WIDTH = (WINDOW_DIMENSIONS.width - 20 * 2 - CARD_DISTANCE) / 2

export const MatchRequestItem: React.FC<{
  matchRequestId: number
  group: GroupDetail
}> = ({ matchRequestId, group }) => {
  const { locationStore } = useStores()
  return (
    <Container width={CARD_WIDTH}>
      <GroupImage source={{ uri: group.group_profile_images[0].image }} />
      <ContentContainer>
        <Column>
          <Distance>
            {locationStore.getDistance(
              geoinfoToGpsLocation(group.gps_geoinfo),
              10,
            )}
            m
          </Distance>
          <GroupTitle>{group.title}</GroupTitle>
          <Row style={{ marginBottom: 24 }}>
            <UsersFillSvg style={{ marginRight: 4 }} fill={Colors.gray.v200} />
            <Caption style={{ color: Colors.gray.v200, lineHeight: 16 }}>
              {formatMaleFemaleInfo(group)}·평균 {group.member_average_age}세
            </Caption>
          </Row>
        </Column>
        <ButtonRow>
          <RoundButton>
            <CloseSvg />
          </RoundButton>
          <RoundButtonDistance />
          <SendButton>
            <CheckSvg />
          </SendButton>
        </ButtonRow>
      </ContentContainer>
    </Container>
  )
}

const GroupImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Container = styled(Column)<{
  width: number
}>`
  width: ${(p) => p.width}px;
  height: ${(p) => (p.width / 3) * 4}px;
  border-radius: 20px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
`

const ContentContainer = styled(Column)`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`

const RoundButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const SendButton = styled(RoundButton)`
  background-color: ${Colors.primary.red};
`

const RoundButtonDistance = styled(View)`
  width: 20px;
`

const ButtonRow = styled(Row)`
  justify-content: center;
`

const Distance = styled(Caption)`
  color: ${Colors.primary.red};
`

const GroupTitle = styled(H3).attrs({
  numberOfLines: 2,
})`
  color: ${Colors.white};
  margin-bottom: 4px;
`
