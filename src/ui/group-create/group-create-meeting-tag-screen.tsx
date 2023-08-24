import { useMy, useTags } from 'api/reads'
import { createGroup, editGroup } from 'api/writes'
import { Colors } from 'infra/colors'
import { BOTTOM_BUTTON_HEIGTH, NAVIGATION_HEADER_HEIGHT } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Tag } from 'ui/common/Tag'
import { H3 } from 'ui/common/text'

export const GroupCreateMeetingTagScreen = observer(() => {
  const insets = useSafeAreaInsets()
  const { data } = useTags()
  const { alertStore, groupCreateStore } = useStores()
  const { data: myData } = useMy()
  const isEditingGroupInfo =
    myData && myData.joined_groups && myData.joined_groups[0]
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <Container
        style={{
          height:
            Dimensions.get('window').height -
            (insets.top +
              insets.bottom +
              BOTTOM_BUTTON_HEIGTH +
              NAVIGATION_HEADER_HEIGHT),
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <H3 style={{ marginBottom: 12 }}>
            이런 미팅을 하고 싶어요({groupCreateStore.meetingWeWantTags.length}
            /5)
          </H3>
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {data?.desired_meeting_tags.map((tag) => {
              const isSelected = groupCreateStore.meetingWeWantTags.some(
                (_) => _ === tag.value,
              )
              return (
                <Tag
                  key={tag.value}
                  color={isSelected ? Colors.primary.blue : Colors.gray.v200}
                  fontColor={isSelected ? Colors.white : undefined}
                  onPress={() => {
                    groupCreateStore.updateMeetingWeWantTags(tag.value)
                  }}
                  label={tag.label}
                />
              )
            })}
          </View>
        </View>
      </Container>
      <BottomButton
        text={isEditingGroupInfo ? '수정하기' : '그룹 만들기'}
        disabled={
          !groupCreateStore.meetupDate ||
          !groupCreateStore.address.title ||
          !groupCreateStore.address.address ||
          !groupCreateStore.introduce ||
          !groupCreateStore.memberNumber ||
          !groupCreateStore.memberAverageAge ||
          !groupCreateStore.aboutOurGroupTags.length ||
          !groupCreateStore.meetingWeWantTags.length
        }
        onPress={async () => {
          setIsLoading(true)

          try {
            if (isEditingGroupInfo) {
              await editGroup(
                groupCreateStore.id,
                groupCreateStore.title,
                groupCreateStore.introduce,
                groupCreateStore.gpsPoint,
                groupCreateStore.meetupDate!,
                Number(groupCreateStore.memberNumber),
                Number(groupCreateStore.memberAverageAge),
                groupCreateStore.address.title,
                groupCreateStore.address.address,
                groupCreateStore.aboutOurGroupTags,
                groupCreateStore.meetingWeWantTags,
              )
              await mutate('/groups/')
              navigation.navigate('GroupCreateDoneScreen')
            } else {
              await createGroup(
                groupCreateStore.title,
                groupCreateStore.introduce,
                groupCreateStore.gpsPoint,
                groupCreateStore.meetupDate!,
                Number(groupCreateStore.memberNumber),
                Number(groupCreateStore.memberAverageAge),
                groupCreateStore.address.title,
                groupCreateStore.address.address,
                groupCreateStore.aboutOurGroupTags,
                groupCreateStore.meetingWeWantTags,
              )
              await mutate('/groups/')
              navigation.navigate('GroupCreateDoneScreen')
            }
          } catch (e) {
            alertStore.error(e, '그룹 생성에 실패했어요!')
          } finally {
            setIsLoading(false)
          }
        }}
      />
      {isLoading && <LoadingOverlay />}
    </>
  )
})

const Container = styled(ScrollView)`
  padding: 12px 28px 0px 28px;
`
