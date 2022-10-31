import {
  clearTransactionIOS,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  initConnection,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap'
import { Alert, EmitterSubscription } from 'react-native'
import { Purchase } from 'react-native-iap/src/types'
import { sendReceipt } from 'api/writes'
import { CURRENT_OS, OS } from 'infra/constants'

// https://react-native-iap.dooboolab.com/docs/guides/purchases
class PaymentManager {
  purchaseUpdateSubscription: EmitterSubscription | null = null
  purchaseErrorSubscription: EmitterSubscription | null = null

  async initialize() {
    try {
      await initConnection()
      if (CURRENT_OS === OS.ANDROID) {
        await flushFailedPurchasesCachedAsPendingAndroid()
      }
      if (CURRENT_OS === OS.IOS) {
        await clearTransactionIOS()
      }
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        (purchase: Purchase) => {
          const receipt = purchase.transactionReceipt
          if (receipt) {
            sendReceipt(receipt)
              .catch((e) => {
                Alert.alert('결제 통신에 실패했어요!', String(e))
              })
              .then(() => {
                return finishTransaction({ purchase, isConsumable: true })
              })
              .catch((e) => {
                Alert.alert('결제 완료에 실패했어요!', String(e))
              })
          } else {
            Alert.alert('결제 결과 조회에 실패했어요!')
          }
        },
      )
      this.purchaseErrorSubscription = purchaseErrorListener(
        (e: PurchaseError) => {
          Alert.alert('결제에 실패했어요!', String(e))
        },
      )
    } catch (e) {
      Alert.alert('결제 초기화에 실패했어요!', String(e))
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

  async init(productIds: string[]) {
    await getProducts({ skus: productIds })
  }

  async purchase(productId: string) {
    try {
      await requestPurchase({
        sku: productId, // ios
        skus: [productId], // android
        quantity: 1,
      })
    } catch (e) {
      const errorString = String(e)
      const isUserCancel = errorString.includes('SKErrorDomain error 2')
      if (isUserCancel) return
      Alert.alert('결제 요청에 실패했어요!', errorString)
    }
  }
}

export const paymentManager = new PaymentManager()
