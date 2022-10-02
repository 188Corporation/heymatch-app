import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { ActivityIndicator } from 'react-native'

export const LoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator size='large' color={Colors.primary.red} />
    </Container>
  )
}

const Container = styled(Row)`
  flex: 1;
  justify-content: center;
`
