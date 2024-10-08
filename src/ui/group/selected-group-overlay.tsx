import { Colors } from 'infra/colors'
import { geoinfoToGpsLocation } from 'infra/util'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { GroupDesc } from 'ui/common/group-desc'
import { Image as _Image } from 'ui/common/image'
import { Column, Row } from 'ui/common/layout'
import { BaseText, Caption, H3 } from 'ui/common/text'

export const SelectedGroupOverlay: React.FC<{
  hasJoinedGroup: boolean
}> = observer(({ hasJoinedGroup }) => {
  const {
    alertStore,
    locationStore,
    mapStore: { selectedGroup: data },
  } = useStores()
  if (!data) return null
  return (
    <Overlay pointerEvents='box-none'>
      <TouchableWithoutFeedback
        onPress={() =>
          hasJoinedGroup
            ? navigation.navigate('GroupDetailScreen', { data })
            : alertStore.open({
                title: '그룹을 만들면 상세 프로필이 보여요!',
                body: '그룹을 만들어 다른 그룹과 매칭해보세요 :)',
                mainButton: '그룹 만들기',
                onMainPress: () => navigation.navigate('GroupCreateStack'),
              })
        }
      >
        <Container>
          <Image source={{ uri: data.group_profile_images[0].thumbnail }} />
          <Column style={{ flex: 1 }}>
            <Caption style={{ color: Colors.primary.red }}>
              {locationStore.getDistance(
                geoinfoToGpsLocation(data.gps_geoinfo),
              )}
            </Caption>
            <H3 style={{ marginBottom: 2 }}>{data.title}</H3>
            <GroupDesc data={data} />
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
  margin-left: 16px;
`
