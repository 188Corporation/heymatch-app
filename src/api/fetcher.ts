import { SERVER_BASE_URL } from 'infra/constants'
import { emitter, EventType } from 'infra/events'

export const chainJsonParser = async (res: Response) => {
  const resJson = await res.json()
  // NOTE(gogo): handle when token invalidated
  if (resJson.code === 401) {
    emitter.emit(EventType.TOKEN_INVALIDATED)
  }
  return resJson
}

class TokenManager {
  _token: string = ''

  setToken(token: string) {
    this._token = token
  }

  get authHeader(): object {
    return this._token ? { Authorization: `Bearer ${this._token}` } : {}
  }
}
export const tokenManager = new TokenManager()

export const getRequest = async (path: string) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'GET',
    headers: { ...tokenManager.authHeader },
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}

export const postRequest = async (path: string, payload?: object) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenManager.authHeader },
    body: JSON.stringify(payload),
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}

export const postFormRequest = async (path: string, body: FormData) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      ...tokenManager.authHeader,
    },
    body,
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}

export const putRequest = async (path: string, payload: object) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...tokenManager.authHeader },
    body: JSON.stringify(payload),
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}

export const putFormRequest = async (path: string, body: FormData) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      ...tokenManager.authHeader,
    },
    body,
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}

export const deleteRequest = async (path: string, payload?: object) => {
  return fetch(`${SERVER_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...tokenManager.authHeader },
    body: JSON.stringify(payload),
  })
    .then(chainJsonParser)
    .catch((e) => console.error(e))
}
