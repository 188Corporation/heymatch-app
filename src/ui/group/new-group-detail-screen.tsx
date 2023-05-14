import { VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import { NewGroupDetailScreenProps } from 'navigation/group-detail-stacks'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
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
  return (
    <>
      <NavigationHeader
        backButton={false}
        rightChildren={
          <TouchableOpacity style={{ marginRight: 24 }}>
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
            <Body style={{ color: Colors.gray.v500 }}>{meetup_date}</Body>
          </View>
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>장소</H3>
            <Body style={{ color: Colors.gray.v500 }}>{meetup_address}</Body>
          </View>
          <View style={{ height: 150 }}>
            <H3 style={{ marginBottom: 8 }}>소개</H3>
            <ScrollView>
              <Body style={{ color: Colors.gray.v500 }}>{introduction}</Body>
            </ScrollView>
          </View>
          <Button
            text={'수정하기'}
            color={Colors.primary.blue}
            onPress={() => {
              navigation.navigate('NewGroupCreateStacks')
            }}
          />
        </View>
      </View>
    </>
  )
}

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
