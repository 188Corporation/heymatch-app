import { makeAutoObservable } from 'mobx'
import { AlertContent } from 'infra/types'

export class AlertStore {
  isOpen: boolean = false
  content: AlertContent | null = null

  constructor() {
    makeAutoObservable(this)
  }

  open(content: AlertContent) {
    if (this.isOpen) return
    this.content = content
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}
