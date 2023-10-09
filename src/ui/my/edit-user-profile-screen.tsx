import { useGroupList } from 'api/reads'
import { deleteProfilePhoto, editUserInfo } from 'api/writes'
import { PenSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import {
  BOTTOM_BUTTON_HEIGTH,
  jobTitleForm,
  NAVIGATION_HEADER_HEIGHT,
} from 'infra/constants'
import { getAge, useSafeAreaInsets } from 'infra/util'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import { EditUserProfileScreenProps } from 'navigation/types'
import React, { ReactNode, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { ProfilePhotoEditor } from 'ui/auth/profile-photo-register-screen'
import { BottomButton } from 'ui/common/bottom-button'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H3 } from 'ui/common/text'

export const EditUserProfileScreen: React.FC<EditUserProfileScreenProps> =
  observer((props) => {
    const { data } = props.route.params
    const { userProfileStore, alertStore, groupListStore } = useStores()
    const [loading, setLoading] = useState(false)
    const insets = useSafeAreaInsets()
    const { mutate: refetchGroupList } = useGroupList(
      groupListStore.filterParams,
    )

    const getSortedProfilePhotos = () => {
      const subPhotos = data.user_profile_images
        .filter((_) => !_.is_main)
        .sort((a, b) => {
          if (a.order < b.order) {
            return 1
          } else {
            return -1
          }
        })

      return {
        main: data.user_profile_images.find((_) => _.is_main)!.image,
        sub1: (subPhotos[0] && subPhotos[0].image) ?? '',
        sub2: (subPhotos[1] && subPhotos[1].image) ?? '',
      }
    }

    const isProfilePhotosDeleted =
      data.user_profile_images.length >
      Object.values(userProfileStore.photos).filter((x) => x).length

    const profilePhotos = {
      mainPhoto: userProfileStore.photos.mainPhoto,
      sub1Photo: userProfileStore.photos.sub1Photo,
      sub2Photo: userProfileStore.photos.sub2Photo,
    }

    const isEdited = () => {
      if (
        profilePhotos.mainPhoto !== getSortedProfilePhotos().main ||
        profilePhotos.sub1Photo !== getSortedProfilePhotos().sub1 ||
        profilePhotos.sub2Photo !== getSortedProfilePhotos().sub2
      ) {
        return false
      }
      if (userProfileStore.birthdate !== data.user.birthdate) {
        return false
      }
      if (
        userProfileStore.blockMySchoolOrCompanyUsers !==
        data.user.block_my_school_or_company_users
      ) {
        return false
      }
      if (userProfileStore.username !== data.user.username) {
        return false
      }
      return true
    }
    return (
      <>
        <NavigationHeader backButtonStyle='black' title='' />
        <View style={{ flexGrow: 1 }}>
          <Container
            style={{
              height:
                Dimensions.get('window').height -
                (BOTTOM_BUTTON_HEIGTH + NAVIGATION_HEADER_HEIGHT + insets.top),
            }}
          >
            <H3 style={{ marginBottom: 12 }}>프로필 사진</H3>
            <ProfilePhotoEditor photos={profilePhotos} />
            <Row style={{ alignItems: 'center', height: 40, marginTop: 12 }}>
              <H3 style={{ marginBottom: 12 }}>같은 학교/회사 피하기</H3>
              <Switch
                style={{ marginLeft: 'auto' }}
                value={userProfileStore.blockMySchoolOrCompanyUsers}
                onValueChange={(v) => {
                  userProfileStore.setBlockMySchoolOrCompanyUsers(v)
                  refetchGroupList()
                }}
              />
            </Row>
            <H3 style={{ marginBottom: 12 }}>나이</H3>
            <ProfileInfo
              value={<Body>만 {getAge(userProfileStore.birthdate!)}세</Body>}
              editable={false}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>닉네임</H3>
            <ProfileInfo
              value={<Body>{userProfileStore.username}</Body>}
              onPress={() => {
                navigation.navigate('EditUserInfoStacks', {
                  screen: 'UsernameScreen',
                })
              }}
            />
            <H3 style={{ marginTop: 20, marginBottom: 12 }}>직업</H3>
            <ProfileInfo
              editable={false}
              value={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {(data.user.verified_company_name ||
                    data.user.verified_school_name) && (
                    <View style={{ marginRight: 4 }}>
                      <VerifiedSvg fill={Colors.primary.blue} />
                    </View>
                  )}
                  <Body>
                    {userProfileStore.verifiedOrganizationNames
                      ? userProfileStore.verifiedOrganizationNames[0]
                      : userProfileStore.jobTitle
                      ? jobTitleForm.find(
                          (_) => _.value === userProfileStore.jobTitle,
                        )?.label
                      : '-'}
                  </Body>
                </View>
              }
              onPress={() => {
                Toast.show({
                  type: 'success',
                  text1: '직업 수정은 MY 탭에서 해주세요!',
                })
              }}
            />
          </Container>
        </View>
        <BottomButton
          text='수정하기'
          // 체형, 키, 나이, 프사가 바뀌었을 때
          disabled={isEdited()}
          onPress={async () => {
            setLoading(true)
            try {
              await editUserInfo({
                username: userProfileStore.username,
                gender: userProfileStore.gender!,
                birthdate: userProfileStore.birthdate!,
                // 어차피 빈 필드면 edit 생략됨
                mainProfileImage:
                  profilePhotos.mainPhoto &&
                  profilePhotos.mainPhoto === getSortedProfilePhotos().main
                    ? ''
                    : profilePhotos.mainPhoto,
                otherProfileImage1: profilePhotos.sub1Photo,
                otherProfileImage2: profilePhotos.sub2Photo,
                blockMySchoolOrCompanyUsers:
                  userProfileStore.blockMySchoolOrCompanyUsers,
              })
              // sub1, sub2가 비어있다면 delete쏘기
              if (isProfilePhotosDeleted) {
                await deleteProfilePhoto({
                  sub1:
                    profilePhotos.sub1Photo !==
                      data.user_profile_images[1]?.image &&
                    profilePhotos.sub1Photo === '',
                  sub2:
                    profilePhotos.sub2Photo !==
                      data.user_profile_images[2]?.image &&
                    profilePhotos.sub2Photo === '',
                })
              }

              await mutate('/users/my/')
              navigation.goBack()
            } catch (e) {
              alertStore.error(e, '정보 수정에 실패했어요!')
            } finally {
              setLoading(false)
            }
          }}
        />
        <BottomInsetSpace />
        {loading && <LoadingOverlay />}
      </>
    )
  })

const Container = styled(ScrollView)`
  padding: 0px 28px 12px 28px;
`

const ProfileInfo = ({
  value,
  editable = true,
  onPress,
}: {
  value: ReactNode
  editable?: boolean
  onPress?: () => void
}) => {
  return (
    <ProfileInfoContainer onPress={onPress}>
      {value}
      <View style={{ marginLeft: 'auto' }}>{editable && <PenSvg />}</View>
    </ProfileInfoContainer>
  )
}
const ProfileInfoContainer = styled(TouchableOpacity)`
  border-radius: 12px;
  background-color: ${Colors.gray.v100};
  padding: 20px;
  display: flex;
  flex-direction: row
  align-items: center;
`
