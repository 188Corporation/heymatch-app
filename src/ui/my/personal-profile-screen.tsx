import { PersonalBgSVG, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { convertBodyform, getAge, getOrganization } from 'infra/util'
import { PersonalProfileScreenProps } from 'navigation/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H2 } from 'ui/common/text'

export const PersonalProfileScreen: React.FC<PersonalProfileScreenProps> = (
  props,
) => {
  const { user } = props.route.params
  const isVerified = user.verified_company_name || user.verified_school_name
  return (
    <View>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <View style={{ position: 'absolute' }}>
          <PersonalBgSVG />
        </View>
        <Container>
          <TouchableOpacity
            style={{
              position: 'relative',
              width: 116,
              marginBottom: 16,
              marginTop: 47,
            }}
            onPress={() => {}}
          >
            <AvatarRing>
              <Avatar
                side={102}
                source={{
                  uri: user.user_profile_images[0].image,
                }}
              />
            </AvatarRing>
          </TouchableOpacity>
          <H2>
            {user.username}, 만 {getAge(user.birthdate)}세
          </H2>
          <Row style={{ alignItems: 'center', marginBottom: 64 }}>
            {isVerified && <VerifiedSvg fill={Colors.primary.blue} />}
            <Body style={{ color: Colors.gray.v400 }}>
              {getOrganization(
                user.verified_company_name,
                user.verified_school_name,
                user.job_title,
              )}
            </Body>
          </Row>
          <View
            style={{
              width: '100%',
              height: 120,
              borderRadius: 16,
              backgroundColor: Colors.gray.v100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <H2>키 {user.height_cm}CM에</H2>
            <H2>
              {convertBodyform(
                user.gender,
                user.male_body_form ?? user.female_body_form,
              )}{' '}
              몸매를 소유했어요
            </H2>
          </View>
        </Container>
      </View>
    </View>
  )
}

const Container = styled(View)`
  padding-horizontal: 20px;
  align-items: center;
`
