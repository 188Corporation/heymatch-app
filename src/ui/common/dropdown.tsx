import { Colors } from 'infra/colors'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

export const Dropdown = ({
  value,
  items,
  setValue,
  setItems,
}: {
  value: any
  items: any
  setValue: any
  setItems: any
}) => {
  const [open, setOpen] = useState(false)
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      autoScroll
      style={{
        borderColor: 'transparent',
        borderRadius: 12,
        backgroundColor: Colors.gray.v100,
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 16,
        opacity: 1,
      }}
      textStyle={{
        color: Colors.gray.v400,
        fontSize: 16,
        fontWeight: '400',
      }}
      listItemContainerStyle={{
        backgroundColor: Colors.gray.v100,
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 16,
      }}
      dropDownContainerStyle={{
        borderColor: Colors.gray.v100,
        borderRadius: 12,
      }}
      arrowIconStyle={{
        width: 9.5,
      }}
    />
  )
}
