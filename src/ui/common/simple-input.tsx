import styled from 'styled-components'
import { TextInput } from 'react-native'
import { Colors } from 'infra/colors'

export const SimpleInput = styled(TextInput).attrs({
  placeholderTextColor: Colors.gray.v500,
})`
  background-color: ${Colors.white};
  border: 2px solid ${Colors.primary.blue};
  border-radius: 16px;
  padding: 28px 20px;
  font-size: 18px;
`
