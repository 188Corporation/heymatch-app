import React from 'react'
import { useMatchRequests } from 'api/reads'
import { ScrollView } from 'react-native'
import { Container } from 'ui/match/matches-common'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail, MatchRequestType } from 'infra/types'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { ReceivedMatchesPlaceholderSvg } from 'image'

export const ReceivedMatchScreen = () => {
  const { data } = useMatchRequests()
  const hasData = data && data.received.length > 0
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={hasData ? {} : { flex: 1 }}
    >
      {hasData ? (
        <Container>
          {data.received.map((x) => (
            <MatchRequestItem
              key={x.id}
              matchRequestId={x.id}
              status={x.status}
              type={MatchRequestType.RECEIVED}
              group={x.sender_group as GroupDetail}
            />
          ))}
        </Container>
      ) : (
        <ScreenPlaceholder
          image={<ReceivedMatchesPlaceholderSvg />}
          text1='아직 받은 매칭이 없어요'
          text2='핫플에서 그룹을 찾아 먼저 매칭해보세요!'
        />
      )}
    </ScrollView>
  )
}
