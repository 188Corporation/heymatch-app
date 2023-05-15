import { useMy } from 'api/reads'
import { deleteGroup } from 'api/writes'
import { VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import { NewGroupDetailScreenProps } from 'navigation/group-detail-stacks'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, CaptionS, H1, H3 } from 'ui/common/text'

export const NewGroupDetailScreen: React.FC<NewGroupDetailScreenProps> = (
  props,
) => {
  const {
    title,
    meetup_date,
    member_number,
    member_avg_age,
    meetup_address,
    introduction,
    job,
    isJobVerified,
    profileImage,
  } = props.route.params
  const { data } = useMy()
  const { alertStore } = useStores()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <NavigationHeader
        backButtonStyle='black'
        rightChildren={
          <TouchableOpacity
            style={{ marginRight: 24 }}
            onPress={async () => {
              if (!data || !data.joined_groups) return
              setLoading(true)
              try {
                await deleteGroup(data.joined_groups[0].group.id)
                await mutate('/users/my/')
                navigation.goBack()
              } catch (e) {
                alertStore.error(e, '그룹 삭제에 실패했어요!')
              } finally {
                setLoading(false)
              }
            }}
          >
            <Body style={{ color: Colors.gray.v400 }}>그룹 삭제</Body>
          </TouchableOpacity>
        }
      />
      <View style={{ flexGrow: 1 }}>
        <Container>
          <H1 style={{ marginBottom: 24 }}>{title}</H1>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 40,
            }}
          >
            <Image
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                marginRight: 20,
              }}
              source={{
                uri: profileImage,
              }}
            />
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <VerifiedSvg
                  style={{ marginRight: 4 }}
                  fill={isJobVerified ? Colors.primary.blue : Colors.gray.v400}
                />
                <Caption style={{ color: Colors.gray.v400 }} numberOfLines={1}>
                  {job}
                </Caption>
              </View>
              <View
                style={{
                  marginBottom: 8,
                }}
              >
                <GroupDesc_v2
                  memberNumber={member_number!}
                  memberAvgAge={member_avg_age!}
                />
              </View>
              <TouchableOpacity>
                <CaptionS
                  style={{ fontWeight: '600', color: Colors.primary.blue }}
                >
                  방장 프로필 보기 &gt;
                </CaptionS>
              </TouchableOpacity>
            </View>
          </View>
        </Container>

        <View
          style={{
            paddingTop: 40,
            flexGrow: 1,
            backgroundColor: '#F6F7FF',
            paddingHorizontal: 28,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>만나는 날짜</H3>
            <Body style={{ color: Colors.gray.v500 }}>
              {formatDate(meetup_date!)}
            </Body>
          </View>
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>장소</H3>
            <Body style={{ color: Colors.gray.v500 }}>{meetup_address}</Body>
          </View>
          <View style={{ height: 150, marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>소개</H3>
            <ScrollView>
              <Body style={{ color: Colors.gray.v500 }}>{introduction}</Body>
            </ScrollView>
          </View>
        </View>
      </View>
      <BottomButton
        text={'수정하기'}
        onPress={() => {
          navigation.navigate('NewGroupCreateStacks')
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
}

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`

function formatDate(_date: string) {
  const date = new Date(_date)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
}
