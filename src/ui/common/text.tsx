import styled from 'styled-components'
import { Text } from 'react-native'
import { Colors } from 'infra/colors'

export const DEFAULT_FONT_FAMILY = 'SUIT'

export const BaseText = styled(Text)`
  font-family: ${DEFAULT_FONT_FAMILY};
  color: ${Colors.gray.v600};
`

export const H1 = styled(BaseText)`
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`

export const H2 = styled(BaseText)`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const H3 = styled(BaseText)`
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
`

export const Body = styled(BaseText)`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`

export const Body2 = styled(BaseText)`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`

export const DescBody2 = styled(Body2)`
  color: ${Colors.gray.v400};
`

export const Caption = styled(BaseText)`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`

export const CaptionS = styled(BaseText)`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
`

export const ButtonText = styled(BaseText)`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.white};
`
