import { CheckSvg } from 'image'
import { Colors } from 'infra/colors'
import { BOTTOM_BUTTON_HEIGTH, NAVIGATION_HEADER_HEIGHT } from 'infra/constants'
import { useSafeAreaInsets } from 'infra/util'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, DescBody2, H1 } from 'ui/common/text'

const OTHER_SPACE_HEIHGT = 119

export const SelectSubsidiaryScreen = () => {
  const { userProfileStore } = useStores()
  const insets = useSafeAreaInsets()
  const [selectedName, setSelectedName] = useState<string | null>(null)
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <Container>
          <View style={{ marginBottom: 40 }}>
            <H1 style={{ marginBottom: 12 }}>계열사를 선택해주세요</H1>
            <DescBody2>
              정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
            </DescBody2>
          </View>
          <ScrollView
            style={{
              height:
                Dimensions.get('window').height -
                (BOTTOM_BUTTON_HEIGTH +
                  NAVIGATION_HEADER_HEIGHT +
                  insets.top +
                  OTHER_SPACE_HEIHGT),
            }}
          >
            {userProfileStore.verifiedOrganizationNames!.map(
              (subsidiaryName) => {
                return (
                  <TouchableOpacity
                    key={subsidiaryName}
                    onPress={() => setSelectedName(subsidiaryName)}
                    style={{ height: 48 }}
                  >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Body
                        style={{
                          color:
                            selectedName === subsidiaryName
                              ? Colors.primary.blue
                              : Colors.black,
                        }}
                      >
                        {subsidiaryName}
                      </Body>
                      {selectedName === subsidiaryName && (
                        <CheckSvg
                          fill={Colors.primary.blue}
                          width={28}
                          style={{
                            marginLeft: 'auto',
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )
              },
            )}
          </ScrollView>
        </Container>
      </View>
      <BottomButton
        text='선택하기'
        disabled={!selectedName}
        onPress={() => {
          userProfileStore.setVerifiedOrganizationNames([selectedName!])
          navigation.navigate('EmailVerificationCodeInputScreen')
        }}
      />
    </>
  )
}
const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
