import { UsersFillSvg } from 'image'
import { Colors } from 'infra/colors'
import { Group, Group_v2 } from 'infra/types'
import { formatMaleFemaleInfo } from 'infra/util'
import React from 'react'
import { ColorValue } from 'react-native'
import { Row } from 'ui/common/layout'
import { Body } from 'ui/common/text'

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

export const GroupDesc_v2: React.FC<{
  data: Group_v2
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
        {data.group_members.length}명·평균 {getAverageAge(data)}세
      </Body>
    </Row>
  )
}

function getAverageAge(group: Group_v2) {
  return Math.floor(
    group.group_members
      .map((groupMember) => getAge(groupMember.user.birthdate!))
      .reduce((total, num) => total + num, 0) / group.group_members.length,
  )
}

function getAge(birthDateString: string) {
  const birthDate = new Date(birthDateString)
  const now = new Date()
  const diffInMilliseconds = now.getTime() - birthDate.getTime()
  // 365.25: 윤년 고려
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  const age = Math.floor(diffInYears)
  return age
}
