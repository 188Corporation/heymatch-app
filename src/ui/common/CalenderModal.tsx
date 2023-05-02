import { Colors } from 'infra/colors'
import React from 'react'
import { View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types'
import styled from 'styled-components'
import { Button } from 'ui/common/button'

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
}
LocaleConfig.defaultLocale = 'ko'

export const CalendarModal = ({
  disabled,
  markedDates,
  markingType,
  onDayPress,
  onClose,
  onSelect,
}: {
  disabled?: boolean
  markedDates?: MarkedDates | undefined
  markingType?: MarkingTypes | undefined
  onDayPress?: ((date: DateData) => void) | undefined
  onClose?: (() => void) | undefined
  onSelect?: (() => void) | undefined
}) => {
  return (
    <CalenderModalContainer>
      <View style={{ marginBottom: 32 }}>
        <Calendar
          monthFormat={'yyyy년 M월'}
          minDate={String(new Date())}
          markingType={markingType}
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={{
            arrowColor: Colors.black,
            todayTextColor: Colors.black,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', width: '50%', marginTop: 'auto' }}>
        <Button
          text='다음에'
          textColor={Colors.gray.v400}
          color={Colors.white}
          onPress={onClose}
        />
        <Button
          text='선택하기'
          textColor={Colors.white}
          color={Colors.primary.blue}
          disabled={disabled}
          onPress={onSelect}
        />
      </View>
    </CalenderModalContainer>
  )
}

const CalenderModalContainer = styled(View)`
  padding: 32px 45px 44px 45px;
  width: 100%;
  margin-top: auto;
  border-radius: 40px;
  background-color: #fff;
`
