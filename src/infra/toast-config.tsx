import React from 'react'
import { BaseToast, BaseToastProps } from 'react-native-toast-message'
import { Colors } from 'infra/colors'

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast {...props} style={{ borderLeftColor: Colors.primary.red }} />
  ),
}
