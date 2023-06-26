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

// type InvalidReason = 'INVALID_LENGTH' | 'INVALID_INPUT'

export const GroupCreateNameScreen = observer(() => {
  const { data } = useMy()
  const { groupCreateStore } = useStores()
  // const [invalidGroupname, setInvalidGroupname] =
  //   useState<InvalidReason | null>(null)

  useEffect(() => {
    if (!data) return
    if (!data.joined_groups) return
    if (!data.joined_groups[0]) return
    groupCreateStore.setTitle(data.joined_groups[0].group.title)
  }, [data, groupCreateStore])

  // const validateGroupname = (groupname: string) => {
  //   if (groupname.length < 2 || groupname.length > 10) {
  //     setInvalidGroupname('INVALID_LENGTH')
  //     return false
  //   }
  //   const regex = /^[가-힣a-zA-Z0-9]+$/
  //   if (regex.test(groupname)) {
  //     if (/^[가-힣]+$/.test(groupname)) {
  //       setInvalidGroupname(null)
  //       return true
  //     } else {
  //       setInvalidGroupname('INVALID_INPUT')
  //       return false
  //     }
  //   } else {
  //     setInvalidGroupname('INVALID_INPUT')
  //     return false
  //   }
  // }

  // const getInvalidUsernameReason = () => {
  //   if (invalidGroupname === 'INVALID_LENGTH') {
  //     return '그룹명은 2글자 이상, 10글자 이하로 입력해주세요'
  //   } else if (invalidGroupname === 'INVALID_INPUT') {
  //     return '한글, 영어, 숫자만 입력할 수 있어요.'
  //   }
  // }
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
                  // validateGroupname(v)
                  groupCreateStore.setTitle(v)
                }}
                letterCase='lower'
              />
              {/* {invalidGroupname && (
                <Body2 style={{ marginTop: 4, color: Colors.primary.red }}>
                  {getInvalidUsernameReason()}
                </Body2>
              )} */}
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
              groupCreateStore.setAddress({
                title: data.joined_groups[0].group.meetup_place_title,
                address: data.joined_groups[0].group.meetup_place_address,
              })
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
