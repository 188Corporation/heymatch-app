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

export const PurchaseScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <NavigationHeader backButtonStyle='black' title='스토어' />
      <Image
        source={PurchaseBannerImage}
        style={{ width: '100%', aspectRatio: 390 / 120 }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Item desc='캔디 5개' price={4900} />
        <VerticalSpace />
        <Item desc='캔디 10개+2개' price={9900} />
        <VerticalSpace />
        <Item desc='캔디 15개+4개' price={14900} isBest />
        <VerticalSpace />
        <Item desc='캔디 30개+10개' price={29900} />
        <VerticalSpace />
        <Item desc='캔디 50개+20개' price={49000} />
        <VerticalSpace />
        <Item desc='원데이 프리패스(24h)' price={19900} />
      </ScrollView>
    </View>
  )
}

const Item: React.FC<{
  desc: string
  price: number
  isBest?: boolean
}> = ({ desc, price, isBest = false }) => {
  return (
    <ItemCard>
      <Column>
        <ItemDescText>{desc}</ItemDescText>
        <H2>{formatPrice(price)}</H2>
      </Column>
      <ButtonContainer>
        <Button
          text='구매하기'
          onPress={() => {}}
          paddingVertical={10}
          paddingHorizontal={16}
        />
      </ButtonContainer>
      {isBest && (
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
