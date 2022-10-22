import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { ScrollView, View } from 'react-native'
import { BestRibbonSvg, PurchaseBannerImage } from 'image'
import { Image } from 'ui/common/image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Column, Row } from 'ui/common/layout'
import styled from 'styled-components'
import { Body, H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { Button } from 'ui/common/button'
import { formatPrice } from 'infra/util'
import { usePurchaseItems } from 'api/reads'
import { PurchaseItem } from 'infra/types'

const interleave = (arr: React.ReactElement[], x: React.ReactElement) =>
  arr.flatMap((e) => [e, x]).slice(0, -1)

export const PurchaseScreen = () => {
  const insets = useSafeAreaInsets()
  const { data } = usePurchaseItems()
  if (!data) return null
  const purchaseItems = [...data.point_items, ...data.free_pass_items].map(
    (x) => <Item key={x.name} data={x} />,
  )
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <NavigationHeader backButtonStyle='black' title='스토어' />
      <Image
        source={PurchaseBannerImage}
        style={{ width: '100%', aspectRatio: 390 / 120 }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {interleave(purchaseItems, <VerticalSpace />)}
      </ScrollView>
    </View>
  )
}

const Item: React.FC<{
  data: PurchaseItem
}> = ({ data }) => {
  return (
    <ItemCard>
      <Column>
        <ItemDescText>{data.name}</ItemDescText>
        <H2>{formatPrice(data.price_in_krw)}</H2>
      </Column>
      <ButtonContainer>
        <Button
          text='구매하기'
          onPress={() => {}}
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
