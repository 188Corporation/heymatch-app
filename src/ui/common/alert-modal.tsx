import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { Body2, H2 } from 'ui/common/text'
import { Button } from 'ui/common/button'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'

export const AlertModal: React.FC = observer(() => {
  const { alertStore: store } = useStores()
  const { content } = store
  return (
    <Modal
      isVisible={store.isOpen}
      onBackdropPress={() => store.close()}
      useNativeDriver
    >
      <Container>
        {content && (
          <>
            <H2 style={{ marginBottom: 8 }}>{content.title}</H2>
            <Body>{content.body}</Body>
            <Button
              text={content.buttonText}
              onPress={content.onPress}
              textColor={Colors.white}
            />
          </>
        )}
      </Container>
    </Modal>
  )
})

const Container = styled(Column)`
  background-color: ${Colors.white};
  border-radius: 24px;
  padding: 28px 16px 20px 16px;
  align-items: center;
`

const Body = styled(Body2)`
  color: ${Colors.gray.v400};
  margin-bottom: 24px;
  text-align: center;
`
