import React from 'react'
import { MatchRequestStatus, MatchRequestType } from 'infra/types'
import { Colors } from 'infra/colors'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { CaptionS } from 'ui/common/text'

const statusToColor = {
  [MatchRequestStatus.WAITING]: Colors.primary.blue,
  [MatchRequestStatus.ACCEPTED]: Colors.primary.red,
  [MatchRequestStatus.REJECTED]: Colors.gray.v500,
  [MatchRequestStatus.CANCELED]: Colors.gray.v500,
}

const statusTypeToText = {
  [MatchRequestStatus.WAITING]: {
    [MatchRequestType.RECEIVED]: '',
    [MatchRequestType.SENT]: '대기중',
  },
  [MatchRequestStatus.ACCEPTED]: {
    [MatchRequestType.RECEIVED]: '매칭 성공',
    [MatchRequestType.SENT]: '매칭 성공',
  },
  [MatchRequestStatus.REJECTED]: {
    [MatchRequestType.RECEIVED]: '매칭 거절',
    [MatchRequestType.SENT]: '매칭 실패',
  },
  [MatchRequestStatus.CANCELED]: {
    [MatchRequestType.RECEIVED]: '',
    [MatchRequestType.SENT]: '',
  },
}

export const MatchRequestStatusLabel: React.FC<{
  status: MatchRequestStatus
  type: MatchRequestType
}> = ({ status, type }) => {
  return (
    <Row>
      <Container style={{ backgroundColor: statusToColor[status] }}>
        <Text>{statusTypeToText[status][type]}</Text>
      </Container>
    </Row>
  )
}

const Container = styled(Row)`
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 8px;
  margin-bottom: 6px;
  left: -2px;
`

const Text = styled(CaptionS)`
  line-height: 15px;
  color: ${Colors.white};
`
