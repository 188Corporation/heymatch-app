import styled from 'styled-components'
import { ColorValue, View } from 'react-native'

export const Circle = styled(View)<{ side: number; color: ColorValue }>`
  align-items: center;
  justify-content: center;
  width: ${(p) => p.side}px;
  height: ${(p) => p.side}px;
  border-radius: ${(p) => p.side}px;
  background-color: ${(p) => String(p.color)};
`
