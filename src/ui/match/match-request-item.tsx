import {
  CardOverlayRejectedSvg as _CardOverlayRejectedSvg,
  CardOverlaySvg as _CardOverlaySvg,
  CheckSvg,
  CloseSvg,
} from 'image'
import { Colors } from 'infra/colors'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import {
  MatchGroupDetail,
  MatchRequestStatus,
  MatchRequestType,
} from 'infra/types'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { accept, reject } from 'store/common-actions'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { Column, Row } from 'ui/common/layout'
import { H3 } from 'ui/common/text'
import { MatchRequestStatusLabel } from 'ui/match/match-request-status-label'

const CARD_DISTANCE = 14
const CARD_WIDTH = (WINDOW_DIMENSIONS.width - 20 * 2 - CARD_DISTANCE) / 2
export const MatchRequestItem: React.FC<{
  matchRequestId: number
  status: MatchRequestStatus
  type: MatchRequestType
  group: MatchGroupDetail
}> = ({ matchRequestId, status, type, group }) => {
  const { alertStore, chatStore } = useStores()

  return (
    <Container width={CARD_WIDTH}>
      <GroupImage
        source={{
          uri: group.group_members[0].user.user_profile_images[0]
            .thumbnail_blurred,
        }}
      />
      {status === MatchRequestStatus.REJECTED ? (
        <CardOverlayRejectedSvg />
      ) : (
        <CardOverlaySvg />
      )}
      <ContentContainer>
        <UpperContainer
          onPress={() =>
            navigation.navigate('NewGroupDetailScreen', {
              id: group.id,
              matchRequest: { id: matchRequestId, status, type },
            })
          }
        >
          <MatchRequestStatusLabel status={status} type={type} />
          <Column
            style={{
              opacity: status === MatchRequestStatus.REJECTED ? 0.7 : 1,
            }}
          >
            <GroupTitle>{group.title}</GroupTitle>
            <GroupDesc_v2
              memberNumber={group.member_number}
              memberAvgAge={group.member_avg_age}
              color={Colors.gray.v200}
            />
          </Column>
          <Row style={{ height: 24 }} />
        </UpperContainer>
        {type === MatchRequestType.RECEIVED &&
          status === MatchRequestStatus.WAITING && (
            <ButtonRow>
              <RoundButton onPress={() => reject(matchRequestId, alertStore)}>
                <CloseSvg />
              </RoundButton>
              <RoundButtonDistance />
              <SendButton
                onPress={() => accept(matchRequestId, alertStore, chatStore)}
              >
                <CheckSvg />
              </SendButton>
            </ButtonRow>
          )}
      </ContentContainer>
    </Container>
  )
}

const GroupImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const CardOverlaySvg = styled(_CardOverlaySvg)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const CardOverlayRejectedSvg = styled(_CardOverlayRejectedSvg)`
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

const UpperContainer = styled(TouchableOpacity)`
  flex-direction: column;
  padding: 20px 20px 0 20px;
  flex: 1;
`

const ButtonRow = styled(Row)`
  justify-content: center;
  padding: 8px 20px 20px 20px;
`

const GroupTitle = styled(H3).attrs({
  numberOfLines: 2,
})`
  color: ${Colors.white};
  margin-bottom: 4px;
`
