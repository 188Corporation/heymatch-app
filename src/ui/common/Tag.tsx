import { Colors } from 'infra/colors'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Body2 } from './text'

const MediumTagContainer = styled(TouchableOpacity)`
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding-horizontal: 6px;
  margin-right: 8px;
  margin-bottom: 8px;
`

const SmallTagContainer = styled(TouchableOpacity)`
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding-horizontal: 6px;
  margin-right: 8px;
  margin-bottom: 8px;
`

export const Tag = ({
  size = 'm',
  label,
  color = Colors.gray.v200,
  fontColor = Colors.black,
  onPress,
}: {
  size?: 's' | 'm'
  label: string
  color?: string
  fontColor?: string
  onPress?: () => void
}) => {
  if (size === 'm') {
    return (
      <MediumTagContainer style={{ backgroundColor: color }} onPress={onPress}>
        <Body2 style={{ color: fontColor }}>{label}</Body2>
      </MediumTagContainer>
    )
  }
  return (
    <SmallTagContainer style={{ backgroundColor: color }} onPress={onPress}>
      <Text style={{ color: fontColor, fontSize: 13 }}>{label}</Text>
    </SmallTagContainer>
  )
}
