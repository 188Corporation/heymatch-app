import React from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { Image as _Image, TouchableWithoutFeedback, View } from 'react-native'
import { BaseText, Caption, H3 } from 'ui/common/text'
import { UsersFillSvg } from 'image'
import { useStores } from 'store/globals'
import { observer } from 'mobx-react'
import { useGroup } from 'api/reads'
import { formatMaleFemaleInfo, geoinfoToGpsLocation } from 'infra/util'

export const SelectedGroupOverlay = observer(() => {
  const {
    alertStore,
    locationStore: { getDistance },
    mapStore: { selectedGroup },
  } = useStores()
  const { data } = useGroup(selectedGroup?.id)
  if (!data) return null
  return (
    <Overlay pointerEvents='box-none'>
      <TouchableWithoutFeedback
        onPress={() =>
          alertStore.open({
            title: '그룹을 만들면 상세 프로필이 보여요!',
            body: '그룹을 만들어 다른 그룹과 매칭해보세요 :)',
            buttonText: '그룹 만들기',
            onPress: () => {},
          })
        }
      >
        <Container>
          <Image source={{ uri: data.group_profile_images[0].thumbnail }} />
          <Column style={{ flex: 1 }}>
            <Caption style={{ color: Colors.primary.red }}>
              {getDistance(geoinfoToGpsLocation(data.gps_geoinfo), 10)}m
            </Caption>
            <H3 style={{ color: Colors.gray.v600, marginBottom: 2 }}>
              {data.title}
            </H3>
            <Row>
              <UsersFillSvg style={{ marginRight: 4 }} />
              <Caption style={{ color: Colors.gray.v400, lineHeight: 16 }}>
                {formatMaleFemaleInfo(data)}·평균 {data.member_average_age}
              </Caption>
            </Row>
          </Column>
          <ArrowRight>{'>'}</ArrowRight>
        </Container>
      </TouchableWithoutFeedback>
    </Overlay>
  )
})

const Overlay = styled(View)`
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 0;
  left: 0;
`

const Container = styled(Row)`
  padding: 30px 36px;
  background-color: ${Colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  align-items: center;
`

const Image = styled(_Image)`
  width: 62px;
  height: 62px;
  border-radius: 62px;
  border: 4px solid ${Colors.gray.v200};
  margin-right: 16px;
`

const ArrowRight = styled(BaseText)`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: ${Colors.gray.v600};
`
