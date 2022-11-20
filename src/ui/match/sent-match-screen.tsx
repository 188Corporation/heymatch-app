import React from 'react'
import { useMatchRequests } from 'api/reads'
import { FlatList } from 'react-native'
import { MatchRequestItem } from 'ui/match/match-request-item'
import { GroupDetail, MatchRequest, MatchRequestType } from 'infra/types'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { SentMatchesPlaceholderSvg } from 'image'
import { Column } from 'ui/common/layout'

export const SentMatchesScreen = () => {
  const { data } = useMatchRequests()
  return (
    <Column style={{ flex: 1, padding: 20 }}>
      <FlatList<MatchRequest>
        numColumns={2}
        contentContainerStyle={{ flex: 1 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(x) => x.id.toString()}
        data={data?.sent}
        renderItem={({ item: x }) => (
          <MatchRequestItem
            key={x.id}
            matchRequestId={x.id}
            status={x.status}
            type={MatchRequestType.SENT}
            group={x.receiver_group as GroupDetail}
          />
        )}
        ListEmptyComponent={
          <ScreenPlaceholder
            image={<SentMatchesPlaceholderSvg />}
            text1='아직 보낸 매칭이 없어요'
            text2='핫플에서 그룹을 찾아 먼저 매칭해보세요!'
          />
        }
      />
    </Column>
  )
}
