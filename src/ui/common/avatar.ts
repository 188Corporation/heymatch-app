import styled from 'styled-components'
import { Image } from 'ui/common/image'
import { Colors } from 'infra/colors'

export const Avatar = styled(Image)<{ side: number }>`
  width: ${(p) => p.side}px;
  height: ${(p) => p.side}px;
  border-radius: ${(p) => p.side}px;
  background-color: ${Colors.gray.v200};
`
