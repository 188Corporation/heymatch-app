import React from 'react'
import { useMatchRequests } from 'api/reads'
import { ScrollView } from 'react-native'
import { Container } from 'ui/match/matches-common'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail, MatchRequestType } from 'infra/types'

export const ReceivedMatchScreen = () => {
  const { data } = useMatchRequests()
  if (!data) return null
  return (
    <ScrollView style={{ flex: 1 }}>
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
    </ScrollView>
  )
}
