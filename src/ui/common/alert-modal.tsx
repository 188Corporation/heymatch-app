import { Colors } from 'infra/colors'
import { CURRENT_OS, OS } from 'infra/constants'
import { observer } from 'mobx-react'
import React from 'react'
import Modal from 'react-native-modal'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { Column, Row } from 'ui/common/layout'
import { Body2, H2 } from 'ui/common/text'

export const AlertModal: React.FC = observer(() => {
  const { alertStore: store } = useStores()
  const { content } = store
  return (
    <Modal
      isVisible={store.isOpen}
      onBackdropPress={() => {
        if (content?.preventBackdropClose) return
        store.close()
      }}
      // prevent blink in each platform
      useNativeDriver={CURRENT_OS === OS.ANDROID}
    >
      <Container>
        {content && (
          <>
            <Title>{content.title}</Title>
            {content.body && <Body>{content.body.trim()}</Body>}
            {content.bodyChildren && (
              <Column style={{ marginTop: 8 }}>{content.bodyChildren()}</Column>
            )}
            <Row style={{ height: 24 }} />
            <Button
              text={content.mainButton || '확인'}
              onPress={() => {
                store.close()
                if (content.onMainPress) content.onMainPress()
              }}
              textColor={Colors.white}
            />
            {content.subButton && (
              <Row style={{ marginTop: 8 }}>
                <Button
                  text={content.subButton}
                  onPress={() => {
                    store.close()
                    if (content.onSubPress) content.onSubPress()
                  }}
                  color={Colors.white}
                  textColor={Colors.gray.v400}
                />
              </Row>
            )}
            {content.children && content.children()}
          </>
        )}
      </Container>
    </Modal>
  )
})

const Container = styled(Column)`
  background-color: ${Colors.white};
  border-radius: 24px;
  padding: 28px 16px 16px 16px;
  align-items: center;
  position: relative;
`

const Title = styled(H2)`
  color: ${Colors.black};
  text-align: center;
`

const Body = styled(Body2)`
  color: ${Colors.gray.v400};
  margin-top: 8px;
  text-align: center;
`
