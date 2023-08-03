import { ONESIGNAL_APP_ID } from 'infra/constants'
import { navigation } from 'navigation/global'
import OneSignal from 'react-native-onesignal'
import { PushNotificationType } from './types'

export const oneSignal = {
  init: () => {
    OneSignal.setAppId(ONESIGNAL_APP_ID)
    // TODO: modify
    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse()
    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        )
        let notification = notificationReceivedEvent.getNotification()
        console.log('notification: ', notification)
        const data = notification.additionalData as PushNotificationType
        console.log('additionalData: ', data)
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification)
      },
    )
    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification)

      if (
        // @ts-ignore
        notification.notification.additionalData!.route_to ===
        'GroupDetailScreen'
      ) {
        navigation.navigate('GroupDetailScreen', {
          // @ts-ignore
          id: notification.notification.additionalData!.data.group_id,
        })
      } else if (
        // @ts-ignore
        notification.notification.additionalData!.route_to ===
        'ChatDetailScreen'
      ) {
        navigation.navigate('ChatReadyDetailScreen', {
          // @ts-ignore
          cid: notification.notification.additionalData!.data.cid,
        })
      }
    })
  },
}
