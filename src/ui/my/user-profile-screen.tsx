import { UserProfileBgSVG, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { UserProfileImages } from 'infra/types'
import { convertBodyform, getAge, getOrganization } from 'infra/util'
import { UserProfileScreenProps } from 'navigation/types'
import React, { ReactNode, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import Carousel from 'react-native-reanimated-carousel'
import styled from 'styled-components'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, CaptionS, H2 } from 'ui/common/text'

export const UserProfileScreen: React.FC<UserProfileScreenProps> = (props) => {
  const { user } = props.route.params
  const isVerified = user.verified_company_name || user.verified_school_name
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <View style={{ position: 'absolute' }}>
          <UserProfileBgSVG />
        </View>
        <Container>
          <TouchableOpacity
            style={{
              position: 'relative',
              width: 116,
              marginBottom: 16,
              marginTop: 47,
            }}
            onPress={() => {
              setIsModalVisible(true)
            }}
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
            <H2>
              키 <H2 style={{ color: Colors.primary.red }}>{user.height_cm}</H2>
              CM에
            </H2>
            <H2>
              <H2 style={{ color: Colors.primary.red }}>
                {convertBodyform(
                  user.gender,
                  user.male_body_form ?? user.female_body_form,
                )}
              </H2>{' '}
              몸매를 소유했어요
            </H2>
          </View>
          <CarouselModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <ProfileImagesCarousel images={user.user_profile_images} />
          </CarouselModal>
        </Container>
      </View>
    </>
  )
}

const Container = styled(View)`
  padding-horizontal: 20px;
  align-items: center;
`

const CarouselModal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      {isVisible && <>{children}</>}
    </Modal>
  )
}

const ProfileImagesCarousel = ({ images }: { images: UserProfileImages[] }) => {
  return (
    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Carousel
        data={images.map((image) => image.image)}
        loop={false}
        width={240}
        height={240}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => {
          return (
            <>
              {index === 0 && (
                <Chip>
                  <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
                </Chip>
              )}
              <Image
                style={{ width: 240, height: 240, borderRadius: 20 }}
                source={{
                  uri: images[index].image,
                }}
              />
            </>
          )
        }}
      />
    </Row>
  )
}

const Chip = styled(View)`
  width: 33px;
  height: 23px;
  border-radius: 8px;
  background-color: ${Colors.primary.blue};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  left: 26px;
  z-index: 100;
`
