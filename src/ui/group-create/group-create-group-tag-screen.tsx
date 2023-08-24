import { useTags } from 'api/reads'
import { Colors } from 'infra/colors'
import { BOTTOM_BUTTON_HEIGTH, NAVIGATION_HEADER_HEIGHT } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Tag } from 'ui/common/Tag'
import { H3 } from 'ui/common/text'

export const GroupCreateGroupTagScreen = observer(() => {
  const insets = useSafeAreaInsets()
  const { data } = useTags()
  const { groupCreateStore } = useStores()

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
            우린 이런 그룹이에요({groupCreateStore.aboutOurGroupTags.length}/5)
          </H3>
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {data?.about_group_tags.map((tag) => {
              const isSelected = groupCreateStore.aboutOurGroupTags.some(
                (_) => _ === tag.value,
              )
              return (
                <Tag
                  key={tag.value}
                  color={isSelected ? Colors.primary.blue : Colors.gray.v200}
                  onPress={() => {
                    groupCreateStore.updateAboutOurGroupTags(tag.value)
                  }}
                  fontColor={isSelected ? Colors.white : undefined}
                  label={tag.label}
                />
              )
            })}
          </View>
        </View>
      </Container>
      <BottomButton
        disabled={groupCreateStore.aboutOurGroupTags.length === 0}
        text='다음으로'
        onPress={() => {
          navigation.navigate('GroupCreateMeetingTagScreen')
        }}
      />
    </>
  )
})

const Container = styled(ScrollView)`
  padding: 12px 28px 0px 28px;
`
