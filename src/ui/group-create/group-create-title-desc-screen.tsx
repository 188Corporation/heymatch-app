import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { BlueContainer } from 'ui/group-create/blue-container'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import { createGroup } from 'api/writes'
import { mutate } from 'swr'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { IS_DEV, LOCATION_FOR_TEST } from 'infra/constants'
import { GroupTitleIntroInput } from 'ui/group-create/group-title-intro-input'
import { checkTitleIntroValidity } from 'ui/group-create/check-validity'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { GroupCreateH1 } from 'ui/group-create/group-create-h1'
import { Row } from 'ui/common/layout'

export const GroupCreateTitleDescScreen = observer(() => {
  const { groupCreateStore, locationStore, alertStore } = useStores()
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
        </BlueContainer>
        <Row
          style={{
            width: '100%',
            backgroundColor: Colors.primary.blue,
            paddingBottom: 20,
            justifyContent: 'center',
          }}
        >
          <Caption style={{ color: Colors.white, textAlign: 'center' }}>
            {
              '부적절하거나 불쾌감을 줄 수 있는\n컨텐츠는 제재를 받을 수 있으니 주의해주세요!'
            }
          </Caption>
        </Row>
      </FlexScrollView>
      <BottomButton
        inverted
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
    </KeyboardAvoidingView>
  )
})
