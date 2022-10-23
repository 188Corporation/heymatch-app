import {
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap'
import { Alert, EmitterSubscription } from 'react-native'
import { Purchase } from 'react-native-iap/src/types'
import { sendReceipt } from 'api/writes'

// https://react-native-iap.dooboolab.com/docs/guides/purchases
class PaymentManager {
  purchaseUpdateSubscription: EmitterSubscription | null = null
  purchaseErrorSubscription: EmitterSubscription | null = null

  async initialize() {
    await initConnection()
    try {
      await flushFailedPurchasesCachedAsPendingAndroid()
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        (purchase: Purchase) => {
          const receipt = purchase.transactionReceipt
          if (receipt) {
            sendReceipt(receipt)
              .catch((e) => {
                Alert.alert('sendReceipt error', String(e))
              })
              .then(() => {
                return finishTransaction({ purchase, isConsumable: true })
              })
              .catch((e) => {
                Alert.alert('finishTransaction error', String(e))
              })
          } else {
            Alert.alert('no receipt')
          }
        },
      )
      this.purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.warn('purchaseErrorListener', error)
        },
      )
    } catch (e) {
      // do nothing
    }
  }

  async terminate() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove()
      this.purchaseUpdateSubscription = null
    }

    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove()
      this.purchaseErrorSubscription = null
    }
    await endConnection()
  }

  async purchase(productId: string) {
    try {
      await requestPurchase({
        sku: productId, // ios
        skus: [productId], // android
      })
    } catch (e) {
      Alert.alert('requestPurchase error', String(e))
    }
  }
}

export const paymentManager = new PaymentManager()
