import { createGroup_regacy } from 'api/writes'
import { Colors } from 'infra/colors'
import { IS_DEV, LOCATION_FOR_TEST } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { useStores } from 'store/globals'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Body2 } from 'ui/common/text'
import { BlueContainer } from 'ui/group-create/blue-container'
import { checkTitleIntroValidity } from 'ui/group-create/check-validity'
import { GroupCreateH1 } from 'ui/group-create/group-create-h1'
import { GroupTitleIntroInput } from 'ui/group-create/group-title-intro-input'

export const GroupCreateTitleDescScreen = observer(() => {
  const {
    groupCreateStoreRegacy: groupCreateStore,
    locationStore,
    alertStore,
    keyboardStore,
  } = useStores()
  const [loading, setLoading] = useState(false)
  return (
    <KeyboardAvoidingView>
      <FlexScrollView>
        <BlueContainer>
          <NavigationHeader />
          <GroupCreateH1>{'그룹 이름과 소개를 적어볼까요?'}</GroupCreateH1>
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
          <Row style={{ marginTop: 20 }}>
            <Body2 style={{ color: Colors.white, textAlign: 'center' }}>
              {
                '⚠️ 부적절하거나 불쾌감을 줄 수 있는\n컨텐츠는 제재를 받을 수 있으니 주의해주세요!'
              }
            </Body2>
          </Row>
        </BlueContainer>
      </FlexScrollView>
      <BottomButton
        inverted
        text='완성!'
        onPress={async () => {
          if (!checkTitleIntroValidity(groupCreateStore, alertStore)) return
          keyboardStore.hide()
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
            await createGroup_regacy(
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
    </KeyboardAvoidingView>
  )
})
