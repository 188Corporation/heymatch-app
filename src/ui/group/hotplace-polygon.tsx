import React from 'react'
import { Polygon } from 'react-native-nmap/index'
import { useHotPlaceList } from 'api/reads'
import { geoinfoToNmapCoord } from 'infra/util'

const AREA_FILL_COLOR = 'rgba(100,100,100,0.5)'
const AREA_BORDER_COLOR = 'rgb(100,100,100)'
const AREA_BORDER_WIDTH = 1

export const HotPlacePolygon = () => {
  const { data } = useHotPlaceList()
  if (!data) return null
  const holes = data.map((x) =>
    x.zone_boundary_geoinfos.map((geoinfo) => geoinfoToNmapCoord(geoinfo)),
  )
  return (
    <Polygon
      coordinates={[
        { latitude: 25, longitude: 115 },
        { latitude: 25, longitude: 140 },
        { latitude: 50, longitude: 140 },
        { latitude: 50, longitude: 115 },
      ]}
      holes={holes}
      color={AREA_FILL_COLOR}
      outlineWidth={AREA_BORDER_WIDTH}
      outlineColor={AREA_BORDER_COLOR}
    />
  )
}
