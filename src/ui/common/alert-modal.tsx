import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { Body2, H2 } from 'ui/common/text'
import { Button } from 'ui/common/button'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { CURRENT_OS, OS } from 'infra/constants'

export const AlertModal: React.FC = observer(() => {
  const { alertStore: store } = useStores()
  const { content } = store
  return (
    <Modal
      isVisible={store.isOpen}
      onBackdropPress={() => store.close()}
      // prevent blink in each platform
      useNativeDriver={CURRENT_OS === OS.ANDROID}
    >
      <Container>
        {content && (
          <>
            <H2 style={{ color: Colors.black }}>{content.title}</H2>
            {content.body && <Body>{content.body.trim()}</Body>}
            {content.bodyChildren && (
              <Column style={{ marginTop: 8 }}>{content.bodyChildren()}</Column>
            )}
            <Row style={{ height: 24 }} />
            <Button
              text={content.buttonText || '확인'}
              onPress={() => {
                store.close()
                if (content.onPress) content.onPress()
              }}
              textColor={Colors.white}
            />
            {content.cancelText && (
              <Row style={{ marginTop: 8 }}>
                <Button
                  text={content.cancelText}
                  onPress={() => {
                    store.close()
                    if (content.onPressCancel) content.onPressCancel()
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

const Body = styled(Body2)`
  color: ${Colors.gray.v400};
  margin-top: 8px;
  text-align: center;
`
