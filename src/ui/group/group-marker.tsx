import { Marker } from 'react-native-nmap'
import { geoinfoToNmapCoord } from 'infra/util'
import { GroupMarkerBg } from 'image'
import { Image, PixelRatio } from 'react-native'
// @ts-ignore
import RNImageTools from 'react-native-image-tools-wm'
import { CURRENT_OS, OS } from 'infra/constants'
import React, { useEffect, useState } from 'react'
import { Group } from 'infra/types'
import { useStores } from 'store/globals'

const MARKER_SIDE = PixelRatio.getPixelSizeForLayoutSize(88)
const MASK_IMAGE = Image.resolveAssetSource(
  CURRENT_OS === OS.IOS ? GroupMarkerBg.maskInversed : GroupMarkerBg.mask,
)

const getImage = async (imageUrl: string) => {
  const resized = await RNImageTools.resize(imageUrl, MARKER_SIDE, MARKER_SIDE)
  return await RNImageTools.mask(resized.uri, MASK_IMAGE.uri, {
    trimTransparency: false,
  })
}

export const GroupMarker: React.FC<{
  data: Group
  isSelected: boolean
}> = ({ data, isSelected }) => {
  const { mapStore } = useStores()
  const [image, setImage] = useState(null)
  useEffect(() => {
    getImage(data.group_profile_images[0].thumbnail).then((v) =>
      setTimeout(() => setImage(v)),
    )
  }, [data.group_profile_images])
  if (!data.gps_geoinfo) return null
  const coord = geoinfoToNmapCoord(data.gps_geoinfo)
  const bgImage = isSelected ? GroupMarkerBg.active : GroupMarkerBg.inactive
  return (
    <>
      <Marker coordinate={coord} image={bgImage} width={88} height={88} />
      <Marker
        coordinate={coord}
        image={image || bgImage}
        width={88}
        height={88}
        onClick={() => mapStore.selectGroup(data)}
      />
    </>
  )
}
