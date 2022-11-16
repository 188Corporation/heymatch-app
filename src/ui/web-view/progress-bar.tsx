import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import React from 'react'

export const ProgressBar: React.FC<{
  value: number // [0, 1]
  height?: number
}> = ({ value, height = 4 }) => {
  return (
    <Container style={{ height }}>
      <Bar value={value} style={{ height }} />
    </Container>
  )
}

const Container = styled(Row)`
  background-color: ${Colors.white};
`

const Bar = styled(Row)<{
  value: number
}>`
  background-color: ${Colors.primary.red};
  width: ${(p) => p.value * 100}%;
`
