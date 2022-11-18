import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { ScrollView } from 'react-native'
import { useMy } from 'api/reads'

export const PurchaseHistoryScreen = () => {
  const { data } = useMy()
  if (!data) return null
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='결제내역' />
      <ScrollView></ScrollView>
    </>
  )
}
