import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { ScrollView } from 'react-native'

export const PurchaseHistoryScreen = () => {
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='결제내역' />
      <ScrollView style={{ backgroundColor: 'red' }}></ScrollView>
    </>
  )
}
