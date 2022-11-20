import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { BlueContainer } from 'ui/group-create/blue-container'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H1 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'
import { createGroup } from 'api/writes'
import { mutate } from 'swr'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { IS_DEV, LOCATION_FOR_TEST } from 'infra/constants'
import { GroupTitleIntroInput } from 'ui/group-create/group-title-intro-input'
import { checkTitleIntroValidity } from 'ui/group-create/check-validity'

export const GroupCreateTitleDescScreen = observer(() => {
  const { groupCreateStore, locationStore, alertStore } = useStores()
  const [loading, setLoading] = useState(false)
  return (
    <>
      <KeyboardAvoidingView backgroundColor={Colors.primary.blue}>
        <BlueContainer>
          <NavigationHeader />
          <H1
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginTop: 40,
              marginBottom: 16,
            }}
          >
            {'그룹 이름과 소개를 적어볼까요?'}
          </H1>
          <Body
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginBottom: 36,
            }}
          >
            {'센스 있는 이름과 자세한 소개를 작성하면\n매칭 확률이 올라가요!'}
          </Body>
          <GroupTitleIntroInput />
        </BlueContainer>
      </KeyboardAvoidingView>
      <BottomButton
        text='완성!'
        onPress={async () => {
          if (!checkTitleIntroValidity(groupCreateStore, alertStore)) return
          setLoading(true)
          // TODO: remove test code
          const location = IS_DEV
            ? LOCATION_FOR_TEST
            : await locationStore.getLocation(true)
          const {
            photo,
            maleCount,
            femaleCount,
            averageAge,
            trimmedTitle: title,
            trimmedIntro: intro,
          } = groupCreateStore
          try {
            await createGroup(
              photo as string,
              maleCount || 0,
              femaleCount || 0,
              averageAge as number,
              title,
              intro,
              location,
            )
            await mutate('/users/my/')
            navigation.navigate('GroupCreateDoneScreen')
          } catch (e) {
            alertStore.error(e, '그룹 생성에 실패했어요!')
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})
