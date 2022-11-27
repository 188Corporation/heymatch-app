import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { BlueContainer } from 'ui/group-create/blue-container'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H1 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import { deleteGroup, editGroup } from 'api/writes'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { IS_DEV, LOCATION_FOR_TEST } from 'infra/constants'
import { GroupTitleIntroInput } from 'ui/group-create/group-title-intro-input'
import { useMy } from 'api/reads'
import { checkTitleIntroValidity } from 'ui/group-create/check-validity'
import { GroupDeleteButton } from 'ui/group-create/group-delete-button'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'

export const GroupEditScreen = observer(() => {
  const { groupCreateStore, locationStore, alertStore, mapStore } = useStores()
  const { data } = useMy()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (data) {
      groupCreateStore.setTitle(data.joined_group?.title || '')
      groupCreateStore.setIntro(data.joined_group?.introduction || '')
    }
  }, [data, groupCreateStore])
  return (
    <KeyboardAvoidingView>
      <FlexScrollView>
        <BlueContainer>
          <NavigationHeader
            rightChildren={
              <GroupDeleteButton
                onDelete={async () => {
                  if (!data || !data.joined_group) return
                  setLoading(true)
                  try {
                    await deleteGroup(data.joined_group.id)
                    await mutate('/users/my/')
                    mapStore.clearSelectedGroup()
                    navigation.goBack()
                  } catch (e) {
                    alertStore.error(e, '그룹 삭제에 실패했어요!')
                  } finally {
                    setLoading(false)
                  }
                }}
              />
            }
          />
          <H1
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            그룹 이름과 소개를 수정할까요?
          </H1>
          <Body
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginBottom: 12,
            }}
          >
            {
              '사진과 인원, 나이를 변경하려면\n그룹을 삭제하고 새로 만들어주세요 :)'
            }
          </Body>
          <Body
            style={{
              textAlign: 'center',
              color: Colors.white,
              marginBottom: 36,
            }}
          >
            {'위치는 그룹을 수정하면 자동으로 반영돼요!'}
          </Body>
          <GroupTitleIntroInput />
        </BlueContainer>
      </FlexScrollView>
      <BottomButton
        inverted
        text='수정 완료!'
        onPress={async () => {
          if (!data || !data.joined_group) return
          if (!checkTitleIntroValidity(groupCreateStore, alertStore)) return
          setLoading(true)
          // TODO: remove test code
          const location = IS_DEV
            ? LOCATION_FOR_TEST
            : await locationStore.getLocation(true)
          try {
            await editGroup(
              data.joined_group.id,
              groupCreateStore.trimmedTitle,
              groupCreateStore.trimmedIntro,
              location,
            )
            await mutate('/users/my/')
            mapStore.clearSelectedGroup()
            navigation.goBack()
          } catch (e) {
            alertStore.error(e, '그룹 수정에 실패했어요!')
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </KeyboardAvoidingView>
  )
})
