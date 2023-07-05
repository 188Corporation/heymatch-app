import { useOnboardingStatus } from 'api/reads'
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
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const { userProfileStore } = useStores()

  useEffect(() => {
    if (data?.status !== 'onboarding_incomplete') return
    ;(async () => {
      await mutate('/users/my/onboarding/')
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
              source={{ uri: userProfileStore.getPhotos.mainPhoto }}
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
            </View>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        disabled
        text='정보를 모두 적었어요 🎉'
        onPress={() => {}}
      />
    </>
  )
}
const Container = styled(View)`
  padding: 0px 59px;
`
