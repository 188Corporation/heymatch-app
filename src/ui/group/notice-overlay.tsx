import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { NoticeOverlayBg } from 'image'
import { Image } from 'ui/common/image'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { Caption } from 'ui/common/text'
import { Colors } from 'infra/colors'

const TARGET_TEXT =
  '새벽 5시가 되면 모든 그룹과 매칭 요청이 사라져요 😛 매칭에 성공한 채팅만 남는답니다!'

export const NoticeOverlay = () => {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(true), [])
  return (
    <Container>
      <Image source={NoticeOverlayBg} style={{ flex: 1 }} />
      <TextContainer>
        {show && (
          <AutoScroll
            style={{ flexDirection: 'row' }}
            delay={0}
            duration={TARGET_TEXT.length * 200}
            endPaddingWidth={40}
          >
            <MarqueeText>{TARGET_TEXT}</MarqueeText>
          </AutoScroll>
        )}
      </TextContainer>
    </Container>
  )
}

const Container = styled(Row)`
  position: absolute;
  width: 100%;
  height: 32px;
  bottom: 0;
`

const TextContainer = styled(Row)`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
`

const MarqueeText = styled(Caption)`
  color: ${Colors.white};
`
