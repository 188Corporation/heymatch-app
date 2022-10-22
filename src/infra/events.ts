import { NativeEventEmitter } from 'react-native'

export enum EventType {
  TOKEN_INVALIDATED = 'TOKEN_INVALIDATED',
}

export const emitter = new NativeEventEmitter()
