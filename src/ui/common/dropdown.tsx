import { Colors } from 'infra/colors'
import React from 'react'
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown'

export const Dropdown = ({
  items,
  value,
  setValue,
}: {
  items: {
    value: number
    label: string
  }[]
  value: any
  setValue: any
}) => {
  return (
    <ElementDropdown
      data={items}
      value={value}
      autoScroll={false}
      labelField='label'
      valueField='value'
      onChange={(item) => setValue(item.value)}
      placeholder='160cm'
      style={{
        borderColor: 'transparent',
        backgroundColor: Colors.gray.v100,
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
      }}
      itemTextStyle={{
        color: Colors.gray.v400,
        fontSize: 16,
        fontWeight: '400',
      }}
      selectedTextStyle={{
        color: Colors.gray.v400,
        fontSize: 16,
        fontWeight: '400',
      }}
      placeholderStyle={{
        color: Colors.gray.v400,
        fontSize: 16,
        fontWeight: '400',
      }}
      containerStyle={{
        borderRadius: 12,
        backgroundColor: Colors.gray.v100,
        height: 56 * 4,
        shadowColor: 'transparent',
      }}
    />
  )
}
