import EventEmitter from 'eventemitter3'

export enum EventType {
  TOKEN_INVALIDATED = 'TOKEN_INVALIDATED',
}

export const emitter = new EventEmitter()
