import { ResponseEnvelope } from 'infra/types'

export class ApiError extends Error {
  res: ResponseEnvelope

  constructor(res: ResponseEnvelope) {
    super(res.message || '예상치 못한 에러가 발생했어요!')
    this.res = res
  }
}
