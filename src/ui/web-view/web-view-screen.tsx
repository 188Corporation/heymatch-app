import React, { useState } from 'react'
import { WebViewScreenProps } from 'navigation/types'
import WebView from 'react-native-webview'
import { Column } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { LoadingOverlay } from 'ui/common/loading-overlay'

export const WebViewScreen: React.FC<WebViewScreenProps> = (props) => {
  const { title, uri } = props.route.params
  const [progress, setProgress] = useState(0)
  return (
    <>
      <NavigationHeader title={title} />
      <Column style={{ flex: 1 }}>
        <WebView
          source={{ uri }}
          onLoadProgress={({ nativeEvent: { progress: p } }) => setProgress(p)}
        />
        {progress !== 1 && <LoadingOverlay />}
      </Column>
    </>
  )
}
