import { useOnboardingStatus } from 'api/reads'
import { completeInputExtraInfo, inprogressInputExtraInfo } from 'api/writes'
import { Colors } from 'infra/colors'
import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { Body2, H2 } from 'ui/common/text'

export const ProfilePhotoVerificationScreen = () => {
  const { data } = useOnboardingStatus()
  const { userProfileStore } = useStores()
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  useEffect(() => {
    if (
      data?.status !==
      'onboarding_profile_under_verification_extra_info_completed'
    )
      return
    ;(async () => {
      await completeInputExtraInfo()
    })()
  }, [data?.status])

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      await mutate('/users/my/onboarding/')
    }, 5000)

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [])

  if (!data) return <LoadingOverlay />

  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image
              source={{ uri: userProfileStore.photos.mainPhoto }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 20,
                marginBottom: 60,
              }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
              <H2 style={{ marginBottom: 8, color: Colors.gray.v500 }}>
                프로필을 확인하고 있어요
              </H2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                빠르게 확인하고 알려드릴게요 😀
              </Body2>
              {data.status ===
                'onboarding_profile_under_verification_extra_info_incomplete' && (
                <Body2 style={{ color: Colors.gray.v400 }}>
                  기다리는 동안 회원님에 대해 조금 더 알려줄래요?
                </Body2>
              )}
            </View>
          </View>
        </Container>
      </FlexScrollView>
      {data.status ===
        'onboarding_profile_under_verification_extra_info_incomplete' && (
        <BottomButton
          text='+ 추가 정보 등록하기'
          onPress={async () => {
            await inprogressInputExtraInfo()
            intervalRef.current && clearInterval(intervalRef.current)
            await mutate('/users/my/onboarding/')
          }}
        />
      )}
      {data.status ===
        'onboarding_profile_under_verification_extra_info_completed' && (
        <BottomButton
          disabled
          text='추가 정보를 모두 적었어요 🎉'
          onPress={() => {}}
        />
      )}
    </>
  )
}
const Container = styled(View)`
  padding: 0px 59px;
`
