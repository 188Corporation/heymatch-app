import { useMatchRequests } from 'api/reads'
import { ReceivedMatchesPlaceholderSvg } from 'image'
import { GroupDetail_regacy, MatchRequest, MatchRequestType } from 'infra/types'
import React from 'react'
import { FlatList } from 'react-native'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { MatchRequestItem } from 'ui/match/match-request-item'

export const ReceivedMatchScreen = () => {
  const { data } = useMatchRequests()
  return (
    <FlatList<MatchRequest>
      numColumns={2}
      contentContainerStyle={[
        { padding: 20, paddingBottom: 4 },
        !data?.received?.length ? { flex: 1 } : {},
      ]}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyExtractor={(x) => x.id.toString()}
      data={data?.received}
      renderItem={({ item: x }) => (
        <MatchRequestItem
          key={x.id}
          matchRequestId={x.id}
          status={x.status}
          type={MatchRequestType.RECEIVED}
          group={x.sender_group as GroupDetail_regacy}
        />
      )}
      ListEmptyComponent={
        <ScreenPlaceholder
          image={<ReceivedMatchesPlaceholderSvg />}
          text1='아직 받은 매칭이 없어요'
          text2='핫플에서 그룹을 찾아 먼저 매칭해보세요!'
        />
      }
    />
  )
}
