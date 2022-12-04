import { WINDOW_DIMENSIONS } from 'infra/constants'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'

export const PHOTO_SCREEN_WIDTH = WINDOW_DIMENSIONS.width
export const PHOTO_SCREEN_HEIGHT = (PHOTO_SCREEN_WIDTH / 3) * 4

export const PhotoScreenContainer = styled(Column)`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
`
