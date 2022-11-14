import styled from 'styled-components'
import { Image } from 'ui/common/image'
import { Colors } from 'infra/colors'
import { View } from 'react-native'

export const Avatar = styled(Image)<{ side: number }>`
  width: ${(p) => p.side}px;
  height: ${(p) => p.side}px;
  border-radius: ${(p) => p.side}px;
  background-color: ${Colors.gray.v200};
`

export const AvatarRing = styled(View)`
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 2px;
  border: 4px solid ${Colors.primary.red};
  background-color: ${Colors.white};
`
