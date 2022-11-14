import { View } from 'react-native'
import styled from 'styled-components'
import { Colors } from 'infra/colors'

export const Ring = styled(View)<{
  size: number
  color: typeof Colors
}>`
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: ${(p) => p.size}px;
  background-color: ${(p) => p.color};
`
