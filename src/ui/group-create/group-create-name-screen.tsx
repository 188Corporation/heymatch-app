import { useMy } from 'api/reads'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const GroupCreateNameScreen = observer(() => {
  const { data } = useMy()
  const { groupCreateStore } = useStores()

  useEffect(() => {
    if (!data) return
    if (!data.joined_groups) return
    if (!data.joined_groups[0]) return
    groupCreateStore.setTitle(data.joined_groups[0].group.title)
  }, [data, groupCreateStore])

  return (
    <>
      <KeyboardAvoidingView>
        <NavigationHeader backButtonStyle='black' title='' />
        <View style={{ flexGrow: 1 }}>
          <FlexScrollView>
            <Container>
              <View style={{ marginBottom: 60 }}>
                <H1 style={{ marginBottom: 12 }}>그룹 이름을 정해볼까요?</H1>
                <DescBody2>
                  센스 있는 그룹 이름으로 좋은 인상을 남겨봐요 :)
                </DescBody2>
              </View>
              <Input
                label='그룹명'
                placeholder='ex) 압구정보이즈'
                keyboardType='default'
                value={groupCreateStore.title}
                onValueChange={(v) => {
                  groupCreateStore.setTitle(v)
                }}
                letterCase='lower'
              />
            </Container>
          </FlexScrollView>
        </View>
        <BottomButton
          text='다음으로'
          disabled={!groupCreateStore.title}
          onPress={() => {
            if (data && data.joined_groups && data.joined_groups[0]) {
              groupCreateStore.setId(String(data.joined_groups[0].group.id))
              groupCreateStore.setMeetupDate(
                data.joined_groups[0].group.meetup_date,
              )
              groupCreateStore.setMemberNumber(
                String(data.joined_groups[0].group.member_number),
              )
              groupCreateStore.setMemberAverageAge(
                String(data.joined_groups[0].group.member_avg_age),
              )
              // TODO: title, address 모두 필요
              // groupCreateStore.setAddress(
              //   String(data.joined_groups[0].group.meetup_address),
              // )
              groupCreateStore.setIntroduce(
                data.joined_groups[0].group.introduction,
              )
            }

            navigation.navigate('GroupCreateInfoScreen')
          }}
        />
      </KeyboardAvoidingView>
    </>
  )
})

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
