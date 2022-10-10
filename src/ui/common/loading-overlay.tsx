import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from 'infra/colors'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'

export const LoadingOverlay = () => {
  return (
    <Container>
      <ActivityIndicator size='large' color={Colors.primary.red} />
    </Container>
  )
}

const Container = styled(Row)`
  position: absolute;
  background-color: #ffffffaa;
  height: 100%;
  width: 100%;
  justify-content: center;
`
