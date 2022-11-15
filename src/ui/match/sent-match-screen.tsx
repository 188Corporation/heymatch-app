import React from 'react'
import { useMatchRequests } from 'api/reads'
import { Container } from 'ui/match/matches-common'
import { ScrollView } from 'react-native'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail, MatchRequestType } from 'infra/types'

export const SentMatchesScreen = () => {
  const { data } = useMatchRequests()
  if (!data) return null
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        {data.sent.map((x) => (
          <MatchRequestItem
            key={x.id}
            matchRequestId={x.id}
            status={x.status}
            type={MatchRequestType.SENT}
            group={x.receiver_group as GroupDetail}
          />
        ))}
      </Container>
    </ScrollView>
  )
}
