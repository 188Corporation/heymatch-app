import { SERVER_BASE_URL } from 'infra/constants'

const chainJsonParser = (res: Response) => res.json()

class TokenManager {
  _token: string = ''

  setToken(token: string) {
    this._token = token
  }

  get authHeader() {
    return { Authorization: `jwt ${this._token}` }
  }
}
export const tokenManager = new TokenManager()

export const getRequest = async (path: string) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'GET',
    headers: { ...tokenManager.authHeader },
  }).then(chainJsonParser)
}

export const postRequest = async (path: string, payload: object) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenManager.authHeader },
    body: JSON.stringify(payload),
  }).then(chainJsonParser)
}

export const postFormRequest = async (path: string, body: FormData) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      ...tokenManager.authHeader,
    },
    body,
  }).then(chainJsonParser)
}

export const putRequest = async (path: string, payload: object) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...tokenManager.authHeader },
    body: JSON.stringify(payload),
  }).then(chainJsonParser)
}
