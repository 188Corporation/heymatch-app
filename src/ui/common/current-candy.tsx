import React from 'react'
import { Image } from 'ui/common/image'
import { CandyIconPng } from 'image'
import { Body } from 'ui/common/text'
import { Row } from 'ui/common/layout'
import { useMy } from 'api/reads'

export const CurrentCandy = () => {
  const { data } = useMy()
  return (
    <Row style={{ alignItems: 'center' }}>
      <Image
        source={CandyIconPng}
        style={{ width: 18, height: 18, marginRight: 8 }}
      />
      <Body style={{ fontWeight: '500' }}>
        {data?.user?.point_balance || 0}
      </Body>
    </Row>
  )
}
