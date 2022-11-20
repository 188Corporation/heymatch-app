import React from 'react'
import { Column, Row } from 'ui/common/layout'
import { H2 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { SimpleInput } from 'ui/common/simple-input'
import { useStores } from 'store/globals'
import { observer } from 'mobx-react'

export const GroupTitleIntroInput = observer(() => {
  const { groupCreateStore } = useStores()
  return (
    <>
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
    </>
  )
})
