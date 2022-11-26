import React from 'react'
import { Group } from 'infra/types'
import { UsersFillSvg } from 'image'
import { Body } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { formatMaleFemaleInfo } from 'infra/util'
import { Row } from 'ui/common/layout'
import { ColorValue } from 'react-native'

export const GroupDesc: React.FC<{
  data: Group
  color?: ColorValue
  size?: number
  fontSize?: number
}> = ({ data, color = Colors.gray.v400, size = 16, fontSize = 13 }) => {
  return (
    <Row>
      <UsersFillSvg
        style={{ marginRight: 4 }}
        fill={color}
        width={size}
        height={size}
      />
      <Body
        style={{
          color: color,
          lineHeight: size,
          fontSize,
          flexWrap: 'wrap',
        }}
      >
        {formatMaleFemaleInfo(data)}·평균 {data.member_average_age}세
      </Body>
    </Row>
  )
}
