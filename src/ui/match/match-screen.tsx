import React from 'react'
import { ScrollView } from 'react-native'
import { useMatchRequests } from 'api/reads'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail } from 'infra/types'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'

export const MatchScreen = () => {
  const { data } = useMatchRequests()
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        {data && (
          <>
            <>
              {data.received.map((x) => (
                <MatchRequestItem
                  key={x.id}
                  matchRequestId={x.id}
                  status={x.status}
                  group={x.sender_group as GroupDetail}
                />
              ))}
            </>
            <Row
              style={{ width: '100%', height: 40, backgroundColor: 'red' }}
            />
            <>
              {data.sent.map((x) => (
                <MatchRequestItem
                  key={x.id}
                  matchRequestId={x.id}
                  status={x.status}
                  group={x.receiver_group as GroupDetail}
                />
              ))}
            </>
          </>
        )}
      </Container>
    </ScrollView>
  )
}

const Container = styled(Row)`
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`
