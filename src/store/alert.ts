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

  error(error: unknown, title?: string, body?: string) {
    this.open({
      title: title || '에러가 발생했어요!',
      body: [body, String(error)].join('\n\n'),
    })
  }

  errorUnexpected(error: Error) {
    this.open({
      title: '예상치 못한 에러가 발생했어요!',
      body: `이용에 불편을 드려 죄송해요 😢 문제가 계속되면 고객센터로 연락해주세요.\n\n${error.name}: ${error.message}`,
    })
  }

  close() {
    this.isOpen = false
    const { content } = this
    if (content?.onClose) content.onClose()
  }
}
