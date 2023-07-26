import { useMatchRequests } from 'api/reads'
import { SentMatchesPlaceholderSvg } from 'image'
import { MatchGroupDetail, MatchRequest, MatchRequestType } from 'infra/types'
import React from 'react'
import { FlatList } from 'react-native'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { MatchRequestItem } from 'ui/match/match-request-item'

export const SentMatchesScreen = () => {
  const { data } = useMatchRequests()
  return (
    <FlatList<MatchRequest>
      numColumns={2}
      contentContainerStyle={[
        { padding: 20, paddingBottom: 4 },
        !data?.sent?.length ? { flex: 1 } : {},
      ]}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyExtractor={(x) => x.id.toString()}
      data={data?.sent}
      renderItem={({ item: x }) => (
        <MatchRequestItem
          key={x.id}
          matchRequestId={x.id}
          status={x.status}
          type={MatchRequestType.SENT}
          group={x.receiver_group as MatchGroupDetail}
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
  )
}
