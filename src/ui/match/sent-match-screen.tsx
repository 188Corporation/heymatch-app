import React from 'react'
import { useMatchRequests } from 'api/reads'
import { Container } from 'ui/match/matches-common'
import { ScrollView } from 'react-native'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail, MatchRequestType } from 'infra/types'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { SentMatchesPlaceholderSvg } from 'image'

export const SentMatchesScreen = () => {
  const { data } = useMatchRequests()
  const hasData = data && data.sent.length > 0
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={hasData ? {} : { flex: 1 }}
    >
      {hasData ? (
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
      ) : (
        <ScreenPlaceholder
          image={<SentMatchesPlaceholderSvg />}
          text1='아직 보낸 매칭이 없어요'
          text2='핫플에서 그룹을 찾아 먼저 매칭해보세요!'
        />
      )}
    </ScrollView>
  )
}
