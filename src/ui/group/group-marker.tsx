import { Marker } from 'react-native-nmap'
import { useStores } from 'store/globals'
import { toNmapCoord } from 'infra/util'
import { GroupMarkerBg } from 'image'
import { Image, PixelRatio } from 'react-native'
// @ts-ignore
import RNImageTools from 'react-native-image-tools-wm'
import { CURRENT_OS, OS } from 'infra/constants'
import { useEffect, useState } from 'react'

const MARKER_SIDE = PixelRatio.getPixelSizeForLayoutSize(108)
const MASK_IMAGE = Image.resolveAssetSource(
  CURRENT_OS === OS.IOS ? GroupMarkerBg.maskInversed : GroupMarkerBg.mask,
)

const getImage = async (imageUrl: string) => {
  const resized = await RNImageTools.resize(imageUrl, MARKER_SIDE, MARKER_SIDE)
  return await RNImageTools.mask(resized.uri, MASK_IMAGE.uri, {
    trimTransparency: false,
  })
}

export const GroupMarker = () => {
  const { locationStore } = useStores()
  const loc = locationStore._location
  const [image, setImage] = useState(null)
  useEffect(() => {
    getImage('https://picsum.photos/108').then((v) =>
      setTimeout(() => setImage(v)),
    )
  }, [])
  if (!loc) return null
  const coord = toNmapCoord(loc)
  return (
    <>
      <Marker
        coordinate={coord}
        image={GroupMarkerBg.active}
        width={108}
        height={108}
      />
      <Marker
        coordinate={coord}
        image={image || GroupMarkerBg.active}
        width={108}
        height={108}
      />
    </>
  )
}
