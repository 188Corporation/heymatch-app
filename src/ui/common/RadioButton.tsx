import { Colors } from 'infra/colors'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Body } from './text'

type RadioButtonProps = {
  value: string
  label: string
}

export const RadioButton = ({
  obj,
  isSelected,
  onPress,
}: {
  obj: RadioButtonProps
  isSelected: boolean
  onPress: (v: string) => void
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(obj.value)}
      style={{ flexDirection: 'row' }}
    >
      <View style={{ marginRight: 12 }}>
        {isSelected ? (
          <View
            style={{
              position: 'relative',
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: Colors.primary.blue,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 6,
                left: 6,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: Colors.white,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: Colors.gray.v200,
            }}
          />
        )}
      </View>
      <Body>{obj.label}</Body>
    </TouchableOpacity>
  )
}
