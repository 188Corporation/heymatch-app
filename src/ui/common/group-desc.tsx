import { UsersFillSvg } from 'image'
import { Colors } from 'infra/colors'
import { Group_regacy } from 'infra/types'
import { formatMaleFemaleInfo } from 'infra/util'
import React from 'react'
import { ColorValue } from 'react-native'
import { Row } from 'ui/common/layout'
import { Body } from 'ui/common/text'

export const GroupDesc: React.FC<{
  data: Group_regacy
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

export const GroupDesc_v2: React.FC<{
  memberNumber: number
  memberAvgAge: number
  color?: ColorValue
  size?: number
  fontSize?: number
}> = ({
  memberNumber,
  memberAvgAge,
  color = Colors.gray.v400,
  size = 16,
  fontSize = 13,
}) => {
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
        {memberNumber}명·평균 {memberAvgAge}세
      </Body>
    </Row>
  )
}
