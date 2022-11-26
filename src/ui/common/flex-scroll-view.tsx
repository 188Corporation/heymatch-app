import React from 'react'
import { ScrollView } from 'react-native'

export const FlexScrollView: React.FCC = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      {children}
    </ScrollView>
  )
}
