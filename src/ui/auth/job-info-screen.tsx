import { useMy } from 'api/reads'
import { editUserInfo } from 'api/writes'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { View } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const JobInfoScreen = observer(() => {
  const { data } = useMy()
  const { userProfileStore, alertStore } = useStores()
  const [loading, setLoading] = useState(false)

  const handleOnPress = (v: any) => {
    userProfileStore.setJobTitle(v)
  }

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <FlexScrollView>
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>직업을 선택해주세요</H1>
            <DescBody2>
              정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
            </DescBody2>
          </View>
          <RadioForm>
            {jobTitleForm.map((x, idx) => {
              return (
                <View key={x.value} style={{ marginBottom: 15 }}>
                  <RadioButton key={x.value}>
                    <RadioButtonInput
                      obj={x}
                      index={idx}
                      isSelected={userProfileStore.jobTitle === x.value}
                      onPress={handleOnPress}
                      buttonOuterSize={24}
                      buttonSize={12}
                      buttonInnerColor={Colors.white}
                      buttonOuterColor={
                        userProfileStore.jobTitle === x.value
                          ? Colors.primary.blue
                          : Colors.gray.v200
                      }
                      buttonStyle={{
                        backgroundColor:
                          userProfileStore.jobTitle === x.value
                            ? Colors.primary.blue
                            : Colors.gray.v200,
                      }}
                    />
                    <RadioButtonLabel
                      obj={x}
                      index={idx}
                      labelHorizontal={true}
                      onPress={handleOnPress}
                      labelStyle={{ fontSize: 16 }}
                    />
                  </RadioButton>
                </View>
              )
            })}
          </RadioForm>
        </Container>
      </FlexScrollView>
      {data?.user.has_account && (
        <Button
          text='건너뛰기'
          color={Colors.white}
          textColor={Colors.gray.v400}
          onPress={() => {
            alertStore.open({
              title: '추가 정보 입력을 건너뛸까요?',
              body: '지금까지 작성해주신 정보만 저장돼요!',
              mainButton: '계속 이어서 할게요!',
              subButton: '네 건너뛸게요',
              onSubPress: async () => {
                setLoading(true)
                userProfileStore.setJobTitle('etc')
                try {
                  await editUserInfo(
                    userProfileStore.gender!,
                    userProfileStore.birthdate!,
                    userProfileStore.photos.mainPhoto,
                    userProfileStore.photos.sub1Photo,
                    userProfileStore.photos.sub2Photo,
                    userProfileStore.height,
                    userProfileStore.maleBodyForm,
                    userProfileStore.femaleBodyForm,
                    userProfileStore.jobTitle,
                  )
                  await mutate('/users/my/')
                  // TODO: profile-photo-examination 혹은 메인화면
                  navigation.navigate('ProfilePhotoVerificationScreen', {
                    stage: 'AFTER',
                  })
                } catch (e) {
                  alertStore.error(e, '프로필 사진 등록에 실패했어요!')
                } finally {
                  setLoading(false)
                }
              },
            })
          }}
        />
      )}
      <BottomButton
        text='다음으로'
        disabled={!userProfileStore.jobTitle}
        onPress={async () => {
          if (
            userProfileStore.jobTitle === 'college_student' ||
            userProfileStore.jobTitle === 'employee'
          ) {
            navigation.navigate('EmailInputScreen')
          } else {
            setLoading(true)
            try {
              await editUserInfo(
                userProfileStore.gender!,
                userProfileStore.birthdate!,
                userProfileStore.photos.mainPhoto,
                userProfileStore.photos.sub1Photo,
                userProfileStore.photos.sub2Photo,
                userProfileStore.height,
                userProfileStore.maleBodyForm,
                userProfileStore.femaleBodyForm,
                userProfileStore.jobTitle,
              )
              await mutate('/users/my/')
              if (!data?.user.has_account) {
                navigation.navigate('MyScreen')
              } else {
                // TODO: profile-photo-examination 혹은 메인화면
                navigation.navigate('ProfilePhotoVerificationScreen', {
                  stage: 'AFTER',
                })
              }
            } catch (e) {
              alertStore.error(e, '프로필 사진 등록에 실패했어요!')
            } finally {
              setLoading(false)
            }
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`

const jobTitleForm = [
  {
    label: '대학(원)생',
    value: 'college_student',
  },
  {
    label: '직장인',
    value: 'employee',
  },
  {
    label: '자영업',
    value: 'self_employed',
  },
  {
    label: '아르바이트',
    value: 'part_time',
  },
  {
    label: '사업가',
    value: 'businessman',
  },
  {
    label: '기타',
    value: 'etc',
  },
]
