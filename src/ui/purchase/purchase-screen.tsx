import React, { useEffect, useState } from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { ScrollView, View } from 'react-native'
import { BestRibbonSvg, PurchaseBannerImage } from 'image'
import { Image } from 'ui/common/image'
import { Column, Row } from 'ui/common/layout'
import styled from 'styled-components'
import { Body, H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { Button } from 'ui/common/button'
import { formatPrice } from 'infra/util'
import { usePurchaseItems } from 'api/reads'
import { PurchaseItem } from 'infra/types'
import { paymentManager } from 'infra/payments'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { CurrentCandy } from 'ui/common/current-candy'
import { mutate } from 'swr'
import { BottomInsetSpace } from 'ui/common/inset-space'

const interleave = (arr: React.ReactElement[], x: React.ReactElement) =>
  arr.flatMap((e) => [e, x]).slice(0, -1)

export const PurchaseScreen = () => {
  const { data } = usePurchaseItems()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!data) return
    paymentManager
      .init(
        [...data.point_items, ...data.free_pass_items].map((x) => x.product_id),
      )
      .then(() => setLoading(false))
  }, [data])
  if (!data) return null
  const onPurchase = async (productId: string) => {
    setLoading(true)
    await paymentManager.purchase(productId)
    await mutate('/users/my/')
    setLoading(false)
  }
  const purchaseItems = [...data.point_items, ...data.free_pass_items].map(
    (x) => <Item data={x} onPurchase={onPurchase} />,
  )
  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        backButtonStyle='black'
        title='캔디 구매하기'
        rightChildren={
          <Row style={{ marginRight: 20 }}>
            <CurrentCandy />
          </Row>
        }
      />
      <Image
        source={PurchaseBannerImage}
        style={{ width: '100%', aspectRatio: 390 / 120 }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {interleave(purchaseItems, <VerticalSpace />).map((x, i) => (
          <React.Fragment key={i}>{x}</React.Fragment>
        ))}
      </ScrollView>
      <BottomInsetSpace />
      {loading && <LoadingOverlay />}
    </View>
  )
}

const Item: React.FC<{
  data: PurchaseItem
  onPurchase: (productId: string) => void
}> = ({ data, onPurchase }) => {
  return (
    <ItemCard>
      <Column>
        <ItemDescText>{data.name}</ItemDescText>
        <H2>{formatPrice(data.price_in_krw)}</H2>
      </Column>
      <ButtonContainer>
        <Button
          text='구매하기'
          onPress={() => onPurchase(data.product_id)}
          paddingVertical={10}
          paddingHorizontal={16}
        />
      </ButtonContainer>
      {data.best_deal_check && (
        <RibbonContainer>
          <BestRibbonSvg />
        </RibbonContainer>
      )}
    </ItemCard>
  )
}

const PADDING_HORIZONTAL = 24

const VerticalSpace = styled(View)`
  height: 12px;
`

const ItemCard = styled(Row)`
  padding: 16px ${PADDING_HORIZONTAL}px;
  border: 1px solid ${Colors.gray.v200};
  border-radius: 16px;
  justify-content: space-between;
  position: relative;
`

const ItemDescText = styled(Body)`
  color: ${Colors.primary.red};
`

const ButtonContainer = styled(Column)`
  justify-content: center;
`

const RibbonContainer = styled(View)`
  position: absolute;
  top: -4px;
  left: ${PADDING_HORIZONTAL}px;
`
