import React from 'react'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import { Column, Row } from 'ui/common/layout'
import { Caption, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { useStores } from 'store/globals'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import {
  CardOverlayRejectedSvg as _CardOverlayRejectedSvg,
  CardOverlaySvg as _CardOverlaySvg,
  CheckSvg,
  CloseSvg,
} from 'image'
import { geoinfoToGpsLocation } from 'infra/util'
import { acceptMatchRequest, rejectMatchRequest } from 'api/writes'
import styled from 'styled-components'
import { Image } from 'ui/common/image'
import { TouchableOpacity, View } from 'react-native'
import { mutate } from 'swr'
import { GroupDesc } from 'ui/common/group-desc'
import { MatchRequestStatusLabel } from 'ui/match/match-request-status-label'

const CARD_DISTANCE = 14
const CARD_WIDTH = (WINDOW_DIMENSIONS.width - 20 * 2 - CARD_DISTANCE) / 2

export const MatchRequestItem: React.FC<{
  matchRequestId: number
  status: MatchRequestStatus
  type: MatchRequestType
  group: GroupDetail
}> = ({ matchRequestId, status, type, group }) => {
  const { locationStore, alertStore } = useStores()
  return (
    <Container width={CARD_WIDTH}>
      <GroupImage source={{ uri: group.group_profile_images[0].image }} />
      {status === MatchRequestStatus.REJECTED ? (
        <CardOverlayRejectedSvg />
      ) : (
        <CardOverlaySvg />
      )}
      <ContentContainer>
        <Column>
          {status === MatchRequestStatus.WAITING &&
          type === MatchRequestType.RECEIVED ? (
            <Distance>
              {locationStore.getDistance(
                geoinfoToGpsLocation(group.gps_geoinfo),
                10,
              )}
              m
            </Distance>
          ) : (
            <MatchRequestStatusLabel status={status} type={type} />
          )}
          <Column
            style={{
              opacity: status === MatchRequestStatus.REJECTED ? 0.7 : 1,
            }}
          >
            <GroupTitle>{group.title}</GroupTitle>
            <GroupDesc data={group} color={Colors.gray.v200} />
          </Column>
          <Row style={{ height: 24 }} />
        </Column>
        {type === MatchRequestType.RECEIVED &&
          status === MatchRequestStatus.WAITING && (
            <ButtonRow>
              <RoundButton
                onPress={async () => {
                  try {
                    await rejectMatchRequest(matchRequestId)
                    await mutate('/match-requests/')
                    alertStore.open({ title: '매칭 거절 성공!' })
                  } catch (e) {
                    alertStore.error(e, '매칭 거절에 실패했어요!')
                  }
                }}
              >
                <CloseSvg />
              </RoundButton>
              <RoundButtonDistance />
              <SendButton
                onPress={async () => {
                  try {
                    await acceptMatchRequest(matchRequestId)
                    await mutate('/match-requests/')
                    alertStore.open({ title: '매칭 수락 성공!' })
                  } catch (e) {
                    alertStore.error(e, '매칭 수락에 실패했어요!')
                  }
                }}
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
