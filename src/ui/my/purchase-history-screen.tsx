import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { ScrollView } from 'react-native'
import { useMy } from 'api/reads'
import { UserPurchase } from 'infra/types'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Body, Caption, H3 } from 'ui/common/text'
import { Image } from 'ui/common/image'
import { CandyIconPng } from 'image'
import { formatPrice } from 'infra/util'
import { formatDateTime } from 'infra/datetime'

export const PurchaseHistoryScreen = () => {
  const { data } = useMy()
  if (!data) return null
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='결제내역' />
      <ScrollView>
        {data.user_purchases.map((x) => (
          <Item key={x.id} data={x} />
        ))}
      </ScrollView>
    </>
  )
}

const Item: React.FC<{
  data: UserPurchase
}> = ({ data }) => {
  return (
    <ItemContainer>
      <Caption style={{ marginBottom: 16 }}>
        {formatDateTime(data.purchased_at)}
      </Caption>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row style={{ alignItems: 'center' }}>
          <Image
            source={CandyIconPng}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <Body>{data.point_item.name}</Body>
        </Row>
        <H3>{formatPrice(data.point_item.price_in_krw)}</H3>
      </Row>
    </ItemContainer>
  )
}

const ItemContainer = styled(Column)`
  padding: 16px 24px;
`
