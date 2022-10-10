import styled from 'styled-components'
import { TextInput } from 'react-native'
import { Colors } from 'infra/colors'

export const SimpleInput = styled(TextInput).attrs({
  placeholderTextColor: Colors.gray.v400,
})`
  background-color: ${Colors.white};
  border: 2px solid ${Colors.primary.blue};
  border-radius: 16px;
  padding: 20px;
  font-size: 18px;
  color: ${Colors.gray.v600};
`
