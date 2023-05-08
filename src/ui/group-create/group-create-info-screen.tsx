import { useGeocoding, useSearchPlace } from 'api/reads'
import { newCreateGroup } from 'api/writes'
import { PinSvg, RightArrowSvg, SearchSvg } from 'image'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import { GroupCreateInfoScreenProps } from 'navigation/new-group-create-stacks'
import React, { ReactNode, useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { DateData } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { CalendarModal } from 'ui/common/CalenderModal'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, DescBody2, H3 } from 'ui/common/text'

export const GroupCreateInfoScreen: React.FC<GroupCreateInfoScreenProps> = (
  props,
) => {
  const { alertStore } = useStores()

  const { title } = props.route.params
  const [isVisibleCalenderModal, setIsVisibleCalenderModal] = useState(false)
  const [isVisiblePlaceModal, setIsVisiblePlaceModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [address, setAddress] = useState<{
    title: string
    address: string
  }>({
    title: '',
    address: '',
  })
  const [gpsPoint, setGpsPoint] = useState('')
  const [introduce, setIntroduce] = useState('')
  const [memberNumber, setMemberNumber] = useState('')
  const [memberAverageAge, setMemberAverageAge] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data: geocoding, isLoading: isLoadingGeocoding } = useGeocoding(
    address.address,
  )

  useEffect(() => {
    if (!geocoding || !address || isLoadingGeocoding || !geocoding.addresses)
      return
    const { x: longitude, y: latitude } = geocoding.addresses[0]
    setGpsPoint(`${longitude},${latitude}`)
  }, [address, geocoding, isLoadingGeocoding, setGpsPoint])

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <View style={{ marginBottom: 20 }}>
              <H3 style={{ marginBottom: 12 }}>몇 명인가요?</H3>
              <TextInput
                value={memberNumber}
                onChangeText={(text) => setMemberNumber(text)}
                keyboardType='number-pad'
                placeholder='인원 수를 기입해주세요'
                placeholderTextColor={Colors.gray.v500}
                style={{
                  paddingLeft: 20,
                  borderRadius: 12,
                  backgroundColor: Colors.gray.v100,
                  height: 56,
                  fontSize: 16,
                  fontWeight: '400',
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <H3 style={{ marginBottom: 12 }}>몇 살인가요?</H3>
              <TextInput
                value={memberAverageAge}
                onChangeText={(text) => setMemberAverageAge(text)}
                keyboardType='number-pad'
                placeholder='평균 나이를 기입해주세요'
                placeholderTextColor={Colors.gray.v500}
                style={{
                  paddingLeft: 20,
                  borderRadius: 12,
                  backgroundColor: Colors.gray.v100,
                  height: 56,
                  fontSize: 16,
                  fontWeight: '400',
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <H3 style={{ marginBottom: 12 }}>언제 만날까요?</H3>
              <ModalTrigger
                value={
                  selectedDate ? (
                    <Body style={{ color: Colors.black }}>
                      {toMonthDayString(selectedDate)}
                    </Body>
                  ) : (
                    <Body style={{ color: Colors.gray.v500 }}>
                      날짜를 선택해주세요
                    </Body>
                  )
                }
                onPress={() => {
                  setIsVisibleCalenderModal(true)
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <H3 style={{ marginBottom: 12 }}>어디서 만날까요?</H3>
              <ModalTrigger
                value={
                  address.title ? (
                    <Body style={{ color: Colors.black }}>{address.title}</Body>
                  ) : (
                    <Body style={{ color: Colors.gray.v500 }}>
                      장소를 선택해주세요
                    </Body>
                  )
                }
                onPress={() => {
                  setIsVisiblePlaceModal(true)
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <H3 style={{ marginBottom: 12 }}>그룹을 소개해볼까요?</H3>
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: Colors.gray.v100,
                  height: 120,
                  paddingHorizontal: 20,
                  paddingVertical: 24,
                }}
              >
                <TextInput
                  multiline
                  value={introduce}
                  placeholder='간단한 소개글을 적어주세요 :)
좋아하는 음식이나 취미, 직업은 어떤지 구체적으로
적어주면 매칭 확률이 올라가요!'
                  onChangeText={(text) => setIntroduce(text)}
                  placeholderTextColor={Colors.gray.v500}
                  style={{ height: '100%', paddingTop: 0 }}
                />
              </View>
            </View>
          </Container>
        </FlexScrollView>
      </View>
      <MyModal
        isVisible={isVisibleCalenderModal}
        onClose={() => setIsVisibleCalenderModal(false)}
      >
        <DateCalenderModal
          setSelectedDate={setSelectedDate}
          onClose={() => setIsVisibleCalenderModal(false)}
        />
      </MyModal>
      <MyModal
        isVisible={isVisiblePlaceModal}
        onClose={() => setIsVisiblePlaceModal(false)}
      >
        <SearchPlaceModal
          setAddress={setAddress}
          onClose={() => setIsVisiblePlaceModal(false)}
        />
      </MyModal>
      <BottomButton
        text='그룹 만들기'
        disabled={
          !selectedDate ||
          !address ||
          !introduce ||
          !memberNumber ||
          !memberAverageAge
        }
        onPress={async () => {
          setIsLoading(true)

          try {
            await newCreateGroup(
              title,
              introduce,
              gpsPoint,
              selectedDate!,
              Number(memberNumber),
              Number(memberAverageAge),
              address.title,
            )
            await mutate('/groups/')
            navigation.navigate('GroupCreateDoneScreen')
          } catch (e) {
            alertStore.error(e, '그룹 생성에 실패했어요!')
          } finally {
            setIsLoading(false)
          }
        }}
      />
      {isLoading && <LoadingOverlay />}
    </KeyboardAvoidingView>
  )
}

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`

const SearchPlaceModal = observer(
  ({
    setAddress,
    onClose,
  }: {
    setAddress: React.Dispatch<
      React.SetStateAction<{ title: string; address: string }>
    >
    onClose: () => void
  }) => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const { data: searchPlaceList, isLoading: isLoadingSearchPlaceList } =
      useSearchPlace(searchKeyword)

    const renderSearchList = () => {
      if (isLoadingSearchPlaceList) {
        return (
          <View style={{ height: 280 }}>
            <Body>잠시만 기다려주세요</Body>
          </View>
        )
      } else {
        if (searchKeyword === '') {
          return <View style={{ height: 280 }} />
        }

        if (
          !searchPlaceList ||
          !searchPlaceList.items ||
          searchPlaceList.items.length === 0
        ) {
          return (
            <View style={{ height: 280 }}>
              <Body>검색결과가 없습니다</Body>
            </View>
          )
        }
        return (
          <>
            {searchPlaceList &&
              searchPlaceList.items.map((searchPlace) => {
                return (
                  <TouchableOpacity
                    key={`${searchPlace.mapx}-${searchPlace.mapy}`}
                    style={{ width: '100%' }}
                    onPress={() => {
                      setAddress({
                        title: searchPlace.title.replace(/<[^>]*>/g, ''),
                        address: searchPlace.address,
                      })
                      onClose()
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          paddingTop: 2,
                        }}
                      >
                        <PinSvg fill={Colors.gray.v400} />
                      </View>
                      <View style={{ marginLeft: 4, width: '90%' }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Body>
                            {searchPlace.title.replace(/<[^>]*>/g, '')}
                          </Body>
                          <DescBody2 style={{ marginLeft: 'auto' }}>
                            {searchPlace.category.split('>')[0]}
                          </DescBody2>
                        </View>
                        <Body>{searchPlace.address}</Body>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </>
        )
      }
    }

    return (
      <SearchPlaceModalContainer>
        <SearchInput handleEndEditing={(v) => setSearchKeyword(v)} />
        {renderSearchList()}
      </SearchPlaceModalContainer>
    )
  },
)

const SearchPlaceModalContainer = styled(View)`
  width: 100%;
  background-color: #fff;
  margin-top: auto;
  border-radius: 40px;
  padding: 32px 20px 56px 20px;
`

const SearchInput = ({
  handleEndEditing,
}: {
  handleEndEditing: (v: string) => void
}) => {
  const [text, setText] = useState('')

  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ position: 'absolute', left: 16, top: 10, zIndex: 10 }}>
        <SearchSvg fill='black' />
      </View>
      <TextInput
        autoFocus
        value={text}
        onChangeText={(v) => setText(v)}
        onEndEditing={() => {
          handleEndEditing(text)
        }}
        placeholder='장소를 검색하세요'
        placeholderTextColor={Colors.gray.v500}
        style={{
          width: '100%',
          height: 48,
          fontSize: 16,
          fontWeight: '400',
          paddingLeft: 50,
          backgroundColor: Colors.gray.v100,
          borderRadius: 12,
        }}
      />
    </View>
  )
}

const DateCalenderModal = ({
  setSelectedDate,
  onClose,
}: {
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>
  onClose: () => void
}) => {
  const [_date, setDate] = useState('')
  return (
    <CalendarModal
      onDayPress={(date: DateData) => {
        setDate(date.dateString)
      }}
      markedDates={
        _date
          ? {
              [_date]: {
                selected: true,
                color: '#FF4369',
                customStyles: {
                  container: {
                    backgroundColor: '#FF4369',
                    borderRadius: 12,
                  },
                },
              },
            }
          : {}
      }
      markingType='custom'
      onSelect={() => {
        setSelectedDate(_date)
        onClose()
      }}
      onClose={onClose}
    />
  )
}

const MyModal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{
        margin: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
    >
      {isVisible && <>{children}</>}
    </Modal>
  )
}

const ModalTrigger = ({
  value,
  onPress,
}: {
  value: ReactNode
  onPress: () => void
}) => {
  return (
    <ModalTriggerContainer onPress={onPress}>
      {value}
      <View style={{ marginLeft: 'auto' }}>
        <RightArrowSvg fill={'black'} />
      </View>
    </ModalTriggerContainer>
  )
}

const ModalTriggerContainer = styled(TouchableOpacity)`
  background-color: ${Colors.gray.v100};
  height: 56px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 16px;
`

function toMonthDayString(meetUpDate: string) {
  const month = new Date(meetUpDate).getMonth() + 1
  const date = new Date(meetUpDate).getDate()
  return `${month}월 ${date}일`
}
