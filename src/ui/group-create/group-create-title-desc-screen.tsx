import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { BlueContainer } from 'ui/group-create/blue-container'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H1, H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { BottomButton } from 'ui/group-create/bottom-button'
import { navigation } from 'navigation/global'
import { Column, Row } from 'ui/common/layout'
import { SimpleInput } from 'ui/common/simple-input'
import { createGroup } from 'api/writes'
import { mutate } from 'swr'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { IS_DEV, LOCATION_FOR_TEST } from 'infra/constants'

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
          <Column style={{ alignItems: 'center', marginBottom: 28 }}>
            <H2 style={{ color: Colors.white, marginBottom: 8 }}>그룹 이름</H2>
            <Row style={{ paddingHorizontal: 20 }}>
              <SimpleInput
                style={{ flex: 1 }}
                value={groupCreateStore.title}
                onChangeText={(v) => groupCreateStore.setTitle(v)}
                placeholder='ex) 동성로훈남들 (15자 이내)'
              />
            </Row>
          </Column>
          <Column style={{ alignItems: 'center' }}>
            <H2 style={{ color: Colors.white, marginBottom: 8 }}>그룹 소개</H2>
            <Row style={{ paddingHorizontal: 20 }}>
              <SimpleInput
                style={{ flex: 1, height: 200, lineHeight: 28 }}
                value={groupCreateStore.intro}
                onChangeText={(v) => groupCreateStore.setIntro(v)}
                placeholder='ex) 오랜만에 셋이서 이태원 놀러왔어요 :) 간맥하는 중인데 같이 파티할 사람친구 구해요! (10자 이상)'
                multiline
                textAlignVertical='top'
              />
            </Row>
          </Column>
        </BlueContainer>
      </KeyboardAvoidingView>
      <BottomButton
        text='완성!'
        onPress={async () => {
          const title = groupCreateStore.title.trim()
          const intro = groupCreateStore.intro.trim()
          if (!title || title.length > 15) {
            return
          }
          if (!intro || intro.length < 10 || intro.length > 400) {
            return
          }
          setLoading(true)
          // TODO: remove test code
          const location = IS_DEV
            ? LOCATION_FOR_TEST
            : await locationStore.getLocation(true)
          const { photo, maleCount, femaleCount, averageAge } = groupCreateStore
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
            alertStore.open({
              title: '그룹 생성에 실패했어요!',
              body: String(e),
              buttonText: '확인',
              onPress: () => {},
            })
            return
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})
