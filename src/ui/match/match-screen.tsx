import React from 'react'
import { Colors } from 'infra/colors'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { SafeAreaView } from 'react-native'
import { useMatchRequests } from 'api/reads'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail } from 'infra/types'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'

export const MatchScreen = () => {
  const { data } = useMatchRequests()
  return (
    <KeyboardAvoidingView backgroundColor={Colors.white}>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          {data &&
            data.sent.map((x) => (
              <MatchRequestItem
                key={x.id}
                matchRequestId={x.id}
                group={x.receiver_group as GroupDetail}
              />
            ))}
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const Container = styled(Row)`
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`
