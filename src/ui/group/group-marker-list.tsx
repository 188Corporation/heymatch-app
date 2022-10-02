import React from 'react'
import { useHotPlaceWithGroupsList } from 'api/reads'
import { GroupMarker } from 'ui/group/group-marker'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'

export const GroupMarkerList = observer(() => {
  const { data } = useHotPlaceWithGroupsList()
  const { mapStore } = useStores()
  if (!data) return null
  const groups = data.map((x) => x.groups).flat()
  return (
    <>
      {toJS(groups).map((x) => (
        <GroupMarker
          key={x.id}
          data={x}
          isSelected={mapStore.selectedGroup?.id === x.id}
        />
      ))}
    </>
  )
})
