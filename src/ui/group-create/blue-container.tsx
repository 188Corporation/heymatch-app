import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'

export const BlueContainer = styled(Column)`
  flex: 1;
  background-color: ${Colors.primary.blue};
  align-items: center;
`
