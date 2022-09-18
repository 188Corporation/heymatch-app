import { ResponseEnvelope } from 'infra/types'

export class ApiError extends Error {
  res: ResponseEnvelope

  constructor(res: ResponseEnvelope) {
    super(res.message)
    this.res = res
  }
}
